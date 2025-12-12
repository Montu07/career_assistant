import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function App() {
  const [apiBase, setApiBase] = useState(API_BASE);
  const [jd, setJd] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [kbId, setKbId] = useState("");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState(null);
  const [err, setErr] = useState("");

  async function buildKb() {
    setErr(""); setOut(null); setLoading(true);
    try {
      const r = await fetch(`${apiBase}/build_kb`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: resumeText }),
      });
      if (!r.ok) throw new Error(await r.text());
      const data = await r.json();
      setKbId(data.kb_id || "");
    } catch (e) {
      setErr(String(e));
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    setErr(""); setOut(null); setLoading(true);
    try {
      const r = await fetch(`${apiBase}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kb_id: kbId, job_description: jd, n_bullets: 5, strict_mode: true }),
      });
      if (!r.ok) throw new Error(await r.text());
      const data = await r.json();
      setOut(data);
    } catch (e) {
      setErr(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 980, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1>Career Assistant</h1>

      <label>API Base URL</label>
      <input
        value={apiBase}
        onChange={(e) => setApiBase(e.target.value)}
        placeholder="https://xxxxx.trycloudflare.com"
        style={{ width: "100%", padding: 10, margin: "6px 0 16px" }}
      />

      <h3>1) Paste Resume Text</h3>
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={8}
        style={{ width: "100%", padding: 10 }}
        placeholder="Paste resume text here (for now)"
      />

      <button onClick={buildKb} disabled={loading || !apiBase || !resumeText.trim()} style={{ marginTop: 10 }}>
        Build KB
      </button>

      <div style={{ marginTop: 10 }}>
        <b>kb_id:</b> {kbId || "(not built yet)"}
      </div>

      <hr style={{ margin: "24px 0" }} />

      <h3>2) Paste Job Description</h3>
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        rows={8}
        style={{ width: "100%", padding: 10 }}
        placeholder="Paste JD here"
      />

      <button onClick={generate} disabled={loading || !kbId || !jd.trim()} style={{ marginTop: 10 }}>
        Generate
      </button>

      {loading && <p>Running…</p>}
      {err && <pre style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{err}</pre>}

      {out && (
        <>
          <h3 style={{ marginTop: 20 }}>Bullets</h3>
          <ul>
            {(out.bullets || []).map((b, i) => <li key={i}>{b}</li>)}
          </ul>

          <h3>ATS</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(out.ats, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
