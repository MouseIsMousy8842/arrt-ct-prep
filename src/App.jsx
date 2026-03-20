export default function ArrtCtPrepWebsite() {
  const features = [
    {
      title: "Structured CT Study Paths",
      description:
        "Follow focused study tracks for patient care, imaging procedures, physics, instrumentation, cross-sectional anatomy, and exam strategy.",
    },
    {
      title: "Practice Questions & Mock Exams",
      description:
        "Build confidence with timed quizzes, full-length practice tests, score tracking, and detailed answer explanations.",
    },
    {
      title: "Flashcards & Quick Review",
      description:
        "Use bite-sized review tools for contrast, protocols, positioning, image quality, dose concepts, and common pathology.",
    },
    {
      title: "Progress Dashboard",
      description:
        "See completion status, weak-topic alerts, recent quiz performance, and a clear path to exam readiness.",
    },
  ];

  const sections = [
    "CT Physics & Image Formation",
    "Patient Safety & Contrast",
    "Cross-Sectional Anatomy",
    "Scanning Procedures & Protocols",
    "Artifacts, Dose, and Quality Control",
    "Timed ARRT-Style Practice",
  ];

  const plans = [
    {
      title: "2-Week Sprint",
      description:
        "For test-takers who already know the basics and need focused review, repetition, and timed practice.",
    },
    {
      title: "4-Week Core Prep",
      description:
        "A balanced study plan with weekly milestones, mixed quizzes, and anatomy reinforcement.",
    },
    {
      title: "8-Week Confidence Plan",
      description:
        "Best for learners building from the ground up with guided lessons, checkpoints, and mock exam pacing.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xl font-bold">Telos Energy</div>
            <div className="text-sm text-slate-400">ARRT CT Test Prep</div>
          </div>
          <button className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-black">
            Start Studying
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          ARRT CT Test Prep Platform
        </h1>
        <p className="mt-4 max-w-xl text-slate-300">
          Study smarter, practice with purpose, and track your progress with a
          modern CT exam prep platform.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{f.description}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-bold text-white">Study Topics</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sections.map((s) => (
            <div
              key={s}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              {s}
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-bold text-white">Study Plans</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{p.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}