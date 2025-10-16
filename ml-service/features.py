# ml/features.py
from urllib.parse import urlparse
import tldextract
import re
import math

SUSPICIOUS_KEYWORDS = [
    "login", "verify", "secure", "update", "account", "bank", "confirm",
    "password", "signin", "gift", "prize", "winner", "free", "click",
    "support", "security", "unlock"
]

FEATURE_KEYS = [
    "len",
    "has_ip",
    "https",
    "num_dots",
    "num_hyphens",
    "num_at",
    "num_params",
    "num_digits",
    "num_special",
    "has_keywords",
    "subdomains",
    "path_depth",
    "host_entropy",
    "digit_ratio",
]

def shannon_entropy(s: str) -> float:
    if not s:
        return 0.0
    from collections import Counter
    c = Counter(s)
    total = len(s)
    return -sum((cnt/total) * math.log2(cnt/total) for cnt in c.values())

def extract_features(url: str) -> dict:
    try:
        parsed = urlparse(url)
    except Exception:
        parsed = urlparse("")

    host = parsed.hostname or ""
    path = parsed.path or ""
    query = parsed.query or ""
    full = url or ""

    # has_ip
    ip_match = re.search(r"^\d{1,3}(\.\d{1,3}){3}$", host) or re.search(r"^\[?[A-Fa-f0-9:]+\]?$", host)

    # subdomains & registered domain
    ext = tldextract.extract(host)
    subdomain_parts = [p for p in ext.subdomain.split(".") if p] if ext.subdomain else []
    subdomain_count = len(subdomain_parts)

    num_params = 0 if not query else query.count("=")
    num_special = len(re.findall(r"[^A-Za-z0-9]", full))
    num_digits = len(re.findall(r"\d", full))

    features = {
        "len": len(full),
        "has_ip": 1 if ip_match else 0,
        "https": 1 if parsed.scheme == "https" else 0,
        "num_dots": full.count("."),
        "num_hyphens": full.count("-"),
        "num_at": full.count("@"),
        "num_params": num_params,
        "num_digits": num_digits,
        "num_special": num_special,
        "has_keywords": 1 if any(k in full.lower() for k in SUSPICIOUS_KEYWORDS) else 0,
        "subdomains": subdomain_count,
        "path_depth": len([p for p in path.split("/") if p]),
        "host_entropy": shannon_entropy(host),
        "digit_ratio": (num_digits / max(1, len(full))),
    }
    return features

def to_vector(feats: dict):
    return [feats[k] for k in FEATURE_KEYS]
