import streamlit as st
import requests
import plotly.graph_objects as go
import time

API_URL = "http://127.0.0.1:8000"

st.set_page_config(
    page_title="Adaptive Diagnostic Engine",
    page_icon="🧠",
    layout="wide"
)

# ---------------- STYLING ----------------

st.markdown("""
<style>

.stApp{
background: radial-gradient(circle at top,#0f172a,#020617);
color:white;
}

.hero{
text-align:center;
padding-top:80px;
padding-bottom:40px;
}

.hero h1{
font-size:70px;
font-weight:700;
background:linear-gradient(90deg,#6366f1,#a78bfa);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.hero p{
color:#94a3b8;
font-size:20px;
}

.metric-card{
background:#0f172a;
padding:25px;
border-radius:14px;
border:1px solid #1e293b;
}

.question-card{
background:#020617;
padding:30px;
border-radius:14px;
border:1px solid #1e293b;
}

</style>
""", unsafe_allow_html=True)

# ---------------- HERO ----------------

st.markdown("""
<div class="hero">
<h1>Adaptive Diagnostic Engine</h1>
<p>Discover your true ability with AI-driven adaptive testing</p>
</div>
""", unsafe_allow_html=True)

# ---------------- SESSION STATE ----------------

if "session_id" not in st.session_state:
    st.session_state.session_id=None

if "question" not in st.session_state:
    st.session_state.question=None

if "ability_history" not in st.session_state:
    st.session_state.ability_history=[]

# ---------------- SIDEBAR PROFILE ----------------

st.sidebar.title("Student Profile")

st.sidebar.write("👤 Guest Student")
st.sidebar.write("📚 Adaptive Assessment")

if st.session_state.session_id:
    st.sidebar.success("Session Active")

# ---------------- START BUTTON ----------------

if st.session_state.session_id is None:

    if st.button("Start Assessment →"):

        with st.spinner("Preparing adaptive engine..."):
            time.sleep(1)

        res=requests.post(f"{API_URL}/start-session")
        data=res.json()

        st.session_state.session_id=data["session_id"]

        st.success("Assessment Started")

# ---------------- DASHBOARD ----------------

if st.session_state.session_id:

    ability=0
    if st.session_state.ability_history:
        ability=st.session_state.ability_history[-1]

    col1,col2,col3=st.columns(3)

    with col1:
        st.markdown('<div class="metric-card">',unsafe_allow_html=True)
        st.metric("Ability Score",round(ability,3))
        st.markdown('</div>',unsafe_allow_html=True)

    with col2:
        st.markdown('<div class="metric-card">',unsafe_allow_html=True)
        st.write("Difficulty Meter")
        st.progress(min(max(ability+0.5,0),1))
        st.markdown('</div>',unsafe_allow_html=True)

    with col3:
        st.markdown('<div class="metric-card">',unsafe_allow_html=True)

        answered=len(st.session_state.ability_history)
        progress=answered/10

        st.write("Assessment Progress")
        st.progress(progress)

        st.write(f"{answered}/10 Questions")

        st.markdown('</div>',unsafe_allow_html=True)

# ---------------- ABILITY GAUGE ----------------

if st.session_state.ability_history:

    ability=st.session_state.ability_history[-1]

    fig=go.Figure(go.Indicator(
        mode="gauge+number",
        value=ability,
        title={"text":"Ability Gauge"},
        gauge={
            "axis":{"range":[-1,1]},
            "bar":{"color":"#6366f1"},
            "bgcolor":"#020617"
        }
    ))

    st.plotly_chart(fig,use_container_width=True)

# ---------------- NEXT QUESTION ----------------

if st.session_state.session_id:

    if st.button("Get Next Question"):

        res=requests.get(f"{API_URL}/next-question/{st.session_state.session_id}")

        st.session_state.question=res.json()

# ---------------- QUESTION UI ----------------

if st.session_state.question:

    q=st.session_state.question

    st.markdown('<div class="question-card">',unsafe_allow_html=True)

    st.subheader("Question")

    st.write(q["question"])

    answer=st.radio("Select Answer",q["options"])

    if st.button("Submit Answer"):

        res=requests.post(
            f"{API_URL}/submit-answer",
            params={
                "session_id":st.session_state.session_id,
                "question_id":q["question_id"],
                "answer":answer
            }
        )

        result=res.json()

        if result["correct"]:
            st.success("Correct Answer")
        else:
            st.error("Incorrect Answer")

        ability=result["new_ability"]

        st.session_state.ability_history.append(ability)

    st.markdown('</div>',unsafe_allow_html=True)

# ---------------- ABILITY GRAPH ----------------

if st.session_state.ability_history:

    st.subheader("Ability Progress")

    st.line_chart(st.session_state.ability_history)

# ---------------- AI STUDY PLAN ----------------

if st.button("Generate AI Study Plan") and st.session_state.session_id:

    with st.spinner("Generating personalized plan..."):

        res=requests.get(
            f"{API_URL}/generate-study-plan/{st.session_state.session_id}"
        )

        data=res.json()

        st.info(data["study_plan"])