
import { ModelStats } from '../types';

export const calculateModelStats = async (file: File): Promise<ModelStats> => {
  const name = (file.name || '').toLowerCase();

  // If it's an STL, attempt to parse as before
  if (name.endsWith('.stl')) {
    const buffer = await file.arrayBuffer();
    const dv = new DataView(buffer);

    let triangleCount = 0;
    let volume = 0;
    let totalArea = 0;
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    try {
      triangleCount = dv.getUint32(80, true);
      let offset = 84;

      for (let i = 0; i < triangleCount; i++) {
        offset += 12;

        const v1 = { x: dv.getFloat32(offset, true), y: dv.getFloat32(offset + 4, true), z: dv.getFloat32(offset + 8, true) };
        offset += 12;
        const v2 = { x: dv.getFloat32(offset, true), y: dv.getFloat32(offset + 4, true), z: dv.getFloat32(offset + 8, true) };
        offset += 12;
        const v3 = { x: dv.getFloat32(offset, true), y: dv.getFloat32(offset + 4, true), z: dv.getFloat32(offset + 8, true) };
        offset += 12;

        offset += 2;

        [v1, v2, v3].forEach(v => {
          minX = Math.min(minX, v.x); maxX = Math.max(maxX, v.x);
          minY = Math.min(minY, v.y); maxY = Math.max(maxY, v.y);
          minZ = Math.min(minZ, v.z); maxZ = Math.max(maxZ, v.z);
        });

        const v321 = v3.x * v2.y * v1.z;
        const v231 = v2.x * v3.y * v1.z;
        const v312 = v3.x * v1.y * v2.z;
        const v132 = v1.x * v3.y * v2.z;
        const v213 = v2.x * v1.y * v3.z;
        const v123 = v1.x * v2.y * v3.z;
        volume += (1.0 / 6.0) * (-v321 + v231 + v312 - v132 - v213 + v123);

        const ab = { x: v2.x - v1.x, y: v2.y - v1.y, z: v2.z - v1.z };
        const ac = { x: v3.x - v1.x, y: v3.y - v1.y, z: v3.z - v1.z };
        const cross = {
          x: ab.y * ac.z - ab.z * ac.y,
          y: ab.z * ac.x - ab.x * ac.z,
          z: ab.x * ac.y - ab.y * ac.x
        };
        totalArea += 0.5 * Math.sqrt(cross.x * cross.x + cross.y * cross.y + cross.z * cross.z);
      }
    } catch (e) {
      console.error('Error parsing STL', e);
      return {
        volume: 15000,
        surfaceArea: 4000,
        boundingBox: { x: 50, y: 50, z: 50 },
        triangles: 1000
      };
    }

    return {
      volume: Math.abs(volume),
      surfaceArea: totalArea,
      boundingBox: {
        x: maxX - minX,
        y: maxY - minY,
        z: maxZ - minZ
      },
      triangles: triangleCount
    };
  }

  // For other filetypes (.3mf, .step/.stp) provide an improved heuristic estimate based on file size
  const sizeBytes = file.size || 0;
  let multiplier = 0.5;
  if (name.endsWith('.3mf')) multiplier = 0.8;
  if (name.endsWith('.step') || name.endsWith('.stp')) multiplier = 2.0;

  // Estimate volume (mm^3) from file size with clamping
  let estVolume = Math.round(sizeBytes * multiplier);
  estVolume = Math.max(2000, Math.min(1000000, estVolume));

  // Estimate bounding box as roughly a cube with side = cbrt(volume)
  const side = Math.max(10, Math.round(Math.cbrt(estVolume)));
  const estBBox = { x: side, y: side, z: side };

  // Surface area estimate (approximate): surface of cube scaled down for complexity
  const estSurface = Math.round(6 * Math.pow(side, 2) * 0.6);

  const estTriangles = Math.min(500000, Math.max(100, Math.round(sizeBytes / 10)));

  return {
    volume: estVolume,
    surfaceArea: estSurface,
    boundingBox: estBBox,
    triangles: estTriangles
  };
};

export const formatNumber = (num: number) => num.toLocaleString(undefined, { maximumFractionDigits: 2 });

export const roundToNearest005 = (amount: number) => {
  // Round to nearest 0.05 CHF
  const rounded = Math.round(amount * 20) / 20; // 1/0.05 = 20
  // Ensure two decimal places
  return Math.round(rounded * 100) / 100;
};
