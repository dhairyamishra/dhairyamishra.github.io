export interface ProjectSignal {
  role: string;
  proof: string;
  filters: string[];
  featuredLabel?: string;
  challenge: string;
  focus: string;
  outcome: string;
}

export const projectSignals: Record<string, ProjectSignal> = {
  'teserax': {
    role: 'Built 0→1 product, architecture, and deployment',
    proof: 'Live deployed agentic workflow product with 226 Playwright E2E tests, MCP integrations, and cloud + local model routing.',
    filters: ['production-systems', 'llms', 'data-infrastructure', 'leadership'],
    featuredLabel: 'Flagship Product',
    challenge: 'Turn linear chat into a controllable, DAG-safe agentic product with real deployment constraints.',
    focus: 'Workflow orchestration, model routing, validation, and production reliability.',
    outcome: 'A live multi-model product shipped end-to-end with strong testing and deployment discipline.',
  },
  'solaris': {
    role: 'Research engineering on data + evaluation systems',
    proof: 'First multiplayer world model with 12.64M synchronized frames, multi-agent evals, and NeurIPS 2026 submission.',
    filters: ['research', 'computer-vision', 'llms'],
    featuredLabel: 'Flagship Research',
    challenge: 'Model consistent multi-agent first-person video over long horizons in a dynamic environment.',
    focus: 'Data collection, world-model training setup, and evaluation-system design.',
    outcome: 'Publication-grade system with open artifacts, evaluation methodology, and strong benchmark results.',
  },
  'mri-brain-tumor': {
    role: 'End-to-end model design, evaluation, and automation',
    proof: 'Shared-encoder multimodal MRI system with 91.3% accuracy, 97.1% sensitivity, and a fully productized training-to-demo pipeline.',
    filters: ['research', 'computer-vision'],
    challenge: 'Unify classification and segmentation without paying the cost of separate models.',
    focus: 'Model architecture, training pipeline, and applied evaluation discipline.',
    outcome: 'A faster multimodal system with strong clinical metrics and automated reproducibility.',
  },
  'cloud-nlp': {
    role: 'Production ML service engineering',
    proof: 'Multi-model GCP service with zero-downtime switching, 96.57% accuracy, and 326+ passing tests.',
    filters: ['production-systems', 'llms', 'data-infrastructure'],
    challenge: 'Serve text classification reliably while preserving model-switching flexibility and test confidence.',
    focus: 'Service design, deployment behavior, and operational safety for ML inference.',
    outcome: 'A production-ready NLP service with strong accuracy, uptime posture, and test depth.',
  },
  'cvs-rag-assistant': {
    role: 'Internal AI platform builder',
    proof: 'Slack-integrated RAG assistant on enterprise GCP that reduced manual ticket resolution time by 20%.',
    filters: ['production-systems', 'llms', 'data-infrastructure', 'accessibility'],
    challenge: 'Make internal support knowledge self-serve without losing governance or deployment rigor.',
    focus: 'RAG architecture, platform integration, and enterprise deployment.',
    outcome: 'A support assistant that reduced manual ops load and improved troubleshooting speed.',
  },
  'cvs-ai-ci': {
    role: 'Applied ML systems + accessibility automation',
    proof: 'Hackathon-winning alt-text compliance system later productionized for enterprise rollout, improving conformance by 35%.',
    filters: ['production-systems', 'llms', 'accessibility', 'leadership'],
    challenge: 'Convert a promising proof-of-concept into a workflow teams can actually trust and adopt.',
    focus: 'Vision-language automation, CI feedback loops, and enterprise rollout.',
    outcome: 'A productionized accessibility quality system with measurable conformance gains.',
  },
  'testaro': {
    role: 'Quality platform and reporting infrastructure',
    proof: 'Unified multi-tool accessibility evaluation pipeline presented at ACM SIGACCESS ASSETS 2023.',
    filters: ['production-systems', 'accessibility', 'data-infrastructure'],
    challenge: 'Consolidate fragmented accessibility signals into one reportable, repeatable workflow.',
    focus: 'Aggregation, reporting, and shift-left quality enforcement.',
    outcome: 'A shared accessibility pipeline credible enough for conference presentation and org-wide use.',
  },
  'pico-llm': {
    role: 'Experimentation and evaluation pipeline engineering',
    proof: 'Modular LLM research pipeline spanning 22+ experiment configs with rigorous cross-run analysis and Pareto comparisons.',
    filters: ['research', 'llms'],
    challenge: 'Compare multiple language-model architectures without ad hoc experimentation or weak analysis.',
    focus: 'Experiment reproducibility, metrics analysis, and model-comparison rigor.',
    outcome: 'A reusable research pipeline with strong evaluation visibility and reproducible results.',
  },
  'nasa-atlas-overlay': {
    role: 'Prototype builder across CV and product framing',
    proof: 'Award-winning terrain and construction-planning prototype using NASA imagery and computer vision analysis.',
    filters: ['research', 'computer-vision'],
    challenge: 'Use remote sensing and CV to make construction planning more actionable.',
    focus: 'Prototype design, terrain analysis, and end-user framing.',
    outcome: 'An award-winning applied CV prototype with clear decision-support value.',
  },
  'nerf-sentry': {
    role: 'Embedded vision systems developer',
    proof: 'Autonomous Raspberry Pi sentry system with real-time tracking, motion prediction, and low-latency multithreaded control.',
    filters: ['computer-vision', 'production-systems'],
    challenge: 'Keep sensing, prediction, and physical actuation responsive on constrained hardware.',
    focus: 'Embedded concurrency, prediction logic, and low-latency control.',
    outcome: 'A complete autonomous system that demonstrates practical CV on low-cost hardware.',
  },
};

export const projectFilterOptions = [
  { id: 'all', label: 'All Work' },
  { id: 'production-systems', label: 'Production Systems' },
  { id: 'llms', label: 'LLMs' },
  { id: 'computer-vision', label: 'Computer Vision' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'data-infrastructure', label: 'Data Infrastructure' },
  { id: 'research', label: 'Research' },
  { id: 'leadership', label: 'Leadership / Ownership' },
];

export const projectViews = [
  {
    label: 'Best for recruiters',
    description: 'Production systems, ownership, and measurable outcomes',
    filters: ['production-systems', 'leadership', 'accessibility'],
  },
  {
    label: 'Best for engineers',
    description: 'Architecture-heavy work across AI systems and infra',
    filters: ['production-systems', 'llms', 'data-infrastructure'],
  },
  {
    label: 'Best for research',
    description: 'World models, evaluation pipelines, and experimental rigor',
    filters: ['research', 'computer-vision', 'llms'],
  },
];
