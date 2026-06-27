import { useState, useEffect } from "react";

// ── Barlow Condensed font ──────────────────────────────────────────────────

// ── Programme definition ───────────────────────────────────────────────────
// TB Base Building Standard Template (SE-first), 8 weeks
// Source: Tactical Barbell II, Block I Standard Template — image verified
//
// 7-day week. Day 7 always Rest.
//
// SE PRESCRIPTION (image exact):
//   Wk1: Day1 SE 3×20 / Day4 SE 2×20
//   Wk2: Day1 SE 3×30 / Day4 SE 2×30
//   Wk3: Day1 SE 3×40 / Day4 SE 2×40
//   Wk4: Day1 SE 1×50 / Day4 SE 1×50
//   Wk5: Day1 SE 3×50 / Day4 SE 2×50
//
// E DURATION (image exact):
//   Wk1: D2 30M / D3 30M / D6 35–120M
//   Wk2: D2 40M / D3 40M / D6 45–120M
//   Wk3: D2 50M / D3 50M / D6 55–120M
//   Wk4: D2 60M / D3 60M / D6 60–120M
//   Wk5: D2 45–60M / D3 45–60M / D6 45–120M
//
// WEEKS 6–8 (image exact):
//   Day1 Max Strength / Day2 HIC#1-10 / Day3 Recovery /
//   Day4 Max Strength / Day5 HIC#1-10 / Day6 E 30–60M / Day7 Rest
//
// NO easy week principle in the standard template.

const PROGRAMME = {
  name: "TB Base Building",
  phase: "SE-First",
  weeks: 8,
  easyWeeks: [],
  schedule: [
    // ── WEEK 1 ─────────────────────────────────────────────────────────────
    { week:1, day:1, type:"SE",   label:"SE Circuit",              abbrev:"SE",   reps:20, circuits:3, note:"3 circuits × 20 reps. Rest 0–90s between exercises, 2–3 min between circuits. Light load — 15–30% 1RM or bodyweight." },
    { week:1, day:2, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 30 min. Easy steady-state. Conversational pace. HR 120–150 bpm." },
    { week:1, day:3, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 30 min. Same easy pace." },
    { week:1, day:4, type:"SE",   label:"SE Circuit",              abbrev:"SE",   reps:20, circuits:2, note:"2 circuits × 20 reps. Minimise rest between exercises." },
    { week:1, day:5, type:"REC",  label:"Recovery",                abbrev:"REC",  note:"Light movement only — walking, stretching, mobility. No structured training." },
    { week:1, day:6, type:"E+",   label:"Endurance – LSS (Long)",  abbrev:"E+",   note:"E × 35–120 min. Push toward the longer end if able. Recovery day follows tomorrow." },
    { week:1, day:7, type:"REST", label:"Rest",                    abbrev:"REST", note:"Full rest day." },
    // ── WEEK 2 ─────────────────────────────────────────────────────────────
    { week:2, day:1, type:"SE",   label:"SE Circuit",              abbrev:"SE",   reps:30, circuits:3, note:"3 circuits × 30 reps. Reduce rest intervals. Rest-pause to complete all reps." },
    { week:2, day:2, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 40 min. Easy steady-state." },
    { week:2, day:3, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 40 min. Easy steady-state." },
    { week:2, day:4, type:"SE",   label:"SE Circuit",              abbrev:"SE",   reps:30, circuits:2, note:"2 circuits × 30 reps." },
    { week:2, day:5, type:"REC",  label:"Recovery",                abbrev:"REC",  note:"Light movement only." },
    { week:2, day:6, type:"E+",   label:"Endurance – LSS (Long)",  abbrev:"E+",   note:"E × 45–120 min. Aim for 60+ min if able." },
    { week:2, day:7, type:"REST", label:"Rest",                    abbrev:"REST", note:"Full rest day." },
    // ── WEEK 3 ─────────────────────────────────────────────────────────────
    { week:3, day:1, type:"SE",   label:"SE Circuit",              abbrev:"SE",   reps:40, circuits:3, note:"3 circuits × 40 reps. Minimise rest. Completing all reps is the goal." },
    { week:3, day:2, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 50 min. Easy steady-state." },
    { week:3, day:3, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 50 min. Easy steady-state." },
    { week:3, day:4, type:"SE",   label:"SE Circuit",              abbrev:"SE",   reps:40, circuits:2, note:"2 circuits × 40 reps." },
    { week:3, day:5, type:"REC",  label:"Recovery",                abbrev:"REC",  note:"Light movement only." },
    { week:3, day:6, type:"E+",   label:"Endurance – LSS (Long)",  abbrev:"E+",   note:"E × 55–120 min. Solid long aerobic session." },
    { week:3, day:7, type:"REST", label:"Rest",                    abbrev:"REST", note:"Full rest day." },
    // ── WEEK 4 ─────────────────────────────────────────────────────────────
    { week:4, day:1, type:"SE",   label:"SE Circuit",              abbrev:"SE",   reps:50, circuits:1, note:"1 circuit × 50 reps. Full 50 reps per exercise — rest-pause as needed." },
    { week:4, day:2, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 60 min. Easy steady-state." },
    { week:4, day:3, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 60 min. Easy steady-state." },
    { week:4, day:4, type:"SE",   label:"SE Circuit",              abbrev:"SE",   reps:50, circuits:1, note:"1 circuit × 50 reps." },
    { week:4, day:5, type:"REC",  label:"Recovery",                abbrev:"REC",  note:"Light movement only." },
    { week:4, day:6, type:"E+",   label:"Endurance – LSS (Long)",  abbrev:"E+",   note:"E × 60–120 min. Push for 90+ min if your body allows." },
    { week:4, day:7, type:"REST", label:"Rest",                    abbrev:"REST", note:"Full rest day." },
    // ── WEEK 5 ─────────────────────────────────────────────────────────────
    { week:5, day:1, type:"SE",   label:"SE Circuit",              abbrev:"SE",   reps:50, circuits:3, note:"3 circuits × 50 reps. Final peak SE week. Rest-pause throughout — just get all reps done." },
    { week:5, day:2, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 45–60 min. Easy steady-state." },
    { week:5, day:3, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 45–60 min. Easy steady-state." },
    { week:5, day:4, type:"SE",   label:"SE Circuit",              abbrev:"SE",   reps:50, circuits:2, note:"2 circuits × 50 reps." },
    { week:5, day:5, type:"REC",  label:"Recovery",                abbrev:"REC",  note:"Light movement only." },
    { week:5, day:6, type:"E+",   label:"Endurance – LSS (Long)",  abbrev:"E+",   note:"E × 45–120 min. Final long aerobic session before the Max Strength transition." },
    { week:5, day:7, type:"REST", label:"Rest",                    abbrev:"REST", note:"Full rest day." },
    // ── WEEK 6 ─────────────────────────────────────────────────────────────
    { week:6, day:1, type:"MS",   label:"Max Strength – Fighter",  abbrev:"MS",   note:"Fighter Wk1: 3–5×5 @ 75%. Bench · BSQ · WPU. Trap Bar DL: 1 work set." },
    { week:6, day:2, type:"HIC",  label:"HIC #3 – 600M Resets",   abbrev:"HIC",  note:"HIC#1-10. 600M max effort, rest 3–5 min. 4–6 reps. Develops cardiac contractile strength." },
    { week:6, day:3, type:"REC",  label:"Recovery",                abbrev:"REC",  note:"Light movement only." },
    { week:6, day:4, type:"MS",   label:"Max Strength – Fighter",  abbrev:"MS",   note:"Fighter Wk1 Day 2: 3–5×5 @ 75%." },
    { week:6, day:5, type:"HIC",  label:"HIC #7 – BOO",           abbrev:"HIC",  note:"HIC#1-10. KB Swings 60s + 800M run. Rest 2–3 min. ×5 rounds." },
    { week:6, day:6, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 30–60 min. Easy steady-state. Maintain aerobic base." },
    { week:6, day:7, type:"REST", label:"Rest",                    abbrev:"REST", note:"Full rest day." },
    // ── WEEK 7 ─────────────────────────────────────────────────────────────
    { week:7, day:1, type:"MS",   label:"Max Strength – Fighter",  abbrev:"MS",   note:"Fighter Wk2: 3–5×5 @ 80%. Bench · BSQ · WPU. Trap Bar DL: 1 work set." },
    { week:7, day:2, type:"HIC",  label:"HIC #9 – Fobbit Intervals",abbrev:"HIC", note:"HIC#1-10. Treadmill/Row 2 min + KB Swings ×20 + Snatch 10/arm. Repeat 20 min total." },
    { week:7, day:3, type:"REC",  label:"Recovery",                abbrev:"REC",  note:"Light movement only." },
    { week:7, day:4, type:"MS",   label:"Max Strength – Fighter",  abbrev:"MS",   note:"Fighter Wk2 Day 2: 3–5×5 @ 80%." },
    { week:7, day:5, type:"HIC",  label:"HIC #3 – 600M Resets",   abbrev:"HIC",  note:"HIC#1-10. 600M max effort, rest 3–5 min. 6 reps standard." },
    { week:7, day:6, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 30–60 min. Easy steady-state." },
    { week:7, day:7, type:"REST", label:"Rest",                    abbrev:"REST", note:"Full rest day." },
    // ── WEEK 8 ─────────────────────────────────────────────────────────────
    { week:8, day:1, type:"MS",   label:"Max Strength – Fighter",  abbrev:"MS",   note:"Fighter Wk3: 3–5×3 @ 90%. Bench · BSQ · WPU. Trap Bar DL: 1 work set." },
    { week:8, day:2, type:"HIC",  label:"HIC #10 – Short Hills",   abbrev:"HIC",  note:"HIC#1-10. 10 hill sprints. 30–60s rest. Aerobic/anaerobic transition." },
    { week:8, day:3, type:"REC",  label:"Recovery",                abbrev:"REC",  note:"Light movement only." },
    { week:8, day:4, type:"MS",   label:"Max Strength – Fighter",  abbrev:"MS",   note:"Fighter Wk3 Day 2: 3–5×3 @ 90%." },
    { week:8, day:5, type:"HIC",  label:"HIC #11 – Oxygen Debt 101",abbrev:"HIC", note:"HIC#1-10. 200M ×3 / 30s RI = 1 round. 3–4 rounds. 3 min rest between rounds." },
    { week:8, day:6, type:"E",    label:"Endurance – LSS",         abbrev:"E",    note:"E × 30–60 min. Final endurance session of Base Building." },
    { week:8, day:7, type:"REST", label:"Rest",                    abbrev:"REST", note:"Full rest day. Base Building complete." },
  ]
};

// SE Circuit definition — user's cluster (back-safe)
// TB2: use 15–30% 1RM, circuit style, minimise rest between exercises
const SE_EXERCISES = [
  { id: "squat",  name: "KB Goblet Squat / BW Squat",  unit: "reps", note: "KB goblet squat preferred. Bodyweight if no KB. Upright torso, full depth. No spinal compression." },
  { id: "press",  name: "KB Shoulder Press / Press-ups", unit: "reps", note: "KB press standing or seated, or press-ups to failure then rest-pause. Light load." },
  { id: "row",    name: "Bent-over Row / Inverted Row",  unit: "reps", note: "Inverted row preferred for back safety. Or light DB bent-over row with neutral spine." },
  { id: "swing",  name: "KB Swing",                      unit: "reps", note: "Two-handed Russian swing. Hip hinge drive. Don't squat the swing. Neutral spine throughout." },
  { id: "deadbug", name: "Dead Bug",                     unit: "reps", note: "Slow and controlled. Each rep = one arm + opposite leg extension. Keep lower back pressed to floor." },
];

// MS Fighter cluster
const MS_EXERCISES = [
  { id: "bench", name: "Bench Press", unit: "kg", note: "Main lift. Rest 2–5 min between sets." },
  { id: "bss", name: "Bulgarian Split Squat", unit: "kg", note: "In place of back squat. Per side." },
  { id: "wpu", name: "Weighted Pull-up", unit: "kg", note: "Add weight via belt or vest." },
  { id: "tbdl", name: "Trap Bar Deadlift", unit: "kg", note: "1 work set only. Neutral spine essential." },
];

const HIC_DETAILS = {
  "HIC #3 – 600M Resets": [
    { id: "run600", name: "600M Run – Max Effort", unit: "reps", note: "Each rep = 1 × 600M. Rest 3–5 min fully before next." },
  ],
  "HIC #7 – BOO": [
    { id: "kbswing", name: "KB Swings", unit: "rounds", note: "60 seconds. Then immediately run 800M. Rest 2–3 min." },
    { id: "run800", name: "800M Run", unit: "rounds", note: "After swings. 5 rounds total." },
  ],
  "HIC #9 – Fobbit Intervals": [
    { id: "cardio2", name: "Treadmill / Row (2 min)", unit: "rounds", note: "Easy pace." },
    { id: "kbsw20", name: "KB Swings × 20", unit: "rounds", note: "Then snatch 10/arm. Repeat for 20 min total." },
  ],
  "HIC #11 – Oxygen Debt 101": [
    { id: "run200", name: "200M Sprint", unit: "reps", note: "Max effort. 30s rest, then repeat ×3. That's 1 round. 3–4 rounds total. Rest 3 min between rounds." },
  ],
};

const TYPE_COLORS = {
  SE:   { bg: "#0f3d2e", accent: "#22c55e", text: "#4ade80", label: "STRENGTH ENDURANCE" },
  E:    { bg: "#0c2a4a", accent: "#3b82f6", text: "#60a5fa", label: "ENDURANCE" },
  "E+": { bg: "#0c2a4a", accent: "#6366f1", text: "#818cf8", label: "ENDURANCE+" },
  "E↓": { bg: "#1a2535", accent: "#475569", text: "#94a3b8", label: "EASY RUN" },
  MS:   { bg: "#3d1a0f", accent: "#f97316", text: "#fb923c", label: "MAX STRENGTH" },
  HIC:  { bg: "#3d0f1e", accent: "#ec4899", text: "#f472b6", label: "HIC" },
  "SE↓":{ bg: "#1a2535", accent: "#475569", text: "#94a3b8", label: "SE (EASY)" },
  REC:  { bg: "#1a1a2e", accent: "#6366f1", text: "#818cf8", label: "RECOVERY" },
  REST: { bg: "#111118", accent: "#334155", text: "#64748b", label: "REST" },
};

const fmtDate = d => {
  const dd = new Date(d);
  return dd.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

const today = () => new Date().toISOString().split("T")[0];

// ── Main App ───────────────────────────────────────────────────────────────
function App() {
  const [tab, setTab] = useState("dashboard");
  const [workouts, setWorkouts] = useState([]);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [profile, setProfile] = useState({ weight: 93, bench1rm: "", bss1rm: "", wpu1rm: "", tbdl1rm: "", programmeStart: "" });
  const [loading, setLoading] = useState(true);

  // Load from storage
  useEffect(() => {
    const load = () => {
      try {
        const w = JSON.parse(localStorage.getItem("tb_workouts") || "null");
        if (w) setWorkouts(w);
      } catch {}
      try {
        const p = JSON.parse(localStorage.getItem("tb_profile") || "null");
        if (p) setProfile(p);
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const saveWorkouts = (data) => {
    setWorkouts(data);
    try { localStorage.setItem("tb_workouts", JSON.stringify(data)); } catch {}
  };

  const saveProfile = (data) => {
    setProfile(data);
    try { localStorage.setItem("tb_profile", JSON.stringify(data)); } catch {}
  };

  const startWorkout = (session) => {
    const exercises = session.type === "SE" || session.type === "SE↓"
      ? SE_EXERCISES.map(e => ({ ...e, sets: [{ weight: "", reps: "", done: false }] }))
      : session.type === "MS"
      ? MS_EXERCISES.map(e => ({ ...e, sets: [{ weight: "", reps: "", done: false }] }))
      : session.type === "HIC" && HIC_DETAILS[session.label]
      ? HIC_DETAILS[session.label].map(e => ({ ...e, sets: [{ weight: "", reps: "", done: false }] }))
      : session.type === "E" || session.type === "E+" || session.type === "E↓"
      ? [{ id: "run", name: "Run / LSS", unit: "min", note: session.note, sets: [{ weight: "", reps: "", done: false }] }]
      : [];

    setActiveWorkout({
      id: Date.now().toString(),
      date: today(),
      sessionLabel: session.label,
      abbrev: session.abbrev,
      type: session.type,
      week: session.week,
      day: session.day,
      programmeDay: `Wk${session.week} D${session.day}`,
      note: session.note,
      reps: session.reps || null,
      circuits: session.circuits || null,
      startTime: Date.now(),
      exercises,
      warmupDone: false,
    });
    setTab("workout");
  };

  const finishWorkout = () => {
    if (!activeWorkout) return;
    const duration = Math.round((Date.now() - activeWorkout.startTime) / 60000);
    const completed = { ...activeWorkout, duration, endTime: Date.now() };
    saveWorkouts([completed, ...workouts]);
    setActiveWorkout(null);
    setTab("history");
  };

  const discardWorkout = () => { setActiveWorkout(null); setTab("dashboard"); };

  if (loading) return <div style={{ color: "#fff", padding: "2rem", fontFamily: "Barlow Condensed, sans-serif", fontSize: 20 }}>Loading…</div>;

  return (


      <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", paddingBottom: 72, maxWidth: 480, margin: "0 auto" }}>

        {tab === "dashboard" && <Dashboard workouts={workouts} profile={profile} programme={PROGRAMME} onStart={startWorkout} />}
        {tab === "workout" && <WorkoutScreen active={activeWorkout} setActive={setActiveWorkout} onFinish={finishWorkout} onDiscard={discardWorkout} workouts={workouts} />}
        {tab === "history" && <HistoryScreen workouts={workouts} />}
        {tab === "setup" && <SetupScreen profile={profile} onSave={saveProfile} />}

        <BottomNav tab={tab} setTab={setTab} hasActive={!!activeWorkout} />
      </div>

  );
}

// ── Bottom Nav ─────────────────────────────────────────────────────────────
function BottomNav({ tab, setTab, hasActive }) {
  const items = [
    { id: "dashboard", icon: "ti-layout-dashboard", label: "Home" },
    { id: "workout", icon: "ti-barbell", label: hasActive ? "Active" : "Workout" },
    { id: "history", icon: "ti-calendar-stats", label: "History" },
    { id: "setup", icon: "ti-settings-2", label: "Set up" },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#111118", borderTop: "1px solid #222", display: "flex", zIndex: 100 }}>
      {items.map(it => (
        <button key={it.id} onClick={() => setTab(it.id)} style={{ flex: 1, background: "none", border: "none", padding: "10px 0 14px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <i className={`ti ${it.icon}`} style={{ fontSize: 22, color: tab === it.id ? "#22c55e" : "#555", position: "relative" }} aria-hidden="true" />
          {it.id === "workout" && hasActive && <span style={{ position: "absolute", width: 7, height: 7, background: "#f97316", borderRadius: "50%", top: 8, marginLeft: 14 }} />}
          <span style={{ fontSize: 11, color: tab === it.id ? "#22c55e" : "#555", letterSpacing: "0.05em", textTransform: "uppercase" }}>{it.label}</span>
        </button>
      ))}
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────
function Dashboard({ workouts, profile, programme, onStart }) {
  const todayStr = today();
  const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  const thisWeekCount = workouts.filter(w => new Date(w.date) >= weekStart).length;
  const streak = calcStreak(workouts);

  // Determine current programme week
  const progStart = profile.programmeStart ? new Date(profile.programmeStart) : null;
  const currentWeek = progStart ? Math.min(Math.ceil((new Date() - progStart) / (7 * 864e5)) + 1, 8) : null;
  const isEasy = currentWeek && programme.easyWeeks.includes(currentWeek);

  const todaySessions = currentWeek
    ? programme.schedule.filter(s => s.week === currentWeek)
    : programme.schedule.filter(s => s.week === 1);

  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ paddingTop: 48, paddingBottom: 16 }}>
        <p style={{ color: "#22c55e", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>Tactical Barbell</p>
        <h1 style={{ fontSize: 38, fontWeight: 700, margin: "4px 0 0", lineHeight: 1, letterSpacing: "-0.02em" }}>Base Building</h1>
        <p style={{ color: "#666", fontSize: 16, margin: "6px 0 0", fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}>SE-first · 8 weeks</p>
      </div>

      {isEasy && (
        <div style={{ background: "#1c1c0a", border: "1px solid #3d3d00", borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <i className="ti ti-bolt" style={{ color: "#facc15", fontSize: 18 }} aria-hidden="true" />
          <span style={{ color: "#facc15", fontSize: 15, fontWeight: 600, letterSpacing: "0.05em" }}>EASY WEEK — Cut volume and intensity</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
        <StatCard label="Streak" value={streak} unit="days" color="#22c55e" />
        <StatCard label="This week" value={thisWeekCount} unit="sessions" color="#3b82f6" />
        <StatCard label="Total" value={workouts.length} unit="workouts" color="#f97316" />
      </div>

      {currentWeek && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "#666", letterSpacing: "0.1em", textTransform: "uppercase" }}>Programme Progress</span>
            <span style={{ fontSize: 13, color: "#22c55e" }}>Week {currentWeek} / 8</span>
          </div>
          <div style={{ height: 6, background: "#1e1e2e", borderRadius: 3 }}>
            <div style={{ height: 6, background: "#22c55e", borderRadius: 3, width: `${(currentWeek / 8) * 100}%`, transition: "width 0.4s" }} />
          </div>
        </div>
      )}

      <div style={{ marginBottom: 8 }}>
        <p style={{ fontSize: 13, color: "#666", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>
          {currentWeek ? `Week ${currentWeek} Sessions` : "Week 1 Preview"}
        </p>
        {todaySessions.map((s, i) => (
          <SessionCard key={i} session={s} onStart={onStart} completedToday={workouts.some(w => w.date === todayStr && w.week === s.week && w.day === s.day)} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, color }) {
  return (
    <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, padding: "12px 14px" }}>
      <div style={{ fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{label}</div>
    </div>
  );
}

function SessionCard({ session, onStart, completedToday }) {
  const col = TYPE_COLORS[session.type] || TYPE_COLORS["E"];
  return (
    <div style={{ background: col.bg, border: `1px solid ${col.accent}33`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ background: col.accent + "22", color: col.accent, fontSize: 11, padding: "2px 8px", borderRadius: 4, letterSpacing: "0.1em", fontWeight: 700 }}>{col.label}</span>
          <span style={{ color: "#444", fontSize: 12 }}>Wk{session.week} · D{session.day}</span>
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: col.text, letterSpacing: "0.02em" }}>{session.label}</div>
        <div style={{ fontSize: 13, color: "#888", marginTop: 3, fontFamily: "'Barlow', sans-serif", fontWeight: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.note}</div>
      </div>
      <button
        onClick={() => onStart(session)}
        disabled={session.type === "REST"}
        style={{ marginLeft: 12, background: completedToday ? "#1a3320" : col.accent, border: "none", borderRadius: 8, padding: "8px 14px", color: completedToday ? "#22c55e" : "#000", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, cursor: session.type === "REST" ? "default" : "pointer", whiteSpace: "nowrap", letterSpacing: "0.05em", opacity: session.type === "REST" ? 0.4 : 1 }}
      >
        {session.type === "REST" ? "REST" : completedToday ? "✓ Done" : "Start →"}
      </button>
    </div>
  );
}

// ── Workout Screen ─────────────────────────────────────────────────────────
function WorkoutScreen({ active, setActive, onFinish, onDiscard, workouts }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - active.startTime) / 1000)), 1000);
    return () => clearInterval(t);
  }, [active]);

  if (!active) {
    return (
      <div style={{ padding: "40px 16px", textAlign: "center" }}>
        <i className="ti ti-barbell" style={{ fontSize: 48, color: "#333", display: "block", marginBottom: 16 }} aria-hidden="true" />
        <p style={{ color: "#666", fontSize: 18, fontFamily: "'Barlow', sans-serif" }}>No active workout.</p>
        <p style={{ color: "#444", fontSize: 15, fontFamily: "'Barlow', sans-serif" }}>Start one from the Home screen.</p>
      </div>
    );
  }

  const col = TYPE_COLORS[active.type] || TYPE_COLORS["E"];
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  const updateSet = (exIdx, setIdx, field, val) => {
    const updated = { ...active };
    updated.exercises = updated.exercises.map((ex, ei) =>
      ei === exIdx ? { ...ex, sets: ex.sets.map((s, si) => si === setIdx ? { ...s, [field]: val } : s) } : ex
    );
    setActive(updated);
  };

  const toggleSetDone = (exIdx, setIdx) => {
    updateSet(exIdx, setIdx, "done", !active.exercises[exIdx].sets[setIdx].done);
  };

  const addSet = (exIdx) => {
    const prev = active.exercises[exIdx].sets.slice(-1)[0];
    const updated = { ...active };
    updated.exercises = updated.exercises.map((ex, ei) =>
      ei === exIdx ? { ...ex, sets: [...ex.sets, { weight: prev.weight, reps: prev.reps, done: false }] } : ex
    );
    setActive(updated);
  };

  const addExercise = (name) => {
    const updated = { ...active };
    updated.exercises = [...updated.exercises, { id: Date.now().toString(), name, unit: "reps", note: "Custom exercise", sets: [{ weight: "", reps: "", done: false }] }];
    setActive(updated);
  };

  const warmupItems = [
    "5 min light cardio (bike / row / jog)",
    "Hip circles × 10 each side",
    "Thoracic rotations × 10 each side",
    "Leg swings × 10 each side",
    "Band pull-aparts × 15",
    "Bodyweight split squat × 8 each leg",
  ];

  const prevSession = workouts.find(w => w.week === active.week && w.day === active.day && w.id !== active.id);

  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ background: col.bg, borderBottom: `2px solid ${col.accent}`, padding: "16px 0 14px", marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ color: col.accent, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>{active.programmeDay} · {col.label}</span>
            <h2 style={{ fontSize: 26, fontWeight: 700, margin: "2px 0 0", color: col.text, letterSpacing: "0.01em" }}>{active.sessionLabel}</h2>
            {(active.type === "SE" || active.type === "SE↓") && active.reps && (
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <span style={{ background: col.accent + "22", color: col.accent, fontSize: 13, padding: "3px 10px", borderRadius: 6, fontWeight: 700, letterSpacing: "0.06em" }}>
                  {active.circuits} circuits × {active.reps} reps
                </span>
              </div>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: col.accent, letterSpacing: "0.02em", fontVariantNumeric: "tabular-nums" }}>{timeStr}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{active.date}</div>
          </div>
        </div>
        {active.note && <p style={{ fontSize: 14, color: "#999", margin: "8px 0 0", fontFamily: "'Barlow', sans-serif", lineHeight: 1.4 }}>{active.note}</p>}
      </div>

      {/* Warmup */}
      <Section title="Warmup" accent={col.accent}>
        {warmupItems.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid #1e1e2e" }}>
            <span style={{ width: 22, height: 22, background: "#1e1e2e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#555", flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontSize: 15, color: "#ccc", fontFamily: "'Barlow', sans-serif" }}>{item}</span>
          </div>
        ))}
      </Section>

      {/* Exercises */}
      {active.exercises.map((ex, exIdx) => {
        const prevEx = prevSession?.exercises?.find(e => e.id === ex.id);
        return (
          <Section key={ex.id} title={ex.name} accent={col.accent} note={ex.note}>
            {prevEx && (
              <div style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: 6, padding: "6px 10px", marginBottom: 8, fontSize: 13, color: "#666", fontFamily: "'Barlow', sans-serif" }}>
                <span style={{ color: "#444" }}>Last: </span>
                {prevEx.sets.filter(s => s.done).map((s, i) => (
                  <span key={i} style={{ marginRight: 8, color: "#555" }}>{s.weight ? `${s.weight}kg×` : ""}{s.reps}{ex.unit !== "kg" ? " reps" : ""}</span>
                ))}
              </div>
            )}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ width: 36 }} />
                  <col style={{ width: "33%" }} />
                  <col style={{ width: "33%" }} />
                  <col style={{ width: 44 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th style={thStyle}>#</th>
                    <th style={thStyle}>{ex.unit === "min" ? "Duration" : "Weight"}</th>
                    <th style={thStyle}>{ex.unit === "min" ? "Notes" : "Reps"}</th>
                    <th style={thStyle}>✓</th>
                  </tr>
                </thead>
                <tbody>
                  {ex.sets.map((s, si) => (
                    <tr key={si} style={{ background: s.done ? "#0f2b1a" : "transparent" }}>
                      <td style={{ ...tdStyle, color: "#555", textAlign: "center" }}>{si + 1}</td>
                      <td style={tdStyle}>
                        <input
                          type="number"
                          value={s.weight}
                          onChange={e => updateSet(exIdx, si, "weight", e.target.value)}
                          placeholder={ex.unit === "min" ? "mins" : "kg"}
                          style={inputStyle}
                        />
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="number"
                          value={s.reps}
                          onChange={e => updateSet(exIdx, si, "reps", e.target.value)}
                          placeholder={ex.unit === "min" ? "—" : "reps"}
                          style={inputStyle}
                        />
                      </td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>
                        <button
                          onClick={() => toggleSetDone(exIdx, si)}
                          style={{ width: 28, height: 28, borderRadius: 6, background: s.done ? "#22c55e" : "#1e1e2e", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}
                          aria-label={s.done ? "Mark incomplete" : "Mark complete"}
                        >
                          {s.done && <i className="ti ti-check" style={{ color: "#000", fontSize: 14 }} aria-hidden="true" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => addSet(exIdx)} style={ghostBtn(col.accent)}>+ Add set</button>
          </Section>
        );
      })}

      <AddExerciseRow onAdd={addExercise} accent={col.accent} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 24, marginBottom: 32 }}>
        <button onClick={onDiscard} style={{ background: "#1e1e2e", border: "1px solid #333", borderRadius: 10, padding: "14px", color: "#888", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" }}>Discard</button>
        <button onClick={onFinish} style={{ background: "#22c55e", border: "none", borderRadius: 10, padding: "14px", color: "#000", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" }}>Finish ✓</button>
      </div>
    </div>
  );
}

function Section({ title, accent, note, children }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#ccc" }}>{title}</div>
        {note && <div style={{ fontSize: 13, color: "#666", fontFamily: "'Barlow', sans-serif", lineHeight: 1.4, marginTop: 2 }}>{note}</div>}
      </div>
      {children}
    </div>
  );
}

function AddExerciseRow({ onAdd, accent }) {
  const [val, setVal] = useState("");
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
      <input
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder="Add exercise…"
        style={{ flex: 1, background: "#111118", border: "1px solid #222", borderRadius: 8, padding: "8px 12px", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16 }}
      />
      <button
        onClick={() => { if (val.trim()) { onAdd(val.trim()); setVal(""); } }}
        style={{ background: accent + "22", border: `1px solid ${accent}55`, borderRadius: 8, padding: "8px 14px", color: accent, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer" }}
      >
        Add
      </button>
    </div>
  );
}

const thStyle = { fontSize: 11, color: "#555", textAlign: "left", padding: "4px 6px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 };
const tdStyle = { padding: "4px 4px" };
const inputStyle = { width: "100%", background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: 6, padding: "6px 8px", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, boxSizing: "border-box" };
const ghostBtn = (accent) => ({ background: "none", border: `1px dashed ${accent}44`, borderRadius: 6, padding: "6px 10px", color: accent + "99", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, cursor: "pointer", marginTop: 6, width: "100%" });

// ── History ────────────────────────────────────────────────────────────────
function HistoryScreen({ workouts }) {
  if (workouts.length === 0) {
    return (
      <div style={{ padding: "40px 16px", textAlign: "center" }}>
        <i className="ti ti-calendar-stats" style={{ fontSize: 48, color: "#333", display: "block", marginBottom: 16 }} aria-hidden="true" />
        <p style={{ color: "#666", fontSize: 18, fontFamily: "'Barlow', sans-serif" }}>No workouts logged yet.</p>
        <p style={{ color: "#444", fontSize: 15, fontFamily: "'Barlow', sans-serif" }}>Complete your first session to see it here.</p>
      </div>
    );
  }
  return (
    <div style={{ padding: "24px 16px" }}>
      <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.01em" }}>History</h2>
      {workouts.map(w => {
        const col = TYPE_COLORS[w.type] || TYPE_COLORS["E"];
        const setCount = w.exercises ? w.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.done).length, 0) : 0;
        return (
          <div key={w.id} style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, padding: "14px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <span style={{ background: col.accent + "22", color: col.accent, fontSize: 11, padding: "2px 8px", borderRadius: 4, letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase" }}>{col.label}</span>
                <div style={{ fontSize: 19, fontWeight: 700, marginTop: 4, letterSpacing: "0.02em" }}>{w.sessionLabel}</div>
                <div style={{ fontSize: 13, color: "#666", fontFamily: "'Barlow', sans-serif" }}>{fmtDate(w.date)} · {w.programmeDay}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#ccc" }}>{w.duration}<span style={{ fontSize: 13, color: "#666" }}> min</span></div>
                <div style={{ fontSize: 12, color: "#555" }}>{setCount} sets</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(w.exercises || []).map(ex => (
                <span key={ex.id} style={{ background: "#1a1a2a", border: "1px solid #222", borderRadius: 6, padding: "3px 10px", fontSize: 13, color: "#888" }}>{ex.name}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Setup ──────────────────────────────────────────────────────────────────
function SetupScreen({ profile, onSave }) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const calcPct = (rm, pct) => {
    if (!rm) return "—";
    return Math.round(parseFloat(rm) * pct / 100 * 2) / 2 + " kg";
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: "24px 16px" }}>
      <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.01em" }}>Set up</h2>
      <p style={{ color: "#666", fontSize: 15, fontFamily: "'Barlow', sans-serif", margin: "0 0 24px" }}>Enter your 1RMs to calculate training loads. Test a 3–5RM and calculate, or estimate conservatively.</p>

      <SetupGroup title="Programme">
        <Field label="Programme start date" type="date" value={form.programmeStart} onChange={v => set("programmeStart", v)} hint="Used to calculate your current week." />
        <Field label="Bodyweight" type="number" value={form.weight} onChange={v => set("weight", v)} suffix="kg" />
      </SetupGroup>

      <SetupGroup title="1-Rep Maxima (tested or estimated)">
        <Field label="Bench Press 1RM" type="number" value={form.bench1rm} onChange={v => set("bench1rm", v)} suffix="kg" hint="Used for Fighter template loading." />
        <Field label="Bulgarian Split Squat 1RM" type="number" value={form.bss1rm} onChange={v => set("bss1rm", v)} suffix="kg" hint="Per side. Start conservatively — spinal load risk." />
        <Field label="Weighted Pull-up 1RM" type="number" value={form.wpu1rm} onChange={v => set("wpu1rm", v)} suffix="kg" hint="Add bodyweight (e.g. 93kg BW + 20kg = 113kg total) or enter added load only." />
        <Field label="Trap Bar Deadlift 1RM" type="number" value={form.tbdl1rm} onChange={v => set("tbdl1rm", v)} suffix="kg" hint="1 work set per week. Build cautiously given back history." />
      </SetupGroup>

      {(form.bench1rm || form.bss1rm || form.wpu1rm || form.tbdl1rm) && (
        <SetupGroup title="Training loads — Fighter template">
          <PctTable label="Bench Press" rm={form.bench1rm} />
          <PctTable label="Bulgarian Split Squat" rm={form.bss1rm} />
          <PctTable label="Weighted Pull-up (added load)" rm={form.wpu1rm} />
          <PctTable label="Trap Bar Deadlift" rm={form.tbdl1rm} />
        </SetupGroup>
      )}

      <SetupGroup title="Back injury notes">
        <div style={{ background: "#1a0f0f", border: "1px solid #3d1a1a", borderRadius: 10, padding: "12px 14px" }}>
          <p style={{ color: "#f87171", fontSize: 14, margin: 0, fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}>
            <strong style={{ display: "block", marginBottom: 4 }}>Back-safe programming in effect:</strong>
            • No back squats — Bulgarian Split Squat substituted<br />
            • Trap bar DL only — 1 work set per week maximum<br />
            • No high-volume spinal loading<br />
            • SE circuit avoids lumbar flexion under load<br />
            • Build loads gradually each block<br />
            • Stop and rest if back tightness emerges during a session
          </p>
        </div>
      </SetupGroup>

      <button
        onClick={handleSave}
        style={{ width: "100%", background: saved ? "#166534" : "#22c55e", border: "none", borderRadius: 10, padding: "16px", color: "#000", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 700, cursor: "pointer", marginTop: 8, letterSpacing: "0.05em", marginBottom: 16 }}
      >
        {saved ? "✓ Saved" : "Save profile"}
      </button>
    </div>
  );
}

function SetupGroup({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 13, color: "#22c55e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>{title}</div>
      <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, suffix, hint }) {
  return (
    <div style={{ padding: "12px 14px", borderBottom: "1px solid #1a1a28" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: hint ? 4 : 0 }}>
        <label style={{ fontSize: 16, color: "#ccc", fontFamily: "'Barlow', sans-serif" }}>{label}</label>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{ background: "#0f0f1a", border: "1px solid #222", borderRadius: 6, padding: "6px 10px", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, width: type === "date" ? 160 : 80, textAlign: "right" }}
          />
          {suffix && <span style={{ color: "#666", fontSize: 14, minWidth: 24 }}>{suffix}</span>}
        </div>
      </div>
      {hint && <p style={{ fontSize: 12, color: "#555", margin: 0, fontFamily: "'Barlow', sans-serif", lineHeight: 1.4 }}>{hint}</p>}
    </div>
  );
}

function PctTable({ label, rm }) {
  if (!rm) return null;
  const pcts = [75, 80, 85, 90, 95];
  return (
    <div style={{ padding: "10px 14px", borderBottom: "1px solid #1a1a28" }}>
      <div style={{ fontSize: 14, color: "#888", marginBottom: 6, fontFamily: "'Barlow', sans-serif" }}>{label}</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {pcts.map(p => (
          <div key={p} style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: 6, padding: "4px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#555" }}>{p}%</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#ccc" }}>{Math.round(parseFloat(rm) * p / 100 / 2.5) * 2.5}kg</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
function calcStreak(workouts) {
  if (!workouts.length) return 0;
  const dates = [...new Set(workouts.map(w => w.date))].sort().reverse();
  let streak = 0;
  let current = new Date();
  for (const d of dates) {
    const diff = Math.round((current - new Date(d)) / 864e5);
    if (diff <= 1) { streak++; current = new Date(d); }
    else break;
  }
  return streak;
}
export default App;
