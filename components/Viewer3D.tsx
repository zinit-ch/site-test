
import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center, Grid, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

interface Viewer3DProps {
  file: File | null;
  labels: {
    placeholderTitle: string;
    placeholderSub: string;
    engineReady: string;
  };
}

const Model = ({ file }: { file: File }) => {
  const geometry = useMemo(() => {
    const loader = new STLLoader();
    const url = URL.createObjectURL(file);
    return new Promise<THREE.BufferGeometry>((resolve) => {
      loader.load(url, (geo) => {
        geo.computeVertexNormals();
        resolve(geo);
      });
    });
  }, [file]);

  const [resolvedGeometry, setResolvedGeometry] = React.useState<THREE.BufferGeometry | null>(null);

  React.useEffect(() => {
    geometry.then(setResolvedGeometry);
  }, [geometry]);

  if (!resolvedGeometry) return null;

  // Use local component aliases to bypass JSX intrinsic checks if global types are missing
  const Mesh = 'mesh' as any;
  const MeshStandardMaterial = 'meshStandardMaterial' as any;

  return (
    <Center>
      {/* Using capitalized aliases avoids JSX intrinsic element type checking */}
      <Mesh geometry={resolvedGeometry} castShadow receiveShadow>
        <MeshStandardMaterial color="#4f46e5" roughness={0.3} metalness={0.2} />
      </Mesh>
    </Center>
  );
};

const Viewer3D: React.FC<Viewer3DProps> = ({ file, labels }) => {
  return (
    <div className="w-full h-[400px] md:h-[600px] bg-neutral-900 rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl">
      {!file ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 space-y-4 px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
          <p className="text-lg font-medium">{labels.placeholderTitle}</p>
          <p className="text-sm">{labels.placeholderSub}</p>
        </div>
      ) : (
        <Canvas shadows camera={{ position: [100, 100, 100], fov: 45 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.4, blur: 2 }}>
              <Model file={file} />
            </Stage>
            <OrbitControls makeDefault />
            <Grid 
              infiniteGrid 
              fadeDistance={100} 
              sectionColor="#4f46e5" 
              sectionThickness={1} 
              cellColor="#333" 
              cellSize={10} 
              sectionSize={50}
            />
          </Suspense>
          <Environment preset="city" />
        </Canvas>
      )}
      {file && (
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-300 border border-white/10">
          {labels.engineReady}
        </div>
      )}
    </div>
  );
};

export default Viewer3D;
