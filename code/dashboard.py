"""Day 3 · Step 3 — the substation dashboard. Pick a day; the API answers from the database.
Run (two terminals):   uvicorn app:app --reload        then        streamlit run dashboard.py"""
from datetime import date, timedelta

import httpx
import pandas as pd
import streamlit as st

API = "https://day3-wed-ui.fastapicloud.dev"
st.set_page_config(page_title="TR-MAIN dashboard", page_icon="📈", layout="wide")
st.title("📈 Campus substation — TR-MAIN (630 kVA) and rooftop solar (500 kWp)")



def get(path, **params):
    try:
        r = httpx.get(
            f"{API}{path}",
            params=params,
            timeout=20,
        )
        r.raise_for_status()
        return r.json()

    except httpx.ConnectError as e:
        st.error(f"Cannot connect to the deployed API: {API}")
        st.code(repr(e))
        st.stop()

    except httpx.TimeoutException as e:
        st.error("The API request timed out.")
        st.code(repr(e))
        st.stop()

    except httpx.HTTPStatusError as e:
        st.error(f"API returned HTTP {e.response.status_code}")
        st.code(e.response.text)
        st.stop()

    except httpx.HTTPError as e:
        st.error("An HTTP error occurred while contacting the API.")
        st.code(repr(e))
        st.stop()



day = st.date_input("Day", value=date(2026, 3, 23), min_value=date(2026, 2, 1), max_value=date(2026, 3, 31))
s = get("/summary", day=day)

c = st.columns(5)
c[0].metric("Peak load", f"{s['peak_load_kw']:,.0f} kW", help=f"at {s['peak_load_time']}")
c[1].metric("Energy used", f"{s['load_kwh']:,} kWh")
c[2].metric("Solar generated", f"{s['solar_kwh']:,} kWh")
c[3].metric("Transformer peak loading", f"{s['peak_loading_pct']}%", help=f"at {s['peak_loading_time']}, after solar")
c[4].metric("Hottest air", f"{s['max_air_c']} °C")

rows = pd.DataFrame(get("/readings", start=day.isoformat(), end=(day + timedelta(days=1)).isoformat()))
rows["time"] = pd.to_datetime(rows.timestamp)
st.subheader("Campus load and rooftop solar, kW")
st.line_chart(rows.set_index("time")[["load_kw", "solar_kw"]], height=280)

st.subheader("The five days the transformer worked hardest")
st.dataframe(pd.DataFrame(get("/peak-days", top=5)), hide_index=True, width="stretch")
