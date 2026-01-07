
export interface ModelStats {
  volume: number; // in mm^3
  surfaceArea: number; // in mm^2
  boundingBox: {
    x: number;
    y: number;
    z: number;
  };
  triangles: number;
}

export enum MaterialType {
  PLA = 'PLA',
  PETG = 'PETG',
  ABS = 'ABS',
  TPU = 'TPU',
  NYLON = 'NYLON'
}

export interface MaterialInfo {
  name: MaterialType;
  density: number; // g/cm^3
  costPerKg: number; // USD
  description: string;
  enabled?: boolean; // allow toggling materials on/off from constants
}

export interface PrintConfig {
  material: MaterialType;
  infill: number; // 0 to 100
  layerHeight: number; // mm
  quantity: number;
  color: string;
  isMulticolor: boolean;
  nozzleSize: 0.2 | 0.4 | 0.6;
  colorsCount?: number; // number of colors when multicolor printing is enabled (2-7)
}

export interface PriceBreakdown {
  materialCost: number;
  laborCost: number;
  machineCost: number;
  printTime: number; // in hours
  total: number;
}
