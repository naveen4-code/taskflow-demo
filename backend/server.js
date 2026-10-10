import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = process.env.DATA_DIR || path.resolve('data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');
app.use(cors());
app.use(express.json());
const PUBLIC_DIR = path.resolve('public');
if (fs.existsSync(PUBLIC_DIR)) { app.use(express.static(PUBLIC_DIR)); app.get('*', (req, res, next) => req.path.startsWith('/api/') ? next() : res.sendFile(path.join(PUBLIC_DIR, 'index.html'))); }
fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([
    { id: 'demo-1', title: 'Finalize demo presentation', description: 'Prepare screenshots and explain the workflow.', category: 'Work', priority: 'High', status: 'inprogress', dueDate: new Date(Date.now() + 86400000).toISOString().slice(0,10), createdAt: new Date().toISOString() },
    { id: 'demo-2', title: 'Review UI responsiveness', description: 'Check dashboard on a smaller screen.', category: 'Development', priority: 'Medium', status: 'todo', dueDate: new Date(Date.now() + 2*86400000).toISOString().slice(0,10), createdAt: new Date().toISOString() },
    { id: 'demo-3', title: 'Set up repository', description: 'Commit the initial application files.', category: 'DevOps', priority: 'Low', status: 'done', dueDate: new Date().toISOString().slice(0,10), createdAt: new Date().toISOString() }
  ], null, 2));
}
const readTasks = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeTasks = (tasks) => fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'taskflow-api' }));
app.get('/api/tasks', (_req, res) => res.json(readTasks()));
app.post('/api/tasks', (req, res) => {
  const { title, description = '', category = 'Personal', priority = 'Medium', status = 'todo', dueDate = '' } = req.body || {};
  if (!title || !String(title).trim()) return res.status(400).json({ error: 'Task title is required.' });
  const tasks = readTasks();
  const task = { id: crypto.randomUUID(), title: String(title).trim(), description: String(description), category: String(category), priority: ['Low','Medium','High'].includes(priority) ? priority : 'Medium', status: ['todo','inprogress','done'].includes(status) ? status : 'todo', dueDate: String(dueDate), createdAt: new Date().toISOString() };
  tasks.unshift(task); writeTasks(tasks); res.status(201).json(task);
});
app.put('/api/tasks/:id', (req, res) => {
  const tasks = readTasks(); const index = tasks.findIndex(t => t.id === req.params.id);
  if (index < 0) return res.status(404).json({ error: 'Task not found.' });
  const allowed = ['title','description','category','priority','status','dueDate'];
  for (const key of allowed) if (req.body[key] !== undefined) tasks[index][key] = req.body[key];
  if (!String(tasks[index].title || '').trim()) return res.status(400).json({ error: 'Task title is required.' });
  if (!['Low','Medium','High'].includes(tasks[index].priority)) return res.status(400).json({ error: 'Invalid priority.' });
  if (!['todo','inprogress','done'].includes(tasks[index].status)) return res.status(400).json({ error: 'Invalid status.' });
  writeTasks(tasks); res.json(tasks[index]);
});
app.delete('/api/tasks/:id', (req, res) => {
  const tasks = readTasks(); const filtered = tasks.filter(t => t.id !== req.params.id);
  if (filtered.length === tasks.length) return res.status(404).json({ error: 'Task not found.' });
  writeTasks(filtered); res.status(204).end();
});
app.listen(PORT, '0.0.0.0', () => console.log(`TaskFlow API listening on ${PORT}`));
