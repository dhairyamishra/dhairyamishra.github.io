export interface ProjectSignal {
  role: string;
  proof: string;
  filters: string[];
  featuredLabel?: string;
}

export const projectSignals: Record<string, ProjectSignal> = {
  'teserax': {
    role: 'Built 0→1 product, architecture, and deployment',
    proof: 'Live deployed agentic workflow product with 226 Playwright E2E tests, MCP integrations, and cloud + local model routing.',
    filters: ['production-systems', 'llms', 'data-infrastructure', 'leadership'],
    featuredLabel: 'Flagship Product',
  },
  'solaris': {
    role: 'Research engineering on data + evaluation systems',
    proof: 'First multiplayer world model with 12.64M synchronized frames, multi-agent evals, and NeurIPS 2026 submission.',
    filters: ['research', 'computer-vision', 'llms'],
    featuredLabel: 'Flagship Research',
  },
  'mri-brain-tumor': {
    role: 'End-to-end model design, evaluation, and automation',
    proof: 'Shared-encoder multimodal MRI system with 91.3% accuracy, 97.1% sensitivity, and a fully productized training-to-demo pipeline.',
    filters: ['research', 'computer-vision'],
  },
  'cloud-nlp': {
    role: 'Production ML service engineering',
    proof: 'Multi-model GCP service with zero-downtime switching, 96.57% accuracy, and 326+ passing tests.',
    filters: ['production-systems', 'llms', 'data-infrastructure'],
  },
  'cvs-rag-assistant': {
    role: 'Internal AI platform builder',
    proof: 'Slack-integrated RAG assistant on enterprise GCP that reduced manual ticket resolution time by 20%.',
    filters: ['production-systems', 'llms', 'data-infrastructure', 'accessibility'],
  },
  'cvs-ai-ci': {
    role: 'Applied ML systems + accessibility automation',
    proof: 'Hackathon-winning alt-text compliance system later productionized for enterprise rollout, improving conformance by 35%.',
    filters: ['production-systems', 'llms', 'accessibility', 'leadership'],
  },
  'testaro': {
    role: 'Quality platform and reporting infrastructure',
    proof: 'Unified multi-tool accessibility evaluation pipeline presented at ACM SIGACCESS ASSETS 2023.',
    filters: ['production-systems', 'accessibility', 'data-infrastructure'],
  },
  'pico-llm': {
    role: 'Experimentation and evaluation pipeline engineering',
    proof: 'Modular LLM research pipeline spanning 22+ experiment configs with rigorous cross-run analysis and Pareto comparisons.',
    filters: ['research', 'llms'],
  },
  'nasa-atlas-overlay': {
    role: 'Prototype builder across CV and product framing',
    proof: 'Award-winning terrain and construction-planning prototype using NASA imagery and computer vision analysis.',
    filters: ['research', 'computer-vision'],
  },
  'nerf-sentry': {
    role: 'Embedded vision systems developer',
    proof: 'Autonomous Raspberry Pi sentry system with real-time tracking, motion prediction, and low-latency multithreaded control.',
    filters: ['computer-vision', 'production-systems'],
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
