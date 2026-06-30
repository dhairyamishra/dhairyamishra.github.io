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
    role: 'Solo-built graph-based research agent',
    proof: 'Live TypeScript SaaS research agent with graph-based exploration, tool calling, live-source RAG, async orchestration, typed contracts, and graceful failure recovery.',
    filters: ['full-stack', 'agentic-systems', 'production-systems', 'backend-platform'],
    featuredLabel: 'Flagship Product',
    challenge: 'Turn linear LLM chat into a non-linear research workflow that can branch, synthesize, and recover from long-running AI task failures.',
    focus: 'Graph UX, tool-calling orchestration, live-source retrieval, typed APIs, and production deployment.',
    outcome: 'A live public SaaS product that combines research-agent behavior with a visual graph workflow.',
  },
  'solaris': {
    role: 'Research engineering on data and evaluation systems',
    proof: 'Solaris is a multiplayer video world model with 12.64M synchronized frames, multi-agent evaluation, and an arXiv paper listing Dhairya as an author.',
    filters: ['ml-engineering', 'research', 'computer-vision'],
    featuredLabel: 'Flagship Research',
    challenge: 'Model consistent multi-agent first-person video over long horizons in a dynamic environment.',
    focus: 'Data collection, world-model training setup, and evaluation-system design.',
    outcome: 'Publication-grade system with open artifacts, evaluation methodology, and a project website linked from arXiv.',
  },
  'mri-brain-tumor': {
    role: 'End-to-end model design, evaluation, and automation',
    proof: 'Shared-encoder multimodal MRI system with 91.3% accuracy, 97.1% sensitivity, and a productized training-to-demo pipeline.',
    filters: ['ml-engineering', 'computer-vision', 'production-systems'],
    challenge: 'Unify classification and segmentation without paying the cost of separate models.',
    focus: 'Model architecture, training pipeline, and applied evaluation discipline.',
    outcome: 'A faster multimodal system with strong clinical metrics and automated reproducibility.',
  },
  'cloud-nlp': {
    role: 'Production ML service engineering',
    proof: 'Multi-model GCP service with zero-downtime switching, 96.57% DistilBERT accuracy, and 326+ passing tests.',
    filters: ['ml-engineering', 'backend-platform', 'production-systems'],
    challenge: 'Serve text classification reliably while preserving model-switching flexibility and test confidence.',
    focus: 'Service design, deployment behavior, and operational safety for ML inference.',
    outcome: 'A production-ready NLP service with strong accuracy, uptime posture, and test depth.',
  },
  'cvs-rag-assistant': {
    role: 'Internal AI platform builder',
    proof: 'Self-service RAG assistant over ticket history and internal docs that deflected 16% of tickets and cut resolution time by 20%.',
    filters: ['agentic-systems', 'backend-platform', 'production-systems'],
    challenge: 'Make internal support knowledge self-serve without losing governance or deployment rigor.',
    focus: 'RAG architecture, platform integration, and enterprise deployment.',
    outcome: 'A support assistant that reduced manual support load and improved troubleshooting speed.',
  },
  'cvs-ai-ci': {
    role: 'Applied ML workflow automation',
    proof: 'Closed-loop image-caption pipeline using a Hugging Face VLM and LLM judge, raising catalog coverage by 18%.',
    filters: ['ml-engineering', 'production-systems', 'backend-platform'],
    challenge: 'Improve image metadata coverage without blindly replacing existing captions.',
    focus: 'Vision-language generation, LLM-as-judge scoring, and controlled production update workflows.',
    outcome: 'A production ML workflow with measured catalog coverage lift.',
  },
  'testaro': {
    role: 'Quality platform and reporting infrastructure',
    proof: 'Node.js and Playwright-based ensemble quality tooling connected to ASSETS 2023, covering about 650 rules across 8 tools.',
    filters: ['backend-platform', 'quality-systems', 'data-infrastructure'],
    challenge: 'Consolidate fragmented tool outputs into one reportable, repeatable workflow.',
    focus: 'Aggregation, reporting, and shift-left quality enforcement.',
    outcome: 'A shared testing/reporting pattern credible enough for ACM ASSETS publication and org use.',
  },
  'pico-llm': {
    role: 'Experimentation and evaluation pipeline engineering',
    proof: 'Modular LLM research pipeline spanning K-Gram MLP, LSTM, and KV-cache Transformer architectures with cross-run analysis.',
    filters: ['ml-engineering', 'research'],
    challenge: 'Compare multiple language-model architectures without ad hoc experimentation or weak analysis.',
    focus: 'Experiment reproducibility, metrics analysis, and model-comparison rigor.',
    outcome: 'A reusable research pipeline with strong evaluation visibility and reproducible results.',
  },
  'nasa-atlas-overlay': {
    role: 'Prototype builder across CV and product framing',
    proof: 'Award-winning terrain and construction-planning prototype using NASA imagery and computer vision analysis.',
    filters: ['ml-engineering', 'computer-vision'],
    challenge: 'Use remote sensing and CV to make construction planning more actionable.',
    focus: 'Prototype design, terrain analysis, and end-user framing.',
    outcome: 'An award-winning applied CV prototype with clear decision-support value.',
  },
  'nerf-sentry': {
    role: 'Embedded vision systems developer',
    proof: 'Autonomous NERF turret system with real-time tracking, prediction, face and gesture workflows, and remote dashboard control.',
    filters: ['computer-vision', 'backend-platform', 'production-systems'],
    challenge: 'Keep sensing, prediction, and physical actuation responsive on constrained hardware.',
    focus: 'Embedded concurrency, prediction logic, and low-latency control.',
    outcome: 'A complete autonomous system that demonstrates practical CV and control under hardware constraints.',
  },
  'slovenia-lidar-floodmap': {
    role: 'Geospatial data pipeline and visualization builder',
    proof: 'Processed 81 national LiDAR tiles into deployable flood-susceptibility, NDVI, and ranked-risk map overlays for Ljubljana.',
    filters: ['backend-platform', 'data-infrastructure'],
    challenge: 'Turn raw multi-tile LiDAR data into web-deliverable risk analysis while keeping scores comparable across the full dataset.',
    focus: 'Offline data processing, dataset-wide calibration, raster export, and static delivery architecture.',
    outcome: 'A reproducible LiDAR-to-web pipeline that turns heavy geospatial source data into a usable interactive analysis product.',
  },
};

export const projectFilterOptions = [
  { id: 'all', label: 'All Work' },
  { id: 'full-stack', label: 'Full-Stack' },
  { id: 'ml-engineering', label: 'ML Engineering' },
  { id: 'agentic-systems', label: 'Agentic Systems' },
  { id: 'backend-platform', label: 'Backend / Platform' },
  { id: 'production-systems', label: 'Production Systems' },
  { id: 'computer-vision', label: 'Computer Vision' },
  { id: 'data-infrastructure', label: 'Data Infrastructure' },
  { id: 'research', label: 'Research' },
  { id: 'quality-systems', label: 'Quality Systems' },
];

export const projectViews = [
  {
    label: 'Full-stack engineer',
    description: 'Product ownership, frontend/backend delivery, and production systems',
    filters: ['full-stack', 'backend-platform', 'production-systems'],
  },
  {
    label: 'ML engineer',
    description: 'Training, inference, evaluation, and deployable model systems',
    filters: ['ml-engineering', 'computer-vision', 'research'],
  },
  {
    label: 'Agentic systems',
    description: 'RAG, tool calling, LLM-as-judge, and orchestration workflows',
    filters: ['agentic-systems', 'production-systems', 'backend-platform'],
  },
];
