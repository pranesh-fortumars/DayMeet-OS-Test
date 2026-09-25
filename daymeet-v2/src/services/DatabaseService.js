import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

const sqlite = new SQLiteConnection(CapacitorSQLite);
let db = null;

export const initDB = async () => {
  try {
    if (Capacitor.getPlatform() === 'web') {
      // Setup web polyfill for local browser testing
      const jeepEl = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepEl);
      await customElements.whenDefined('jeep-sqlite');
      await sqlite.initWebStore();
    }

    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection("daymeet_db", false)).result;

    if (ret.result && isConn) {
      db = await sqlite.retrieveConnection("daymeet_db", false);
    } else {
      db = await sqlite.createConnection("daymeet_db", false, "no-encryption", 1, false);
    }

    await db.open();

    // Create Tasks Schema
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT,
        tag TEXT,
        tagType TEXT,
        status TEXT,
        priority TEXT,
        time TEXT,
        profile TEXT,
        createdAt INTEGER
      );
    `;
    await db.execute(query);
    console.log("Offline SQLite database initialized successfully!");
  } catch (err) {
    console.error("SQLite Initialization Error:", err);
  }
};

export const saveTaskLocally = async (task) => {
  if (!db) return;
  try {
    const q = `INSERT INTO tasks (id, title, subtitle, tag, tagType, status, priority, time, profile, createdAt) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    const v = [
      task.id, 
      task.title, 
      task.subtitle || '', 
      task.tag || '', 
      task.tagType || '', 
      task.status || 'pending', 
      task.priority || '', 
      task.time || '', 
      task.profile || '', 
      task.createdAt
    ];
    await db.run(q, v);
    if (Capacitor.getPlatform() === 'web') await sqlite.saveToStore("daymeet_db");
  } catch (e) {
    console.log('Error saving to SQLite', e);
  }
};

export const updateTaskStatusLocally = async (id, status) => {
  if (!db) return;
  try {
    await db.run(`UPDATE tasks SET status = ? WHERE id = ?`, [status, id]);
    if (Capacitor.getPlatform() === 'web') await sqlite.saveToStore("daymeet_db");
  } catch (e) {
    console.log('Error updating SQLite', e);
  }
};

export const getLocalTasks = async () => {
  if (!db) return [];
  try {
    const res = await db.query(`SELECT * FROM tasks ORDER BY createdAt ASC`);
    return res.values || [];
  } catch (e) {
    console.log('Error fetching from SQLite', e);
    return [];
  }
};
