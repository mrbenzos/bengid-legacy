export interface Material {
  id: string;
  sku: string | null;
  name: string;
  category: string;
  brand: string | null;
  color: string | null;
  overview: string | null;
  features: string[];
  images: { label: string; url: string }[];
  price: number;
  unit: string;
  image_url: string | null;
  stock_status: 'in_stock' | 'out_of_stock';
  created_at: string;
}

export interface Car {
  id: string;
  sku: string | null;
  model_name: string;
  vehicle_type: string;
  brand: string;
  year: number | null;
  price: number | null;
  color: string | null;
  fuel_type: string | null;
  seating_capacity: number | null;
  overview: string | null;
  licence_number: string | null;
  registration_type: string | null;
  accessories: string[];
  images: { label: string; url: string }[];
  image_url: string | null;
  status: 'available' | 'sold';
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  division: 'materials' | 'cars' | 'importations';
  created_at: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  item_type: string | null;
  item_name: string | null;
  user: string;
  created_at: string;
}

export interface OtpCode {
  id: string;
  email: string;
  code: string;
  expires_at: string;
  used: boolean;
  created_at: string;
}
