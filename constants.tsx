
import { MaterialType, MaterialInfo } from './types';

export const MATERIALS: Record<MaterialType, MaterialInfo> = {
  [MaterialType.PLA]: {
    name: MaterialType.PLA,
    density: 1.24,
    costPerKg: 25.0,
    description: 'Easy to print, biodegradable, great for prototypes.'
  },
  [MaterialType.PETG]: {
    name: MaterialType.PETG,
    density: 1.27,
    costPerKg: 30.0,
    description: 'Durable, chemical resistant, good balance of strength.'
  },
  [MaterialType.ABS]: {
    name: MaterialType.ABS,
    density: 1.04,
    costPerKg: 28.0,
    description: 'High strength, heat resistant, industrial standard.'
  },
  [MaterialType.TPU]: {
    name: MaterialType.TPU,
    density: 1.21,
    costPerKg: 45.0,
    description: 'Flexible, rubber-like, high impact resistance.'
  },
  [MaterialType.NYLON]: {
    name: MaterialType.NYLON,
    density: 1.1,
    costPerKg: 60.0,
    description: 'Extremely tough, wear resistant, self-lubricating.'
  }
};

export const COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Grey', hex: '#808080' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Orange', hex: '#F59E0B' },
  { name: 'Purple', hex: '#8B5CF6' }
];

export const NOZZLE_FACTORS: Record<number, number> = {
  0.2: 2.0, // High detail, slow
  0.4: 1.0, // Standard
  0.6: 0.6  // Draft, fast
};

export const BASE_SETUP_FEE = 5.0;
export const HOURLY_MACHINE_RATE = 2.0;
export const LABOR_RATE = 15.0;
