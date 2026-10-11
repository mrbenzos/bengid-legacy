import fs from 'fs';
import path from 'path';
import { Material, Car, Lead, ActivityLog } from './types';
import {
  INITIAL_MATERIALS,
  INITIAL_CARS,
  INITIAL_LEADS,
  INITIAL_ACTIVITY_LOGS,
} from './initialData';

export { INITIAL_MATERIALS, INITIAL_CARS, INITIAL_LEADS, INITIAL_ACTIVITY_LOGS } from './initialData';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export interface DatabaseSchema {
  materials: Material[];
  cars: Car[];
  leads: Lead[];
  activityLogs: ActivityLog[];
}

function readDB(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial: DatabaseSchema = {
        materials: INITIAL_MATERIALS,
        cars: INITIAL_CARS,
        leads: INITIAL_LEADS,
        activityLogs: INITIAL_ACTIVITY_LOGS,
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    
    // Ensure all Chinese models are populated if missing
    if (parsed.cars && parsed.cars.length < INITIAL_CARS.length) {
      parsed.cars = INITIAL_CARS;
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    if (!parsed.leads) {
      parsed.leads = INITIAL_LEADS;
    }
    if (!parsed.activityLogs) {
      parsed.activityLogs = INITIAL_ACTIVITY_LOGS;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading local db:', err);
    return {
      materials: INITIAL_MATERIALS,
      cars: INITIAL_CARS,
      leads: INITIAL_LEADS,
      activityLogs: INITIAL_ACTIVITY_LOGS,
    };
  }
}

function writeDB(data: DatabaseSchema) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local db:', err);
  }
}

// === PRINTING MATERIALS ===
export function getLocalMaterials(): Material[] {
  const db = readDB();
  return db.materials || [];
}

export function addLocalMaterial(item: Omit<Material, 'id' | 'created_at'>): Material {
  const db = readDB();
  const newItem: Material = {
    ...item,
    brand: item.brand || null,
    color: item.color || null,
    overview: item.overview || null,
    features: item.features || [],
    images: item.images || [],
    id: 'mat_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    created_at: new Date().toISOString(),
  };
  db.materials.unshift(newItem);
  writeDB(db);
  return newItem;
}

export function updateLocalMaterial(id: string, updates: Partial<Material>): Material | null {
  const db = readDB();
  const index = db.materials.findIndex((m) => m.id === id);
  if (index === -1) return null;
  db.materials[index] = { ...db.materials[index], ...updates };
  writeDB(db);
  return db.materials[index];
}

export function deleteLocalMaterial(id: string): boolean {
  const db = readDB();
  const index = db.materials.findIndex((m) => m.id === id);
  if (index === -1) return false;
  db.materials.splice(index, 1);
  writeDB(db);
  return true;
}

// === CARS ===
export function getLocalCars(): Car[] {
  const db = readDB();
  return db.cars || [];
}

export function addLocalCar(item: Omit<Car, 'id' | 'created_at'>): Car {
  const db = readDB();
  const newItem: Car = {
    ...item,
    id: 'car_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    created_at: new Date().toISOString(),
  };
  db.cars.unshift(newItem);
  writeDB(db);
  return newItem;
}

export function updateLocalCar(id: string, updates: Partial<Car>): Car | null {
  const db = readDB();
  const index = db.cars.findIndex((c) => c.id === id);
  if (index === -1) return null;
  db.cars[index] = { ...db.cars[index], ...updates };
  writeDB(db);
  return db.cars[index];
}

export function deleteLocalCar(id: string): boolean {
  const db = readDB();
  const index = db.cars.findIndex((c) => c.id === id);
  if (index === -1) return false;
  db.cars.splice(index, 1);
  writeDB(db);
  return true;
}

// === LEADS ===
export function getLocalLeads(division?: string | null): Lead[] {
  const db = readDB();
  const list = db.leads || [];
  if (!division || division === 'all') return list;
  return list.filter((l) => l.division.toLowerCase() === division.toLowerCase());
}

export function addLocalLead(item: Omit<Lead, 'id' | 'created_at'>): Lead {
  const db = readDB();
  const newLead: Lead = {
    ...item,
    id: 'lead_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    created_at: new Date().toISOString(),
  };
  if (!db.leads) db.leads = [];
  db.leads.unshift(newLead);
  writeDB(db);
  return newLead;
}

// === ACTIVITY LOGS ===
export function getLocalActivityLogs(limit?: number): ActivityLog[] {
  const db = readDB();
  const list = db.activityLogs || [];
  if (limit && limit > 0) return list.slice(0, limit);
  return list;
}

export function addLocalActivityLog(log: Omit<ActivityLog, 'id' | 'created_at'>): ActivityLog {
  const db = readDB();
  const newLog: ActivityLog = {
    ...log,
    id: 'log_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    created_at: new Date().toISOString(),
  };
  if (!db.activityLogs) db.activityLogs = [];
  db.activityLogs.unshift(newLog);
  writeDB(db);
  return newLog;
}
