# TaskFlow Manager — Demo

A demo task manager built with React + Vite, Express, JSON-file persistence, Docker, and Jenkins.

## Requirements
- Node.js 20+ and npm for local development, OR Docker Desktop for container run.
- Git for source control; Jenkins is optional for the CI/CD demo.

## Run locally on Windows
Open CMD in this project folder.

Terminal 1:
```cmd
cd backend
npm install
npm run dev
```

Terminal 2:
```cmd
cd frontend
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173). The frontend proxies `/api` to `http://localhost:4000`.

## Run with Docker
Start Docker Desktop and wait until it says the engine is running. In CMD, from the folder containing `compose.yaml`:
```cmd
docker compose up --build -d
```
Open http://localhost:8080.

Check API health:
```cmd
curl http://localhost:8080/api/health
```
View logs:
```cmd
docker logs taskflow
```
Stop the demo:
```cmd
docker compose down
```
Task data is kept in the `taskflow-data` Docker volume. To remove the data too, use `docker compose down -v` (this deletes saved demo tasks).

## GitHub
```cmd
git init
git add .
git commit -m "Initial TaskFlow demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/taskflow-manager.git
git push -u origin main
```
Create the empty GitHub repository first. If `origin` already exists, use `git remote set-url origin https://github.com/YOUR_USERNAME/taskflow-manager.git`.

## Jenkins freestyle option
1. Ensure Jenkins can run `docker` commands and Docker Desktop is running.
2. Create a **Freestyle project** named `taskflow-manager`.
3. Under **Source Code Management → Git**, paste your repository URL and select `main`.
4. Under **Build Steps → Execute Windows batch command**, add:
```cmd
docker build -t taskflow-manager:demo .
docker image inspect taskflow-manager:demo
```
5. Save, then choose **Build Now**. Open the build's **Console Output**.

The included Jenkinsfile is an optional Pipeline version. The demo build verifies the Docker image; it does not automatically publish to a registry or deploy to a cloud host.

## Demo checklist
- Create a task with a due date and high priority.
- Edit a task; change its status from To do to In progress to Completed.
- Search by title/category and test filters.
- Delete a task.
- Refresh the browser and verify tasks persist.
- Show Docker container and logs, then run Jenkins build.

## Limitations
This is a demonstration app, not production-ready. It has no user accounts, team permissions, notifications, or database server. JSON-file persistence is intended for a small demo and a single application instance. Add authentication, stronger validation, a database, automated tests, and deployment secrets before production use.
