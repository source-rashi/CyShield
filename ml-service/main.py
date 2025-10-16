import numpy as np   # for arrays
import joblib        # for loading ML model
from fastapi import FastAPI
from pydantic import BaseModel
from pathlib import Path
from joblib import load
import math

from features import extract_features, to_vector  # shared features
from utils import risk_score, reasons_from

app = FastAPI(title="CyShield ML URL Scanner")

class ScanIn(BaseModel):
    url: str

class ScanOut(BaseModel):
    url: str
    label: str            # "safe" | "suspicious" | "phishing"
    score: float          # 0..1 (higher = more risky)
    reasons: list[str]

# ---- Load model if available, else fallback to heuristic ----
MODEL_PATH = Path(__file__).parent / "models" / "model.joblib"
clf = None
if MODEL_PATH.exists():
    try:
        clf = load(MODEL_PATH)
        print(f"✅ Loaded ML model from {MODEL_PATH}")
        print(f"Model type: {type(clf)}")
        print(f"Model properties: {dir(clf)}")
    except Exception as e:
        print(f"⚠️ Failed to load model: {e}. Falling back to heuristic.")
        clf = None
else:
    print("ℹ️ No trained model found. Using heuristic scoring.")

def heuristic_score(feats):
    # Same simple weighted heuristic as before
    w = dict(
        len=0.12, has_ip=0.2, https=-0.1, num_dots=0.08, num_hyphens=0.06,
        num_at=0.12, num_params=0.06, num_digits=0.05, num_special=0.08,
        has_keywords=0.18, subdomains=0.08, path_depth=0.05
    )
    raw = sum(w[k]*feats[k] for k in w)
    return 1/(1+math.exp(-raw))

def reasons_from(f):
    rs = []
    if f["has_ip"]: rs.append("Uses IP instead of domain")
    if f["has_keywords"]: rs.append("Suspicious keywords present")
    if f["num_at"]>0: rs.append("Contains '@' in URL")
    if f["https"]==0: rs.append("Not using HTTPS")
    if f["subdomains"]>=3: rs.append("Too many subdomains")
    if f["len"]>75: rs.append("Unusually long URL")
    if f["num_hyphens"]>=3: rs.append("Many '-' characters")
    return rs

@app.get("/health")
def health():
    return {"ok": True, "service": "ml-url-scanner", "modelLoaded": bool(clf)}

@app.post("/scan", response_model=ScanOut)
def scan(body: ScanIn):
    feats = extract_features(body.url)
    print(f"Extracted features: {feats}")
    X = to_vector(feats)  # Using to_vector to ensure correct feature order
    X = np.array([X])
    print(f"Feature vector shape: {X.shape}")

    print(f"Received scan request for URL: {body.url}")
    
    if clf:
        print("Using ML model for prediction")
        proba = clf.predict_proba(X)[0]
        if len(proba) == 1:
            # Model trained with only 1 class
            p_phish = 0.0
        else:
            p_phish = float(proba[1])
        label = "phishing" if p_phish >= 0.75 else "suspicious" if p_phish >= 0.45 else "safe"
        result = ScanOut(url=body.url, label=label, score=p_phish, reasons=reasons_from(feats))
    else:
        print("Using heuristic scoring (model not available)")
        score = float(round(risk_score(feats), 3))
        label = "safe" if score < 0.45 else "suspicious" if score < 0.75 else "phishing"
        result = ScanOut(url=body.url, label=label, score=score, reasons=reasons_from(feats))
    
    print(f"Scan result for {body.url}: {result.label} (score: {result.score})")
    return result
