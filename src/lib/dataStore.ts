import fs from 'fs';
import path from 'path';
import { Material, Car, Lead, ActivityLog } from './types';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export interface DatabaseSchema {
  materials: Material[];
  cars: Car[];
  leads: Lead[];
  activityLogs: ActivityLog[];
}

const INITIAL_MATERIALS: Material[] = [
  { id: '1', sku: 'BGL-MAT-001', name: 'Premium High-Gloss RC Photo Paper (A4 / 260gsm)', category: 'Photo Paper', brand: 'Epson Compatible', color: 'White', overview: 'High quality premium photo paper for brilliant, long-lasting prints.', features: ['High Gloss', 'Water Resistant', 'Fast Drying'], images: [], price: 350.0, unit: 'per pack (100 sheets)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1588696879815-585a21b3e7bc?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '2', sku: 'BGL-MAT-002', name: 'Thermal Lamination Roll — Gloss (320mm x 50m)', category: 'Lamination', brand: 'Generic', color: 'Transparent', overview: 'Durable thermal lamination rolls for protecting documents and prints.', features: ['Gloss Finish', 'Matte Finish Available', 'Anti-Scratch'], images: [], price: 450.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '3', sku: 'BGL-MAT-003', name: 'Eco-Solvent Printing Ink — CMYK Set (1 Liter)', category: 'Inks', brand: 'EcoColor', color: 'CMYK', overview: 'Vibrant eco-solvent inks designed for high-resolution wide format printers.', features: ['Eco-Friendly', 'UV Resistant', 'Non-Clogging'], images: [], price: 320.0, unit: 'per bottle (1000ml)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '4', sku: 'BGL-MAT-004', name: 'PVC Frontlit Flex Banner — 440gsm (High Tensile)', category: 'Flex', brand: 'FlexMaster', color: 'White', overview: 'Heavy duty frontlit flex banner material for outdoor billboards and signage.', features: ['Tear Resistant', 'Weatherproof', 'Smooth Surface'], images: [], price: 1200.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1621360841013-c76831f1dbce?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '5', sku: 'BGL-MAT-005', name: 'Self-Adhesive Vinyl Sticker Roll — White Gloss', category: 'Vinyl', brand: 'VinylPro', color: 'White', overview: 'Premium self-adhesive vinyl for custom vehicle wraps and window graphics.', features: ['Strong Adhesion', 'Easy Peel', 'Bubble-Free Application'], images: [], price: 850.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '6', sku: 'BGL-MAT-006', name: 'One-Way Vision Perforated Window Film', category: 'One-Way-Vision', brand: 'ClearView', color: 'White/Black', overview: 'Perforated window film that allows graphics on one side and clear visibility on the other.', features: ['High Definition Print', 'Removable Glue', 'Privacy Enhancing'], images: [], price: 950.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
];

const INITIAL_CARS: Car[] = [
  { id: '1', sku: 'BGL-CAR-2001', model_name: 'Toyota Yaris Sedan (Automatic)', vehicle_type: 'Sedan', brand: 'Toyota', color: 'White', fuel_type: 'Petrol', seating_capacity: 5, overview: 'Clean used Toyota Yaris', licence_number: null, registration_type: null, accessories: [], images: [], year: 2018, price: 85000.0, status: 'available', image_url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '2', sku: 'BGL-CAR-2002', model_name: 'Hyundai Accent GLS (Clean Foreign Used)', vehicle_type: 'Sedan', brand: 'Hyundai', color: 'Silver', fuel_type: 'Petrol', seating_capacity: 5, overview: 'Clean used Hyundai Accent', licence_number: null, registration_type: null, accessories: [], images: [], year: 2019, price: 92000.0, status: 'available', image_url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '3', sku: 'BGL-CAR-2003', model_name: 'Toyota Corolla LE (Verified Documentation)', vehicle_type: 'Sedan', brand: 'Toyota', color: 'Black', fuel_type: 'Petrol', seating_capacity: 5, overview: 'Clean used Toyota Corolla', licence_number: null, registration_type: null, accessories: [], images: [], year: 2016, price: 78000.0, status: 'sold', image_url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
];

function readDB(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial: DatabaseSchema = {
        materials: INITIAL_MATERIALS,
        cars: INITIAL_CARS,
        leads: [],
        activityLogs: [],
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local db:', err);
    return {
      materials: INITIAL_MATERIALS,
      cars: INITIAL_CARS,
      leads: [],
      activityLogs: [],
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

// === MATERIALS ===
export function getLocalMaterials(): Material[] {
  const db = readDB();
  return db.materials;
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
  return db.cars;
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
  if (division && division !== 'all') {
    return db.leads.filter((l) => l.division === division);
  }
  return db.leads;
}

export function addLocalLead(item: Omit<Lead, 'id' | 'created_at'>): Lead {
  const db = readDB();
  const newItem: Lead = {
    ...item,
    id: 'lead_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    created_at: new Date().toISOString(),
  };
  db.leads.unshift(newItem);
  writeDB(db);
  return newItem;
}

// === ACTIVITY LOGS ===
export function getLocalActivityLogs(limit: number = 20): ActivityLog[] {
  const db = readDB();
  return db.activityLogs.slice(0, limit);
}

export function addLocalActivityLog(log: Omit<ActivityLog, 'id' | 'created_at'>): ActivityLog {
  const db = readDB();
  const newLog: ActivityLog = {
    ...log,
    id: 'log_' + Date.now().toString(36),
    created_at: new Date().toISOString(),
  };
  db.activityLogs.unshift(newLog);
  writeDB(db);
  return newLog;
}
