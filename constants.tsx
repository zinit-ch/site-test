
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

// Energy cost per kWh in CHF (Swiss electricity rate)
export const ENERGY_COST_PER_KWH = 0.4;

// Printer profiles: adjust these to optimize pricing/time calculations per printer
// powerWatts = average power consumption during printing
// speedFactor = relative print speed (1.0 = Ender 3 V2 baseline, lower = faster)
export const PRINTER_PROFILES: Record<string, {
  hourlyRate: number;
  speedFactor: number;
  multicolorFactor: number;
  printVolume: { x: number; y: number; z: number };
  powerWatts: number;
}> = {
  'Default': {
    hourlyRate: 2.0,
    speedFactor: 1.0,
    multicolorFactor: 1.5,
    printVolume: { x: 200, y: 200, z: 200 },
    powerWatts: 200
  },
  'BambuLab H2C': {
    hourlyRate: 6.0,
    speedFactor: 0.20,      // ~5x faster than Ender 3 (CoreXY up to 500mm/s + heated chamber)
    multicolorFactor: 1.3,  // AMS Lite support for easy multicolor
    printVolume: { x: 256, y: 256, z: 256 },
    powerWatts: 450         // High power consumption with heated chamber
  },
  'BambuLab P2S': {
    hourlyRate: 5.0,
    speedFactor: 0.25,      // ~4x faster than Ender 3 (CoreXY up to 500mm/s)
    multicolorFactor: 1.2,  // AMS support for multicolor
    printVolume: { x: 256, y: 256, z: 256 },
    powerWatts: 350         // Standard power consumption
  },
  'Creality Ender 3 V2': {
    hourlyRate: 1.5,
    speedFactor: 1.0,       // Baseline speed (bed-slinger ~80-100mm/s typical)
    multicolorFactor: 0.0,  // No native multicolor support
    printVolume: { x: 210, y: 220, z: 250 },
    powerWatts: 270         // 24V system, moderate power
  }
};

// Choose which profile should be used by default
export const DEFAULT_PRINTER = 'Creality Ender 3 V2';

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
