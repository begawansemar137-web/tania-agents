import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { agents as defaultAgents, type Agent, type ToolAccess } from "./data";

export type DbUser = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: "admin" | "member";
  created_at: string;
  updated_at: string;
};

export type DbTask = {
  id: string;
  user_id: string;
  agent_id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "waiting_approval" | "done" | "failed";
  result?: string;
  created_at: string;
  updated_at: string;
};

export type DbRun = {
  id: string;
  user_id: string;
  agent_id: string;
  task_id?: string;
  summary: string;
  model: string;
  duration_ms: number;
  tokens_used: number;
  cost_usd: number;
  status: "berhasil" | "menunggu persetujuan" | "gagal";
  spans_json: string;
  created_at: string;
};

interface UserRow {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

interface AgentRow {
  id: string;
  user_id: string;
  template_slug: string | null;
  name: string;
  role: string;
  emoji: string;
  model: string;
  instructions: string;
  skills_json: string;
  tools_json: string;
  status: string;
  runs_this_week: number;
  cost_this_week: number;
  created_at: string;
  updated_at: string;
}

interface RunRow {
  id: string;
  user_id: string;
  agent_id: string;
  task_id: string | null;
  summary: string;
  model: string;
  duration_ms: number;
  tokens_used: number;
  cost_usd: number;
  status: string;
  spans_json: string;
  created_at: string;
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "tania.db");

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(/* turbopackIgnore: true */ DB_DIR)) {
    fs.mkdirSync(/* turbopackIgnore: true */ DB_DIR, { recursive: true });
  }

  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      avatar_url TEXT,
      role TEXT NOT NULL DEFAULT 'member',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      template_slug TEXT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      emoji TEXT NOT NULL,
      model TEXT NOT NULL DEFAULT 'auto',
      instructions TEXT NOT NULL,
      skills_json TEXT NOT NULL DEFAULT '[]',
      tools_json TEXT NOT NULL DEFAULT '[]',
      status TEXT NOT NULL DEFAULT 'aktif',
      runs_this_week INTEGER NOT NULL DEFAULT 0,
      cost_this_week REAL NOT NULL DEFAULT 0.0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chat_threads (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      agent_id TEXT NOT NULL,
      title TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      thread_id TEXT NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      parts_json TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      agent_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'todo',
      result TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS runs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      agent_id TEXT NOT NULL,
      task_id TEXT,
      summary TEXT NOT NULL,
      model TEXT NOT NULL,
      duration_ms INTEGER NOT NULL DEFAULT 0,
      tokens_used INTEGER NOT NULL DEFAULT 0,
      cost_usd REAL NOT NULL DEFAULT 0.0,
      status TEXT NOT NULL DEFAULT 'berhasil',
      spans_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  dbInstance = db;
  return db;
}

// ----------------- USERS -----------------
export function getUserByEmail(email: string): DbUser | null {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM users WHERE lower(email) = lower(?) LIMIT 1");
  const row = stmt.get(email) as UserRow | undefined;
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    avatar_url: row.avatar_url || undefined,
    role: row.role as "admin" | "member",
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function getUserById(id: string): DbUser | null {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM users WHERE id = ? LIMIT 1");
  const row = stmt.get(id) as UserRow | undefined;
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    avatar_url: row.avatar_url || undefined,
    role: row.role as "admin" | "member",
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function upsertUser(user: { id?: string; email: string; name: string; avatar_url?: string }): DbUser {
  const db = getDb();
  const existing = getUserByEmail(user.email);
  const now = new Date().toISOString();

  if (existing) {
    const stmt = db.prepare(`
      UPDATE users SET name = ?, avatar_url = ?, updated_at = ? WHERE id = ?
    `);
    stmt.run(user.name || existing.name, user.avatar_url ?? existing.avatar_url ?? null, now, existing.id);
    return { ...existing, name: user.name || existing.name, avatar_url: user.avatar_url ?? existing.avatar_url, updated_at: now };
  }

  const id = user.id || `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const stmt = db.prepare(`
    INSERT INTO users (id, email, name, avatar_url, role, created_at, updated_at)
    VALUES (?, ?, ?, ?, 'member', ?, ?)
  `);
  stmt.run(id, user.email.toLowerCase(), user.name, user.avatar_url ?? null, now, now);

  const newUser: DbUser = {
    id,
    email: user.email.toLowerCase(),
    name: user.name,
    avatar_url: user.avatar_url,
    role: "member",
    created_at: now,
    updated_at: now,
  };

  // Seed default template agents for this new user so they can start immediately
  seedDefaultAgentsForUser(id);

  return newUser;
}

// ----------------- AGENTS -----------------
export function seedDefaultAgentsForUser(userId: string) {
  const db = getDb();
  const countStmt = db.prepare("SELECT COUNT(*) as count FROM agents WHERE user_id = ?");
  const res = countStmt.get(userId) as { count: number } | undefined;
  if (res && res.count > 0) return; // already seeded

  const now = new Date().toISOString();
  const insertStmt = db.prepare(`
    INSERT INTO agents (
      id, user_id, template_slug, name, role, emoji, model, instructions,
      skills_json, tools_json, status, runs_this_week, cost_this_week, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const a of defaultAgents) {
    insertStmt.run(
      `${a.id}-${userId}`,
      userId,
      a.id,
      a.name,
      a.role,
      a.emoji,
      a.model,
      a.instructions,
      JSON.stringify(a.skills),
      JSON.stringify(a.tools),
      a.status,
      a.runsThisWeek,
      a.costThisWeek,
      now,
      now
    );
  }
}

export function getUserAgents(userId: string): Agent[] {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM agents WHERE user_id = ? ORDER BY created_at ASC");
  const rows = stmt.all(userId) as unknown as AgentRow[];

  if (rows.length === 0) {
    seedDefaultAgentsForUser(userId);
    return getUserAgents(userId);
  }

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    emoji: r.emoji,
    model: r.model,
    owner: "Anda",
    channels: ["Web"],
    instructions: r.instructions,
    skills: JSON.parse(r.skills_json || "[]") as string[],
    tools: JSON.parse(r.tools_json || "[]") as ToolAccess[],
    versions: [{ version: 1, date: r.created_at.slice(0, 10), author: "Sistem", note: "Versi awal" }],
    runsThisWeek: r.runs_this_week,
    costThisWeek: r.cost_this_week,
    status: r.status as "aktif" | "draf",
    greeting: `Halo! Saya ${r.name}. ${r.role} Apa yang bisa saya bantu hari ini?`,
    starters: ["Apa yang bisa kamu bantu?", "Tunjukkan contoh hasil kerjamu"],
  }));
}

export function getAgentById(id: string, userId?: string): Agent | null {
  const db = getDb();
  let stmt;
  let row: AgentRow | undefined;

  if (userId) {
    stmt = db.prepare("SELECT * FROM agents WHERE (id = ? OR template_slug = ?) AND user_id = ? LIMIT 1");
    row = stmt.get(id, id, userId) as AgentRow | undefined;
  } else {
    stmt = db.prepare("SELECT * FROM agents WHERE id = ? OR template_slug = ? LIMIT 1");
    row = stmt.get(id, id) as AgentRow | undefined;
  }

  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    role: row.role,
    emoji: row.emoji,
    model: row.model,
    owner: "Anda",
    channels: ["Web"],
    instructions: row.instructions,
    skills: JSON.parse(row.skills_json || "[]") as string[],
    tools: JSON.parse(row.tools_json || "[]") as ToolAccess[],
    versions: [{ version: 1, date: row.created_at.slice(0, 10), author: "Anda", note: "Konfigurasi aktif" }],
    runsThisWeek: row.runs_this_week,
    costThisWeek: row.cost_this_week,
    status: row.status as "aktif" | "draf",
    greeting: `Halo! Saya ${row.name}. ${row.role} Apa yang bisa saya bantu?`,
    starters: ["Apa yang bisa kamu bantu?", "Mulai tugas baru"],
  };
}

export function saveAgentConfig(
  agentId: string,
  userId: string,
  config: { model?: string; instructions?: string; tools?: ToolAccess[] }
) {
  const db = getDb();
  const now = new Date().toISOString();
  const updates: string[] = ["updated_at = ?"];
  const params: unknown[] = [now];

  if (config.model !== undefined) {
    updates.push("model = ?");
    params.push(config.model);
  }
  if (config.instructions !== undefined) {
    updates.push("instructions = ?");
    params.push(config.instructions);
  }
  if (config.tools !== undefined) {
    updates.push("tools_json = ?");
    params.push(JSON.stringify(config.tools));
  }

  params.push(agentId, userId);
  const sql = `UPDATE agents SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`;
  db.prepare(sql).run(...params);
}

// ----------------- CHAT THREADS & MESSAGES -----------------
export function getOrCreateThread(userId: string, agentId: string): string {
  const db = getDb();
  const stmt = db.prepare("SELECT id FROM chat_threads WHERE user_id = ? AND agent_id = ? ORDER BY updated_at DESC LIMIT 1");
  const row = stmt.get(userId, agentId) as { id: string } | undefined;
  if (row) return row.id;

  const threadId = `th_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();
  db.prepare("INSERT INTO chat_threads (id, user_id, agent_id, title, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)")
    .run(threadId, userId, agentId, "Obrolan Baru", now, now);
  return threadId;
}

export function saveChatMessage(threadId: string, role: string, content: string, parts?: unknown[]) {
  const db = getDb();
  const msgId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();

  db.prepare("INSERT INTO chat_messages (id, thread_id, role, content, parts_json, created_at) VALUES (?, ?, ?, ?, ?, ?)")
    .run(msgId, threadId, role, content, parts ? JSON.stringify(parts) : null, now);

  db.prepare("UPDATE chat_threads SET updated_at = ? WHERE id = ?").run(now, threadId);
  return msgId;
}

export function getThreadMessages(threadId: string) {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM chat_messages WHERE thread_id = ? ORDER BY created_at ASC");
  return stmt.all(threadId) as { id: string; role: string; content: string; parts_json?: string; created_at: string }[];
}

// ----------------- RUNS / TRACES -----------------
export function recordRunTrace(run: {
  userId: string;
  agentId: string;
  taskId?: string;
  summary: string;
  model: string;
  durationMs: number;
  tokensUsed: number;
  costUsd: number;
  status: "berhasil" | "menunggu persetujuan" | "gagal";
  spans: unknown[];
}) {
  const db = getDb();
  const id = `run_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO runs (id, user_id, agent_id, task_id, summary, model, duration_ms, tokens_used, cost_usd, status, spans_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    run.userId,
    run.agentId,
    run.taskId || null,
    run.summary,
    run.model,
    run.durationMs,
    run.tokensUsed,
    run.costUsd,
    run.status,
    JSON.stringify(run.spans),
    now
  );

  // Update agent run count & cost
  db.prepare(`
    UPDATE agents 
    SET runs_this_week = runs_this_week + 1, cost_this_week = cost_this_week + ?
    WHERE (id = ? OR template_slug = ?) AND user_id = ?
  `).run(run.costUsd, run.agentId, run.agentId, run.userId);

  return id;
}

export function getUserRuns(userId: string, agentId?: string) {
  const db = getDb();
  let stmt;
  let rows: RunRow[];

  if (agentId && agentId !== "semua") {
    stmt = db.prepare("SELECT * FROM runs WHERE user_id = ? AND (agent_id = ? OR agent_id LIKE ?) ORDER BY created_at DESC LIMIT 50");
    rows = stmt.all(userId, agentId, `${agentId}-%`) as unknown as RunRow[];
  } else {
    stmt = db.prepare("SELECT * FROM runs WHERE user_id = ? ORDER BY created_at DESC LIMIT 50");
    rows = stmt.all(userId) as unknown as RunRow[];
  }

  return rows.map((r) => ({
    id: r.id,
    agentId: r.agent_id,
    summary: r.summary,
    model: r.model,
    durationMs: r.duration_ms,
    tokens: r.tokens_used,
    cost: r.cost_usd,
    status: r.status,
    spans: JSON.parse(r.spans_json || "[]") as unknown[],
    createdAt: r.created_at,
  }));
}
