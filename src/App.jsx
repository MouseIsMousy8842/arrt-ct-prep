import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, Clock3, RefreshCcw, Trophy, CheckCircle2, AlertCircle, BarChart3, Layers3, ShieldCheck, ScanLine, ChevronRight } from "lucide-react";

const studyModules = [
  {
    id: "physics",
    title: "CT Physics & Image Formation",
    icon: Brain,
    color: "from-cyan-400/20 to-blue-500/20",
    image: {
      label: "HU Scale",
      items: [
        ["Air", "-1000"],
        ["Lung", "-500"],
        ["Water", "0"],
        ["Soft Tissue", "+40"],
        ["Bone", "+1000"],
      ],
    },
    summary:
      "Understand attenuation, detector systems, pitch, slice thickness, windowing, and Hounsfield Units.",
    bullets: [
      "X-ray photons are attenuated differently by different tissues.",
      "Hounsfield Units compare tissue density to water, which is assigned 0 HU.",
      "Pitch affects image quality and dose: higher pitch usually means faster scans and lower dose, but potentially lower detail.",
      "kVp changes beam energy; mA changes the quantity of photons produced.",
      "Spatial resolution describes sharpness; contrast resolution describes the ability to distinguish subtle density differences.",
    ],
  },
  {
    id: "quality",
    title: "Image Quality & Artifacts",
    icon: Layers3,
    color: "from-fuchsia-400/20 to-violet-500/20",
    image: {
      label: "Artifact Types",
      items: [
        ["Motion", "Blur"],
        ["Metal", "Streak"],
        ["Beam Hardening", "Bands"],
        ["Partial Volume", "Averaging"],
      ],
    },
    summary:
      "Recognize how artifacts form and how protocol choices change image quality.",
    bullets: [
      "Motion artifact causes blurring or duplication.",
      "Beam hardening often appears near dense structures such as the skull base.",
      "Metal artifact can create severe streaking and obscure anatomy.",
      "Thin slices improve detail but can increase noise.",
      "Window level and window width directly affect how anatomy is displayed.",
    ],
  },
  {
    id: "safety",
    title: "Patient Safety & Contrast",
    icon: ShieldCheck,
    color: "from-emerald-400/20 to-teal-500/20",
    image: {
      label: "Contrast Workflow",
      items: [
        ["Screen", "Allergy / GFR"],
        ["Inject", "IV Contrast"],
        ["Monitor", "Reaction / Extravasation"],
        ["Document", "Dose / Response"],
      ],
    },
    summary:
      "Master contrast screening, reaction response, IV safety, and patient preparation.",
    bullets: [
      "Always verify the patient, exam, indication, and contrast order before scanning.",
      "Iodinated contrast carries risk for allergic-like reactions and extravasation.",
      "Renal function screening is especially important in higher-risk patients.",
      "The technologist must know when to stop the injection and when to escalate care.",
      "Pregnancy screening and radiation risk communication are high-yield exam areas.",
    ],
  },
  {
    id: "anatomy",
    title: "Cross-Sectional Anatomy",
    icon: ScanLine,
    color: "from-amber-400/20 to-orange-500/20",
    image: {
      label: "Abdomen Axial Landmarks",
      items: [
        ["Liver", "RUQ"],
        ["Spleen", "LUQ"],
        ["Aorta", "Left of midline"],
        ["IVC", "Right of aorta"],
      ],
    },
    summary:
      "Identify normal anatomy on axial CT images and recognize major landmarks.",
    bullets: [
      "On axial images, orientation and side markers matter.",
      "Aorta and IVC must be quickly distinguished in abdomen studies.",
      "Brain ventricles, chest vessels, abdominal organs, and bony landmarks are all commonly tested.",
      "Cross-sectional anatomy is best learned through repetition and labeling.",
      "The exam often tests the relationship between structures, not just isolated names.",
    ],
  },
  {
    id: "protocols",
    title: "Scanning Procedures & Protocols",
    icon: BookOpen,
    color: "from-sky-400/20 to-indigo-500/20",
    image: {
      label: "Protocol Elements",
      items: [
        ["Positioning", "Head first / Feet first"],
        ["Phase", "Non-con / Arterial / Venous / Delayed"],
        ["Slice", "Thin / Routine / Reformats"],
        ["Timing", "Bolus tracking"],
      ],
    },
    summary:
      "Know common protocol decisions for head, chest, abdomen, pelvis, angiography, and trauma studies.",
    bullets: [
      "A head CT for acute stroke evaluation is often performed without contrast first.",
      "Chest, abdomen, and pelvis studies may require different contrast timing depending on the indication.",
      "Bolus timing changes visualization of vessels and organs.",
      "Reconstructions and multiplanar reformats are core components of many CT exams.",
      "Patient instruction, breath hold timing, and positioning affect diagnostic quality.",
    ],
  },
  {
    id: "dose",
    title: "Dose, Radiation Protection & QC",
    icon: AlertCircle,
    color: "from-rose-400/20 to-red-500/20",
    image: {
      label: "Dose Concepts",
      items: [
        ["ALARA", "As low as reasonably achievable"],
        ["CTDIvol", "Scanner output estimate"],
        ["DLP", "Dose length product"],
        ["AEC", "Automatic exposure control"],
      ],
    },
    summary:
      "Learn dose terminology, ALARA, shielding principles, protocol optimization, and QC fundamentals.",
    bullets: [
      "Dose reduction must be balanced against diagnostic image quality.",
      "CTDIvol and DLP are common dose metrics but do not equal exact patient dose.",
      "Automatic exposure control helps tailor dose to patient size and anatomy.",
      "Quality control supports consistency, calibration, and safe scanner performance.",
      "Pediatric dose reduction is a frequent test focus area.",
    ],
  },
];

const questionBank = [
  {
    id: 1,
    topic: "physics",
    difficulty: "easy",
    question: "What Hounsfield Unit value is assigned to water?",
    choices: ["-1000", "0", "+100", "+1000"],
    correctIndex: 1,
    explanation: "Water is the baseline reference for HU and is assigned 0.",
  },
  {
    id: 2,
    topic: "physics",
    difficulty: "medium",
    question: "Increasing mA primarily changes which of the following?",
    choices: ["Photon quantity", "Photon energy only", "Patient positioning", "Pitch"],
    correctIndex: 0,
    explanation: "mA changes the number of photons produced, which affects noise and dose.",
  },
  {
    id: 3,
    topic: "quality",
    difficulty: "easy",
    question: "Which artifact is most commonly caused by patient movement during the scan?",
    choices: ["Beam hardening", "Motion artifact", "Ring artifact", "Aliasing"],
    correctIndex: 1,
    explanation: "Motion during acquisition causes blur, duplication, or streak-like distortion.",
  },
  {
    id: 4,
    topic: "quality",
    difficulty: "medium",
    question: "Reducing slice thickness usually has what tradeoff?",
    choices: ["Less noise", "Higher noise", "Lower spatial resolution", "No effect"],
    correctIndex: 1,
    explanation: "Thinner slices improve detail but usually increase image noise.",
  },
  {
    id: 5,
    topic: "safety",
    difficulty: "easy",
    question: "Extravasation refers to:",
    choices: ["Air in the tubing", "Leakage of contrast into surrounding tissue", "A delayed scan phase", "A scanner malfunction"],
    correctIndex: 1,
    explanation: "Extravasation is contrast leaking outside the vein into local tissue.",
  },
  {
    id: 6,
    topic: "safety",
    difficulty: "medium",
    question: "Before administering iodinated contrast, a high-yield safety check is the patient’s:",
    choices: ["Favorite medication", "Renal function", "Eye color", "Heart rate variability only"],
    correctIndex: 1,
    explanation: "Renal function screening is important for higher-risk contrast patients.",
  },
  {
    id: 7,
    topic: "anatomy",
    difficulty: "easy",
    question: "On an axial abdominal CT, the IVC is usually located:",
    choices: ["Left of the aorta", "Right of the aorta", "Posterior to the spine", "Inside the liver"],
    correctIndex: 1,
    explanation: "The inferior vena cava is usually seen to the patient’s right of the aorta.",
  },
  {
    id: 8,
    topic: "anatomy",
    difficulty: "medium",
    question: "Which organ is primarily located in the left upper quadrant?",
    choices: ["Liver", "Appendix", "Spleen", "Gallbladder"],
    correctIndex: 2,
    explanation: "The spleen lies in the LUQ and is a commonly tested landmark.",
  },
  {
    id: 9,
    topic: "protocols",
    difficulty: "easy",
    question: "A non-contrast head CT is commonly used first in evaluating:",
    choices: ["Kidney stones", "Acute stroke or head bleed", "Foot trauma", "Sinus infection only"],
    correctIndex: 1,
    explanation: "A non-contrast head CT is commonly used to evaluate hemorrhage and acute neurologic change.",
  },
  {
    id: 10,
    topic: "protocols",
    difficulty: "medium",
    question: "Bolus tracking is used to optimize:",
    choices: ["Patient registration", "Contrast timing", "Scanner cleaning", "Table height only"],
    correctIndex: 1,
    explanation: "Bolus tracking helps capture the desired contrast enhancement phase.",
  },
  {
    id: 11,
    topic: "dose",
    difficulty: "easy",
    question: "ALARA stands for:",
    choices: ["As little as radiation allows", "As low as reasonably achievable", "Always limit all radiation absolutely", "Automatic low-range acquisition"],
    correctIndex: 1,
    explanation: "ALARA is a foundational radiation protection principle.",
  },
  {
    id: 12,
    topic: "dose",
    difficulty: "medium",
    question: "Which dose-reduction feature automatically adjusts exposure based on patient size or anatomy?",
    choices: ["Window width", "AEC", "MPR", "PACS"],
    correctIndex: 1,
    explanation: "AEC stands for automatic exposure control.",
  },
  {
    id: 13,
    topic: "physics",
    difficulty: "hard",
    question: "Increasing kVp primarily affects which characteristic of the x-ray beam?",
    choices: ["Beam energy", "Patient ID accuracy", "Table speed only", "Reconstruction kernel name"],
    correctIndex: 0,
    explanation: "kVp changes beam energy and influences penetration and contrast.",
  },
  {
    id: 14,
    topic: "quality",
    difficulty: "hard",
    question: "Dark bands near dense bone structures on CT are most associated with:",
    choices: ["Motion", "Beam hardening", "Extravasation", "AEC error"],
    correctIndex: 1,
    explanation: "Beam hardening commonly occurs near dense anatomy like the skull base.",
  },
  {
    id: 15,
    topic: "protocols",
    difficulty: "hard",
    question: "Which exam factor most directly determines whether arterial, venous, or delayed phase images are obtained?",
    choices: ["The clinical indication", "The patient’s shoe size", "The scanner brand only", "The room temperature"],
    correctIndex: 0,
    explanation: "Protocol phase selection depends on the clinical question being answered.",
  },
  {
    id: 16,
    topic: "dose",
    difficulty: "hard",
    question: "DLP is best described as:",
    choices: ["A patient registration metric", "A total scan output metric related to scan length", "A contrast timing score", "A reconstruction speed value"],
    correctIndex: 1,
    explanation: "DLP stands for dose length product and reflects scanner output across scan length.",
  },
  {
    id: 17,
    topic: "safety",
    difficulty: "hard",
    question: "The first technologist action when significant contrast extravasation is suspected is to:",
    choices: ["Ignore it and finish the exam", "Stop the injection and assess the site", "Restart injection at higher flow", "Delete the scan"],
    correctIndex: 1,
    explanation: "The injection should be stopped and the patient/site assessed according to protocol.",
  },
  {
    id: 18,
    topic: "anatomy",
    difficulty: "hard",
    question: "Which vessel is typically the major anterior midline arterial structure seen on axial abdomen CT?",
    choices: ["IVC", "Portal vein", "Aorta", "Splenic vein"],
    correctIndex: 2,
    explanation: "The aorta is a major arterial landmark and is commonly identified on axial images.",
  },
];

const topicLabel = {
  physics: "Physics",
  quality: "Image Quality",
  safety: "Safety & Contrast",
  anatomy: "Anatomy",
  protocols: "Protocols",
  dose: "Dose & QC",
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
