export default function Hero() {
  return (
    <section
      style={{
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Phishing Website Detection
      </h1>

      <p style={{ color: "#555", marginBottom: "30px" }}>
        Enter a website URL to check whether it is safe or phishing.
      </p>

      <ScanForm />
    </section>
  );
}
