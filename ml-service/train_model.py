# ml/train.py
import glob, json
from pathlib import Path
import numpy as np
import pandas as pd
from joblib import dump
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, ConfusionMatrixDisplay
from features import extract_features, to_vector, FEATURE_KEYS

DATA_DIR = Path(__file__).parent / "data"
MODELS_DIR = Path(__file__).parent / "models"
MODELS_DIR.mkdir(exist_ok=True)

def normalize_label(x):
    s = str(x).strip().lower()
    if s in {"phish", "phishing", "malicious", "bad", "1", "true"}:
        return 1
    if s in {"benign", "safe", "good", "0", "false"}:
        return 0
    return None

def load_datasets():
    files = glob.glob(str(DATA_DIR / "*.csv"))
    if not files:
        raise FileNotFoundError(
            f"No CSV files found in {DATA_DIR}. "
            "Add at least one CSV with columns: url, label (or class)."
        )

    frames = []
    for fp in files:
        df = pd.read_csv(fp)
        cols = {c.lower(): c for c in df.columns}
        if "url" not in cols:
            print(f"Skipping {fp}: no 'url' column")
            continue
        label_col = cols.get("label") or cols.get("class")
        if not label_col:
            print(f"Skipping {fp}: no 'label' or 'class' column")
            continue

        df = df[[cols["url"], label_col]].copy()
        df.columns = ["url", "y"]
        df["y"] = df["y"].apply(normalize_label)
        df = df.dropna(subset=["y"])

        # Trim whitespace & drop exact duplicate URLs
        df["url"] = df["url"].astype(str).str.strip()
        df = df.drop_duplicates(subset=["url"])

        frames.append(df)

    if not frames:
        raise ValueError("No valid datasets after parsing.")
    data = pd.concat(frames, ignore_index=True)
    data = data.drop_duplicates(subset=["url"])
    return data

def build_matrix(urls):
    feats = [extract_features(u) for u in urls]
    X = np.array([to_vector(f) for f in feats], dtype=float)
    return X

def main():
    print("🧩 Loading datasets...")
    data = load_datasets()
    print(f"Loaded {len(data)} URLs (after dedupe)")

    print("🧪 Building feature matrix...")
    X = build_matrix(data["url"].tolist())
    y = data["y"].astype(int).values

    # Safe split if tiny dataset
    tiny = len(y) < 10
    test_size = 0.5 if tiny else 0.2

    if tiny:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42
        )
    else:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )

    print("🌲 Training RandomForest...")
    clf = RandomForestClassifier(
        n_estimators=400,
        max_depth=None,
        random_state=42,
        n_jobs=-1,
        class_weight="balanced"
    )
    clf.fit(X_train, y_train)

    print("📊 Evaluation:")
    y_pred = clf.predict(X_test)
    print(classification_report(y_test, y_pred, digits=4))

    model_path = MODELS_DIR / "model.joblib"
    dump(clf, model_path)
    (MODELS_DIR / "meta.json").write_text(json.dumps({
        "features": FEATURE_KEYS,
        "model": "RandomForestClassifier",
    }, indent=2))

    print(f"✅ Saved model to {model_path}")

if __name__ == "__main__":
    main()
