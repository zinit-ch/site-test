
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
}

export interface PrintConfig {
  material: MaterialType;
  infill: number; // 0 to 100
  layerHeight: number; // mm
  quantity: number;
  color: string;
  isMulticolor: boolean;
  nozzleSize: 0.2 | 0.4 | 0.6;
}

export interface PriceBreakdown {
  materialCost: number;
  laborCost: number;
  machineCost: number;
  printTime: number; // in hours
  total: number;
}
