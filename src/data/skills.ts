export interface SkillGroup {
  category: string;
  items: string[];
  color: 'rose' | 'gold' | 'violet';
}

export const skills: SkillGroup[] = [
  { category: 'Languages & Frameworks', items: ['Python', 'TypeScript', 'SQL', 'React', 'FastAPI', 'Pydantic', 'Node.js'], color: 'rose' },
  { category: 'ML / AI', items: ['PyTorch', 'JAX', 'Hugging Face', 'LangChain', 'OpenCV', 'Pandas', 'NLP', 'RAG', 'VLMs'], color: 'gold' },
  { category: 'Cloud & Infrastructure', items: ['GCP', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'Apache Spark', 'Kafka', 'MongoDB'], color: 'violet' },
  { category: 'Specializations', items: ['Agent Orchestration', 'MCP', 'Computer Vision', 'Diffusion (DiT)', 'Fine-Tuning', 'Distributed Systems', 'CI/CD'], color: 'rose' },
  { category: 'Testing & Observability', items: ['OpenTelemetry', 'Grafana', 'Playwright', 'pytest', 'GitHub Actions', 'ArgoCD'], color: 'violet' },
];
