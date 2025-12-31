export default function ResultCard({ result }) {
  const safe = result.prediction === "legitimate";

  return (
    <div className={`result-card ${safe ? "safe" : "danger"}`}>
      <h3>{safe ? "✅ Safe Website" : "⚠️ Phishing Detected"}</h3>
      <p>
        Confidence: <strong>{result.confidence}%</strong>
      </p>
    </div>
  );
}
