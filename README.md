# Career Assistant (Gradio) — Resume + JD + Interview Prep

A Gradio-based Career Assistant that helps with:
- Resume parsing + Job Description (JD) analysis
- Cover letter + cold email generation
- Interview question generation (technical/behavioral/system design) + answer feedback
- Optional: fine-tuning artifacts (dataset JSONL files + training notebook)

---

## Demo (How to run)

### Option A — Run locally (recommended)
1) Clone the repo
```bash
git clone https://github.com/Montu07/career_assistant.git
cd career_assistant

```
Create & activate a virtual environment
```bash
python -m venv .venv

# Windows:
.venv\Scripts\activate

# Mac/Linux:
source .venv/bin/activate
```
Install dependencies
```bash
pip install -r requirements.txt
```
Run the Gradio app
```bash
python app.py

Gradio will print a local URL (usually):
http://127.0.0.1:7860
```

Option B — Run in Google Colab

Upload this repo folder to Google Drive

Open the notebook in notebooks/ (or open your main notebook)

Install requirements and run app.py

Repository structure

app.py
Main Gradio application entry point.

notebooks/
Final notebook + experiments (fine-tuning / evaluation / debugging).

data/processed/
Processed training/evaluation files (JSONL) used for fine-tuning.

Note: Large artifacts (model weights, caches, logs) are intentionally NOT committed to GitHub.

Notes for running
Expected inputs

Resume text (paste or upload, depending on UI)

Job description text

Optional: PDFs for RAG / knowledge base (if enabled)

Common issues
AISS import error: install correct version (CPU/GPU)
```bash
pip install faiss-cpu
# or GPU version if you have CUDA:
# pip install faiss-gpu
SON parse issues from LLM output: the app uses safe fallback behavior if strict JSON parsing fails.
```

Author

Abhiram Varanasi


