from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("major_recommender.pkl")
le = joblib.load("label_encoder.pkl")
ohe = joblib.load("ohe_encoder.pkl")
scaler = joblib.load("scaler.pkl")
mlb = joblib.load("interest_encoder.pkl")


def predict_major(student):
    num = scaler.transform([[
        student["math_ability"],
        student["science_ability"],
        student["social_ability"]
    ]])

    section_enc = ohe.transform([[student["section"]]])
    interests_enc = mlb.transform([student["interests"]])

    X_new = np.concatenate([num, section_enc, interests_enc], axis=1)

    ml_proba = model.predict_proba(X_new)[0]

    all_scores = []
    for idx, prob in enumerate(ml_proba):
        all_scores.append((le.classes_[idx], float(prob)))

    top3 = sorted(all_scores, key=lambda x: x[1], reverse=True)[:3]

    top3_total = sum(prob for _, prob in top3)

    results = []
    for major, prob in top3:
        score = (prob / top3_total) * 100 if top3_total > 0 else 0
        results.append({
            "major": major,
            "score": round(score, 2)
        })

    return results


@app.route("/", methods=["GET"])
def home():
    return "Flask ML API is running"


@app.route("/predict-major", methods=["POST"])
def predict_major_route():
    student = request.get_json()
    result = predict_major(student)
    return jsonify({
        "recommendations": result
    })


if __name__ == "__main__":
    app.run(port=5002, debug=True)