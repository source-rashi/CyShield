import re
from urllib.parse import urlparse

def extract_features(url: str) -> dict:
    """
    Extracts basic features from a URL for phishing detection.
    Returns a dictionary of numerical values.
    """
    parsed = urlparse(url)
    hostname = parsed.hostname or ""
    path = parsed.path or ""

    features = {
        "url_length": len(url),
        "has_https": 1 if parsed.scheme == "https" else 0,
        "num_digits": sum(c.isdigit() for c in url),
        "num_subdomains": hostname.count("."),
        "has_ip": 1 if re.match(r"^\d+\.\d+\.\d+\.\d+$", hostname) else 0,
        "path_length": len(path),
        "suspicious_keywords": 1 if any(k in url.lower() for k in ["login", "secure", "bank", "update", "verify"]) else 0,
    }

    return features


def risk_score(features: dict) -> float:
    """
    Heuristic fallback score if ML model is not available.
    Returns a float between 0 and 1.
    """
    score = 0.0

    if features["has_https"] == 0:
        score += 0.2
    if features["num_digits"] > 5:
        score += 0.2
    if features["url_length"] > 75:
        score += 0.2
    if features["num_subdomains"] > 3:
        score += 0.2
    if features["suspicious_keywords"] == 1:
        score += 0.3
    if features["has_ip"] == 1:
        score += 0.3

    return min(score, 1.0)


def reasons_from(features: dict) -> list:
    """
    Creates human-readable reasons for the risk score or ML prediction.
    """
    reasons = []
    if features["has_https"] == 0:
        reasons.append("URL does not use HTTPS")
    if features["num_digits"] > 5:
        reasons.append("Contains many digits")
    if features["url_length"] > 75:
        reasons.append("Very long URL")
    if features["num_subdomains"] > 3:
        reasons.append("Too many subdomains")
    if features["suspicious_keywords"] == 1:
        reasons.append("Contains suspicious keywords (login, bank, etc.)")
    if features["has_ip"] == 1:
        reasons.append("Uses IP address instead of domain")

    return reasons
