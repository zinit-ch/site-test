
import { MaterialType, MaterialInfo } from './types';

// Toggle: show/hide the multicolor-print option in the UI
export const ENABLE_MULTICOLOR = false;

// Materials list with simple enabled flag for easy toggling
// Change Material names in types.ts if needed
export const MATERIALS: Record<MaterialType, MaterialInfo> = {
  [MaterialType.PLA]: {
    name: MaterialType.PLA,
    density: 1.24,
    costPerKg: 25.0,
    enabled: true,
    colors: [
      { name: 'Schwarz', hex: '#000000' },
      { name: 'Kalt-Weiss', hex: '#FFFFFF' }
    ]
  },
  [MaterialType.PETG]: {
    name: MaterialType.PETG,
    density: 1.27,
    costPerKg: 30.0,
    enabled: false,
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
    enabled: false,
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
    costPerKg: 40.0,
    enabled: true,
    colors: [
      { name: 'Schwarz', hex: '#000000' }
    ]
  },
  [MaterialType.NYLON]: {
    name: MaterialType.NYLON,
    density: 1.1,
    costPerKg: 60.0,
    enabled: false,
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
  'BambuLab H2C': { hourlyRate: 5.0, speedFactor: 1.0, multicolorFactor: 2.0 },
  'Ender 3 V2': { hourlyRate: 2.0, speedFactor: 3.8, multicolorFactor: 0.0 }
};

// Choose which profile should be used by default. Change to 'Default' or 'BambuLab H2C'.
export const DEFAULT_PRINTER = 'Ender 3 V2';

// colors are now embedded on each material in the MATERIALS map

// Configurable nozzles: enable/disable sizes and provide the speed factor
export const NOZZLES: Record<number, { enabled: boolean; factor: number; label?: string }> = {
  0.2: { enabled: false, factor: 2.0, label: '0.2' }, // High detail, slow
  0.4: { enabled: true, factor: 1.0, label: '0.4' }, // Standard
  0.6: { enabled: false, factor: 0.6, label: '0.6' }  // Draft, fast
};

// Backwards-compatible map used in calculations elsewhere in the app
export const NOZZLE_FACTORS: Record<number, number> = Object.fromEntries(
  Object.entries(NOZZLES).map(([k, v]) => [parseFloat(k), v.factor])
) as Record<number, number>;

export const BASE_SETUP_FEE = 5.0;
export const HOURLY_MACHINE_RATE = 2.0;
export const LABOR_RATE = 15.0;
