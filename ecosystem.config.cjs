module.exports = {
  apps: [
    {
      name: "portfolio-web",
      cwd: "./apps/web",
      script: "npm",
      args: "run dev -- --host 0.0.0.0 --port 5173",
      env: {
        NODE_ENV: "development"
      },
      watch: false,
      autorestart: true
    },
    {
      name: "portfolio-api",
      cwd: "./apps/api",
      script: "npm",
      args: "run dev",
      env: {
        PORT: "8080",
        NODE_ENV: "development"
      },
      watch: false,
      autorestart: true
    },
    {
      name: "portfolio-demos",
      cwd: "./apps/demos",
      script: "streamlit",
      args: "run app.py --server.address 0.0.0.0 --server.port 7860",
      env: {
        PORT: "7860"
      },
      watch: false,
      autorestart: true
    }
  ]
};
