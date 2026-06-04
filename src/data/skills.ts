export interface SkillGroup {
  category: string;
  items: string[];
  color: 'rose' | 'gold' | 'violet';
}

export const skills: SkillGroup[] = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Scala', 'SQL', 'Bash', 'Node.js', 'HTML/CSS'], color: 'rose' },
  { category: 'ML / AI', items: ['PyTorch', 'JAX', 'Hugging Face', 'scikit-learn', 'RAG', 'RLHF', 'LoRA', 'Fine-Tuning', 'Diffusion (DiT)', 'LangChain', 'OpenCV', 'ChromaDB', 'FAISS', 'wandb'], color: 'gold' },
  { category: 'Cloud & DevOps', items: ['AWS', 'GCP', 'Azure', 'MLOps', 'GKE', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'ArgoCD', 'PM2'], color: 'violet' },
  { category: 'Frameworks & App Dev', items: ['FastAPI', 'React', 'Astro', 'Vite', 'TailwindCSS', 'Streamlit', 'Uvicorn', 'Zustand', 'React Flow'], color: 'rose' },
  { category: 'Data & Storage', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Kafka', 'Cassandra', 'Pandas', 'NumPy', 'Spark', 'Parquet', 'HDFS', 'REST APIs'], color: 'gold' },
  { category: 'Testing & Observability', items: ['OpenTelemetry', 'Grafana', 'Prometheus', 'Elastic Stack', 'Playwright', 'pytest', 'Pydantic'], color: 'violet' },
];
