import numpy as np
import socket
from urllib.parse import urlparse
from model_loader import model
from URLFeatureExtraction import featureExtraction

def domain_exists(url: str) -> bool:
    try:
        domain = urlparse(url).netloc
        socket.gethostbyname(domain)
        return True
    except:
        return False

def looks_like_random_domain(domain: str) -> bool:
    name = domain.split(".")[0]
    vowels = sum(1 for c in name if c in "aeiou")
    return len(name) > 10 and vowels <= 2

def predict_url(url: str):
    domain = urlparse(url).netloc

    # 🔴 Rule 1: Domain does not exist
    if not domain_exists(url):
        return {
            "url": url,
            "prediction": "phishing",
            "confidence": 99.9,
            "reason": "Domain does not exist (DNS lookup failed)"
        }

    # 🔴 Rule 2: Random-looking domain
    if looks_like_random_domain(domain):
        return {
            "url": url,
            "prediction": "phishing",
            "confidence": 97.5,
            "reason": "Random-looking domain name"
        }

    # 🟢 Step 3: ML Model
    features = featureExtraction(url)
    X = np.array(features).reshape(1, -1)

    pred = int(model.predict(X)[0])
    prob = float(model.predict_proba(X)[0].max())

    return {
        "url": url,
        "prediction": "legitimate" if pred == 1 else "phishing",
        "confidence": round(prob * 100, 2),
        "reason": "ML-based URL feature analysis"
    }
