import pickle

MODEL_PATH = "XGBoostClassifier.pickle"

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)
