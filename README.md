# Day 3 · Wed 28 Oct · Build a UI on your API (1 hour)

**Goal:** people who don't code can use everything built so far. The page does no maths; it only calls the API.

## What we are working on today

**Introduction.** An API is perfect for programs and useless for people who don't code. The maintenance engineer and the Head of Department won't open `/docs` and type JSON. They want a screen: pick a day, see the numbers, see the trend.

Today we build that screen. It has one strict rule: **the page does no calculation; it only asks the API.** That is how real front ends and back ends are separated, and it means the screen and every other client always agree.

### Problem statement

> The API can answer *"how hard did the transformer work on 23 March?"*, but only for someone who knows URLs. The HOD wants to open a page in the morning, choose a date, and see at a glance: peak load, energy, solar, transformer loading and the worst days. The maintenance team also wants the Day 1 calculators on a simple form.
>
> **Build two pages for non-programmers, on top of the existing API.**

| | |
|---|---|
| **Given** | The Day 2 API: `/calculate`, `/energy-cost`, `/bill`, `/history`, `/readings`, `/summary`, `/peak-days` |
| **Find** | A calculator page (three tabs plus history) and a substation dashboard (metrics, load vs solar chart, worst days) |
| **Constraints** | No formulas in the UI. Show the API's own error messages (e.g. hours = 30). Tell the user clearly if the API isn't running |

### Solution approach

| Step | What we do | File | Concept learned |
|---|---|---|---|
| 1 | Compare with the old Streamlit calculator that did its own maths | `reference/7_Streamlit_Calculator.py` | Why logic belongs in the back end |
| 2 | Write a helper that calls the API and shows its errors | `ui_calculator.py` (`call()`) | HTTP from Python (`httpx`) |
| 3 | Calculator page: three tabs plus a history table | `ui_calculator.py` | Inputs, buttons, metrics, tables |
| 4 | Dashboard: date picker → `/summary`, `/readings`, `/peak-days` | `dashboard.py` | Charts, layout, data from the API |
| ✓ | Test both pages without a browser | `test_ui.py` | UI testing (Streamlit AppTest) |
| ★ | Stretch: the same API with a React front end | `reference/workshop4-fastapi-crud` | The API is the contract |

### What you'll have at the end

- A full-stack app: **UI → API → database**. Two terminals: `uvicorn app:app --reload` and `streamlit run dashboard.py`.
- For 23 March the dashboard shows **859 kW, 9,351 kWh, 1,848 kWh solar, 106.4% loading, 38.4 °C**.

## Session plan

| Time | What | How |
|---|---|---|
| 0–10 min | Front end vs back end | Draw it: browser → UI → API → DB. Show the old `reference/7_Streamlit_Calculator.py`, which does the maths itself. Why is that worse? |
| 10–30 min | The calculator page | Two terminals: `uvicorn app:app --reload` and `streamlit run ui_calculator.py`. Three tabs, a history table, and error messages from the API |
| 30–50 min | The substation dashboard | `streamlit run dashboard.py`: pick a day; metrics, load vs solar chart, peak days |
| 50–60 min | Stretch + task brief | Show `reference/workshop4-fastapi-crud`: a React front end on a FastAPI back end. Same idea, different UI |

## Run

```bash
cd code
```
```bash
python load_readings.py
```
```bash
uvicorn app:app --reload
```

In a second terminal, start the dashboard (or `ui_calculator.py`):

```bash
streamlit run dashboard.py
```

To test both pages without a browser, run `python test_ui.py`.

## Task (30 min)

Show a status banner on the dashboard:

| Peak loading | Banner |
|---|---|
| Above 100% | Red, OVERLOAD |
| Above 80% | Amber, HIGH |
| Otherwise | Green, NORMAL |

- **Starter:** `task/starter/dashboard.py`.
- **Solution:** `task/solution/dashboard.py`.
- **Check:** 23 Mar → OVERLOAD 106.4% at 12:45; 4 Mar (Holi) → NORMAL.

## Materials

- **Slides (React stretch):**
  - `slides/React_Intro_FullStack.pptx`
  - `Day1_HTML_to_React_Fundamentals.pptx`
  - `Day2_React_APIs_FullStack.pptx`
- **Reference:**
  - The Streamlit and Gradio calculators.
  - React `workshop3-calculator`.
  - `workshop4-fastapi-crud` (run `npm install` in `frontend/` first).
  - The React day 1/2 guides (HTML).
- **Deeper:** mgit Chapter 15 dashboard: `../../chapters/ch15/index.html`
