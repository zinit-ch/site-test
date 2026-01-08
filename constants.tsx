
import { MaterialType, MaterialInfo } from './types';

// Toggle: show/hide the multicolor-print option in the UI
export const ENABLE_MULTICOLOR = true;

// Materials list with simple enabled flag for easy toggling
export const MATERIALS: Record<MaterialType, MaterialInfo> = {
  [MaterialType.PLA]: {
    name: MaterialType.PLA,
    density: 1.24,
    costPerKg: 25.0,
    description: 'Easy to print, biodegradable, great for prototypes.',
    enabled: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Red', hex: '#EF4444' },
      { name: 'Blue', hex: '#3B82F6' }
    ]
  },
  [MaterialType.PETG]: {
    name: MaterialType.PETG,
    density: 1.27,
    costPerKg: 30.0,
    description: 'Durable, chemical resistant, good balance of strength.',
    enabled: true,
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Clear', hex: '#EAF6FF' },
      { name: 'Cyan', hex: '#06B6D4' },
      { name: 'Green', hex: '#10B981' }
    ]
  },
  [MaterialType.ABS]: {
    name: MaterialType.ABS,
    density: 1.04,
    costPerKg: 28.0,
    description: 'High strength, heat resistant, industrial standard.',
    enabled: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Grey', hex: '#6B7280' },
      { name: 'Red', hex: '#DC2626' },
      { name: 'Orange', hex: '#F59E0B' },
      { name: 'Blue', hex: '#2563EB' }
    ]
  },
  [MaterialType.TPU]: {
    name: MaterialType.TPU,
    density: 1.21,
    costPerKg: 45.0,
    description: 'Flexible, rubber-like, high impact resistance.',
    enabled: true,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Pink', hex: '#F472B6' },
      { name: 'Neon Green', hex: '#84CC16' }
    ]
  },
  [MaterialType.NYLON]: {
    name: MaterialType.NYLON,
    density: 1.1,
    costPerKg: 60.0,
    description: 'Extremely tough, wear resistant, self-lubricating.',
    enabled: false, // disabled by default as an example
    colors: [
      { name: 'Natural', hex: '#F5F5F4' },
      { name: 'Black', hex: '#000000' },
      { name: 'Grey', hex: '#9CA3AF' }
    ]
  }
};

// Printer profiles: adjust these to optimize pricing/time calculations per printer
export const PRINTER_PROFILES: Record<string, { hourlyRate: number; speedFactor: number; multicolorFactor: number }> = {
  Default: { hourlyRate: 2.0, speedFactor: 1.0, multicolorFactor: 1.5 },
  'BambuLab H2C': { hourlyRate: 4.0, speedFactor: 0.6, multicolorFactor: 1.2 }
};

// Choose which profile should be used by default. Change to 'Default' or 'BambuLab H2C'.
export const DEFAULT_PRINTER = 'BambuLab H2C';

// colors are now embedded on each material in the MATERIALS map

// Configurable nozzles: enable/disable sizes and provide the speed factor
export const NOZZLES: Record<number, { enabled: boolean; factor: number; label?: string }> = {
  0.2: { enabled: true, factor: 2.0, label: '0.2' }, // High detail, slow
  0.4: { enabled: true, factor: 1.0, label: '0.4' }, // Standard
  0.6: { enabled: true, factor: 0.6, label: '0.6' }  // Draft, fast
};

// Backwards-compatible map used in calculations elsewhere in the app
export const NOZZLE_FACTORS: Record<number, number> = Object.fromEntries(
  Object.entries(NOZZLES).map(([k, v]) => [parseFloat(k), v.factor])
) as Record<number, number>;

export const BASE_SETUP_FEE = 5.0;
export const HOURLY_MACHINE_RATE = 2.0;
export const LABOR_RATE = 15.0;
