import { useState } from "react";
import ResultCard from "./ResultCard";

export default function ScanForm() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!url) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult(data);
    } catch {
      setResult({
        prediction: "error",
        confidence: 0,
      });
    }

    setLoading(false);
  };

  return (
    <div className="scan-card">
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={handleScan} disabled={loading}>
        {loading ? "Scanning..." : "Scan"}
      </button>

      {result && <ResultCard result={result} />}
    </div>
  );
}
