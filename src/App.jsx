import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, Clock3, RefreshCcw, Trophy, CheckCircle2, AlertCircle, BarChart3, Layers3, ShieldCheck, ScanLine, ChevronRight } from "lucide-react";
import { questionBank } from "./data/questions";
const studyModules = [
  {
    id: "patient-care",
    title: "Patient Care",
    icon: ShieldCheck,
    color: "from-emerald-400/20 to-teal-500/20",
    image: {
      label: "Patient Care Priorities",
      items: [
        ["Assessment", "History / screening / consent"],
        ["Monitoring", "Vitals / LOC / oximetry"],
        ["Transfer", "Ergonomics / safety"],
        ["Devices", "O2 / tubes / catheters"],
      ],
    },
    summary:
      "Focus on patient assessment, preparation, communication, monitoring, transfer safety, lab values, medications, contrast use, venipuncture, injection technique, adverse reactions, and infection control.",
    bullets: [
      "Know screening and scheduling priorities before the scan begins.",
      "Patient history, consent, and communication are tested because they drive safe imaging decisions.",
      "Monitoring includes level of consciousness, fall prevention, vital signs, heart rhythm, and oximetry.",
      "Contrast questions frequently test indications, contraindications, administration routes, dose, reactions, and documentation.",
      "Renal function, pregnancy, dialysis, and post-procedure care are all high-yield patient care topics.",
    ],
  },
  {
    id: "safety",
    title: "Safety",
    icon: AlertCircle,
    color: "from-rose-400/20 to-red-500/20",
    image: {
      label: "Radiation Safety",
      items: [
        ["Beam", "Quality / quantity"],
        ["Interactions", "Photoelectric / Compton"],
        ["Dose", "CTDIvol / DLP / mSv"],
        ["Reduction", "mAs / pitch / AEC / collimation"],
      ],
    },
    summary:
      "Cover radiation physics, beam characteristics, photon interactions, patient dose, personnel protection, shielding, and dose optimization.",
    bullets: [
      "Expect questions on x-ray production, target interactions, and inverse square law concepts.",
      "Photon interactions with matter include photoelectric, Compton, and coherent events.",
      "Patient protection is driven by protocol optimization, positioning, communication, and minimizing unnecessary exposure.",
      "Dose metrics such as absorbed dose, effective dose, CTDI, and DLP are important exam concepts.",
      "Dose modulation, gating, filtration, pitch, and reconstruction choices are all tied to dose control.",
    ],
  },
  {
    id: "image-production",
    title: "Image Production",
    icon: Brain,
    color: "from-cyan-400/20 to-blue-500/20",
    image: {
      label: "Image Production Map",
      items: [
        ["Components", "Gantry / tube / detectors / DAS"],
        ["Parameters", "kVp / mAs / pitch / beam width"],
        ["Acquisition", "Axial / helical / volumetric"],
        ["Reconstruction", "FBP / iterative / MPR / 3D"],
      ],
    },
    summary:
      "This is the largest technical knowledge section outside procedures: scanner components, imaging parameters, acquisition methods, reconstruction, post-processing, display, quality, artifacts, and informatics.",
    bullets: [
      "Know the major CT unit components and what each part does during acquisition.",
      "Imaging parameters such as kVp, mAs, pitch, collimation, slice thickness, SFOV, and planes directly affect image quality and dose.",
      "Data acquisition methods include axial, helical, volumetric, cine, and dual-energy techniques.",
      "Reconstruction concepts include filtered backprojection, iterative reconstruction, kernels, intervals, interpolation, and reformats.",
      "Image evaluation includes windowing, ROI, Hounsfield units, artifacts, PACS, archiving, and quality assurance.",
    ],
  },
  {
    id: "procedures-head-spine-msk",
    title: "Procedures: Head, Spine, and Musculoskeletal",
    icon: ScanLine,
    color: "from-amber-400/20 to-orange-500/20",
    image: {
      label: "Head / Spine / MSK",
      items: [
        ["Head", "Brain / sinuses / orbits / TMJ"],
        ["Spine", "C-spine / T-spine / L-spine / myelo"],
        ["MSK", "Extremities / pelvis / arthrography"],
        ["Focus", "Anatomy / landmarks / protocol"],
      ],
    },
    summary:
      "Study anatomy, pathology recognition, landmarks, vasculature, imaging planes, contrast use, protocol decisions, and trauma applications across head, spine, and MSK exams.",
    bullets: [
      "Brain, sinus, orbit, temporal bone, and maxillofacial studies are common procedure topics.",
      "Spine studies include cervical, thoracic, lumbar, sacrum/coccyx, and post-myelography imaging.",
      "MSK topics include upper/lower extremities, pelvis/hips, scapula/shoulder, and arthrography.",
      "Procedure questions often test why contrast is or is not used and what reconstructions should be performed.",
      "Expect patient-specific modifications for trauma, pediatrics, geriatrics, and bariatric imaging.",
    ],
  },
  {
    id: "procedures-neck-chest",
    title: "Procedures: Neck and Chest",
    icon: Layers3,
    color: "from-fuchsia-400/20 to-violet-500/20",
    image: {
      label: "Neck / Chest",
      items: [
        ["Neck", "Airway / larynx / soft tissue"],
        ["Chest", "Lung / mediastinum / heart"],
        ["Protocols", "CTA / CTV / PE / dissection"],
        ["Focus", "Timing / anatomy / pathology"],
      ],
    },
    summary:
      "Master neck and chest studies, including soft tissue neck, airway, lung, mediastinum, heart, chest wall, and low-dose screening concepts.",
    bullets: [
      "Questions often tie anatomy and pathology to contrast timing and exam indication.",
      "Pulmonary embolism, dissection, trauma, and chest CTA concepts are important.",
      "Low-dose lung screening is a distinct chest topic worth separate review.",
      "Breath-hold coaching and motion control are major quality factors in chest imaging.",
      "Know how post-processing and reformats support thoracic diagnosis.",
    ],
  },
  {
    id: "procedures-abdomen-pelvis",
    title: "Procedures: Abdomen and Pelvis",
    icon: BookOpen,
    color: "from-sky-400/20 to-indigo-500/20",
    image: {
      label: "Abdomen / Pelvis",
      items: [
        ["Abdomen", "Liver / biliary / pancreas / kidneys"],
        ["Pelvis", "Bladder / colorectal / reproductive"],
        ["Vessels", "CTA / runoff / venogram"],
        ["Focus", "Phases / landmarks / pathology"],
      ],
    },
    summary:
      "This section emphasizes abdominal and pelvic anatomy, pathology recognition, multiphase contrast timing, patient factors, and common protocol choices.",
    bullets: [
      "Liver, biliary tree, spleen, pancreas, adrenals, kidneys, ureters, and GI tract are all core targets.",
      "Pelvic studies cover bladder, colorectal anatomy, and reproductive organs.",
      "Questions commonly test arterial, portal venous, delayed, and noncontrast phase selection.",
      "Trauma, drainage, aspiration, and biopsy support knowledge can appear around procedure questions.",
      "Cross-sectional anatomy and contrast timing are especially important in this category.",
    ],
  },
];


const topicLabel = {
  "patient-care": "Patient Care",
  safety: "Safety",
  "image-production": "Image Production",
  "procedures-head-spine-msk": "Head / Spine / MSK",
  "procedures-neck-chest": "Neck / Chest",
  "procedures-abdomen-pelvis": "Abdomen / Pelvis",
};

function ImageCard({ label, items }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20">
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{label}</div>
      <div className="space-y-3">
        {items.map(([left, right]) => (
          <div key={`${left}-${right}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
            <span className="text-slate-200">{left}</span>
            <span className="font-semibold text-white">{right}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-cyan-400" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function ArrtCtPrepWebsite() {
  const [page, setPage] = useState("home");
  const [quizMode, setQuizMode] = useState("full");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lastWeakTopics, setLastWeakTopics] = useState([]);

  const activeQuestions = useMemo(() => {
    if (quizMode === "retest" && lastWeakTopics.length > 0) {
      return questionBank.filter((q) => lastWeakTopics.includes(q.topic));
    }
    return questionBank;
  }, [quizMode, lastWeakTopics]);

  const scoreData = useMemo(() => {
    const topicStats = {};
    activeQuestions.forEach((q) => {
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0, wrong: 0 };
      }
      topicStats[q.topic].total += 1;
      if (answers[q.id] === q.correctIndex) topicStats[q.topic].correct += 1;
      if (answers[q.id] != null && answers[q.id] !== q.correctIndex) topicStats[q.topic].wrong += 1;
    });

    const correctCount = activeQuestions.filter((q) => answers[q.id] === q.correctIndex).length;
    const percent = activeQuestions.length ? Math.round((correctCount / activeQuestions.length) * 100) : 0;
    const weakTopics = Object.entries(topicStats)
      .filter(([, stats]) => stats.wrong > 0)
      .sort((a, b) => b[1].wrong - a[1].wrong)
      .map(([topic]) => topic);

    return { topicStats, correctCount, percent, weakTopics };
  }, [activeQuestions, answers]);

  const currentQuestion = activeQuestions[currentIndex];

  const startQuiz = (mode) => {
    setQuizMode(mode);
    setQuizStarted(true);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setPage("quiz");
  };

  const submitQuiz = () => {
    setLastWeakTopics(scoreData.weakTopics);
    setShowResults(true);
    setPage("results");
  };

  const answerQuestion = (choiceIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: choiceIndex }));
  };

  const nextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const resetQuizState = () => {
    setQuizStarted(false);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const nav = [
    { id: "home", label: "Home" },
    { id: "study", label: "Study Guide" },
    { id: "quiz", label: "Quiz" },
    { id: "results", label: "Results" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xl font-bold tracking-tight">Telos Energy</div>
            <div className="text-sm text-slate-400">ARRT CT Study & Prep Station</div>
          </div>
          <nav className="hidden gap-2 md:flex">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  page === item.id ? "bg-cyan-400 text-slate-950" : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {page === "home" && (
        <main>
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_left,rgba(59,130,246,0.12),transparent_25%)]" />
            <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
              <div>
                <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  Study. Practice. Improve.
                </div>
                <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                  Comprehensive ARRT CT prep with guided study, graded quizzes, and targeted retesting.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  This platform teaches core CT content, checks your knowledge, scores your weak areas, and sends you back through focused retests until you improve.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button onClick={() => setPage("study")} className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">
                    Open Study Guide
                  </button>
                  <button onClick={() => startQuiz("full")} className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
                    Start Full Quiz
                  </button>
                </div>
                <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-bold text-white">6</div>
                    <div className="mt-1">Study modules</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-bold text-white">18</div>
                    <div className="mt-1">Starter questions</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-bold text-white">∞</div>
                    <div className="mt-1">Retest cycles</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">How this works</h2>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">Adaptive</span>
                  </div>
                  <div className="space-y-3 text-sm text-slate-300">
                    {[
                      "Study the high-yield CT modules",
                      "Take a graded mixed-topic quiz",
                      "See your weak areas by topic",
                      "Retest only what you missed",
                    ].map((item, idx) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">{idx + 1}</div>
                        <div>{item}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <div className="rounded-[28px] border border-white/10 bg-slate-900 p-6 shadow-xl">
                  <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Platform roadmap</div>
                  <div className="mt-5 space-y-4 text-sm text-slate-300">
                    <div className="rounded-2xl bg-white/5 p-4">Starter study guide and adaptive quiz engine included now</div>
                    <div className="rounded-2xl bg-white/5 p-4">Question bank is structured to scale into hundreds or thousands of items</div>
                    <div className="rounded-2xl bg-white/5 p-4">Next step: add persistent user accounts and saved progress</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {page === "study" && (
        <main className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Study Guide</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Comprehensive ARRT CT study guide with visual learning cards.
            </h1>
            <p className="mt-4 text-slate-300">
              These modules are designed for high-yield review. Each section includes a visual reference card, core summary, and essential concepts to memorize.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {studyModules.map((module) => {
              const Icon = module.icon;
              return (
                <section key={module.id} className="rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8">
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                    <div>
                      <div className={`inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${module.color} px-4 py-2 text-sm font-semibold text-white`}>
                        <Icon size={18} />
                        {module.title}
                      </div>
                      <p className="mt-5 text-lg text-slate-200">{module.summary}</p>
                      <div className="mt-6 space-y-3">
                        {module.bullets.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ImageCard label={module.image.label} items={module.image.items} />
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      )}

      {page === "quiz" && (
        <main className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Quiz Mode</p>
              <h1 className="mt-2 text-4xl font-bold text-white">Adaptive quiz engine</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Take a full quiz across all subjects or retest only your weak topics from the last attempt.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => startQuiz("full")} className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950">Full Quiz</button>
              <button
                onClick={() => startQuiz("retest")}
                disabled={lastWeakTopics.length === 0}
                className="rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Retest Weak Areas
              </button>
            </div>
          </div>

          {!quizStarted ? (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <Clock3 className="text-cyan-300" />
                <h3 className="mt-4 text-xl font-semibold text-white">Graded instantly</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">Each attempt tracks score and performance by topic so weak spots are obvious.</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <BarChart3 className="text-cyan-300" />
                <h3 className="mt-4 text-xl font-semibold text-white">Topic analysis</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">Results show how many questions you missed in physics, anatomy, protocols, safety, and dose.</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <RefreshCcw className="text-cyan-300" />
                <h3 className="mt-4 text-xl font-semibold text-white">Focused retesting</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">After each quiz, use adaptive retesting to drill only the topics you missed.</p>
              </div>
            </div>
          ) : currentQuestion ? (
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-cyan-300">{quizMode === "retest" ? "Retest" : "Full Quiz"}</div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    Question {currentIndex + 1} of {activeQuestions.length}
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-slate-950/50 px-4 py-2 text-sm text-slate-300">
                  {topicLabel[currentQuestion.topic]}
                </div>
              </div>

              <ProgressBar value={((currentIndex + 1) / activeQuestions.length) * 100} />

              <div className="mt-8 text-2xl font-semibold leading-9 text-white">{currentQuestion.question}</div>

              <div className="mt-8 grid gap-4">
                {currentQuestion.choices.map((choice, index) => {
                  const selected = answers[currentQuestion.id] === index;
                  return (
                    <button
                      key={choice}
                      onClick={() => answerQuestion(index)}
                      className={`rounded-2xl border px-5 py-4 text-left text-sm transition ${
                        selected
                          ? "border-cyan-400 bg-cyan-400/10 text-white"
                          : "border-white/10 bg-slate-950/50 text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap justify-between gap-3">
                <button onClick={() => setPage("study")} className="rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white">
                  Back to Study Guide
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion.id] == null}
                  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {currentIndex === activeQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : null}
        </main>
      )}

      {page === "results" && (
        <main className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Results</p>
              <h1 className="mt-2 text-4xl font-bold text-white">Performance summary</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Review your score, inspect missed topics, then launch a targeted retest to improve weak areas.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 px-6 py-5 text-center">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Score</div>
              <div className="mt-2 text-5xl font-black text-white">{scoreData.percent}%</div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3 text-white">
                <Trophy className="text-cyan-300" />
                <h2 className="text-xl font-semibold">Attempt overview</h2>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-slate-400">Correct</div>
                  <div className="mt-2 text-3xl font-bold text-white">{scoreData.correctCount}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-slate-400">Total</div>
                  <div className="mt-2 text-3xl font-bold text-white">{activeQuestions.length}</div>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
                {scoreData.weakTopics.length > 0 ? (
                  <>
                    <div className="font-semibold text-white">Weakest topics</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {scoreData.weakTopics.map((topic) => (
                        <span key={topic} className="rounded-full bg-amber-400/15 px-3 py-1 text-amber-200">
                          {topicLabel[topic]}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="font-semibold text-emerald-300">Great job — no weak topics were flagged on this attempt.</div>
                )}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => startQuiz("full")} className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950">
                  Retake Full Quiz
                </button>
                <button
                  onClick={() => startQuiz("retest")}
                  disabled={scoreData.weakTopics.length === 0}
                  className="rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Retest Weak Areas
                </button>
                <button onClick={() => { resetQuizState(); setPage("study"); }} className="rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white">
                  Review Study Guide
                </button>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Topic breakdown</h2>
              <div className="mt-6 space-y-4">
                {Object.entries(scoreData.topicStats).map(([topic, stats]) => {
                  const pct = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
                  return (
                    <div key={topic} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-semibold text-white">{topicLabel[topic]}</div>
                          <div className="text-sm text-slate-400">
                            {stats.correct} correct / {stats.total} total / {stats.wrong} wrong
                          </div>
                        </div>
                        <div className="text-lg font-bold text-white">{pct}%</div>
                      </div>
                      <ProgressBar value={pct} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {showResults && (
            <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Question review</h2>
              <div className="mt-6 space-y-4">
                {activeQuestions.map((q) => {
                  const userAnswer = answers[q.id];
                  const correct = userAnswer === q.correctIndex;
                  return (
                    <div key={q.id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="font-semibold text-white">{q.question}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${correct ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-200"}`}>
                          {correct ? "Correct" : "Needs Review"}
                        </span>
                      </div>
                      <div className="mt-3 text-sm text-slate-300">
                        Your answer: <span className="font-semibold text-white">{userAnswer != null ? q.choices[userAnswer] : "No answer"}</span>
                      </div>
                      {!correct && (
                        <>
                          <div className="mt-2 text-sm text-slate-300">
                            Correct answer: <span className="font-semibold text-cyan-300">{q.choices[q.correctIndex]}</span>
                          </div>
                          <div className="mt-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm text-slate-300">
                            <span className="font-semibold text-white">Explanation:</span> {q.explanation}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      )}

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-slate-200">Telos Energy</div>
            <div>ARRT CT adaptive study guide and quiz prototype</div>
          </div>
          <div className="max-w-xl text-slate-500">
            This version includes a comprehensive starter guide and adaptive retest logic. Next phase: expand the question bank to hundreds or thousands of items and persist user progress.
          </div>
        </div>
      </footer>
    </div>
  );
}

