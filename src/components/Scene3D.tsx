import { useRef, useMemo, Suspense } from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';

import { Float, Sphere, MeshDistortMaterial, Stars, Torus, Ring } from '@react-three/drei';

import * as THREE from 'three';



function FloatingHeart() {

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {

    if (meshRef.current) {

      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;

      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;

      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;

    }

  });



  return (

    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>

      <mesh ref={meshRef} scale={1.1}>

        <sphereGeometry args={[1, 48, 48]} />

        <MeshDistortMaterial

          color="#f43f5e"

          attach="material"

          distort={0.35}

          speed={1.8}

          roughness={0.15}

          metalness={0.85}

          emissive="#e11d48"

          emissiveIntensity={0.15}

        />

      </mesh>

    </Float>

  );

}



function MaternalRing() {

  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {

    if (ref.current) {

      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;

      ref.current.rotation.z = state.clock.elapsedTime * 0.08;

    }

  });



  return (

    <group ref={ref} position={[-2.5, 0.5, -1]}>

      <Float speed={1.2} floatIntensity={0.6}>

        <Torus args={[1.2, 0.08, 16, 64]} rotation={[Math.PI / 3, 0, 0]}>

          <meshStandardMaterial color="#14b8a6" emissive="#0d9488" emissiveIntensity={0.4} metalness={0.7} roughness={0.2} />

        </Torus>

      </Float>

      <Float speed={1.5} floatIntensity={0.4}>

        <Ring args={[0.9, 1.0, 64]} rotation={[Math.PI / 2.5, 0.3, 0]}>

          <meshStandardMaterial color="#fb7185" emissive="#f43f5e" emissiveIntensity={0.3} metalness={0.6} roughness={0.25} side={THREE.DoubleSide} />

        </Ring>

      </Float>

    </group>

  );

}



function FloatingOrbs() {

  const orbs = useMemo(() => {

    return Array.from({ length: 12 }, (_, i) => ({

      position: [

        (Math.random() - 0.5) * 12,

        (Math.random() - 0.5) * 7,

        (Math.random() - 0.5) * 6 - 2,

      ] as [number, number, number],

      scale: 0.08 + Math.random() * 0.25,

      color: ['#14b8a6', '#0d9488', '#059669', '#2dd4bf', '#5eead4', '#fb7185'][i % 6],

      speed: 0.8 + Math.random() * 1.5,

    }));

  }, []);



  return (

    <>

      {orbs.map((orb, i) => (

        <Float key={i} speed={orb.speed} floatIntensity={0.6 + Math.random() * 0.4}>

          <Sphere args={[orb.scale, 16, 16]} position={orb.position}>

            <meshStandardMaterial

              color={orb.color}

              transparent

              opacity={0.5}

              emissive={orb.color}

              emissiveIntensity={0.2}

            />

          </Sphere>

        </Float>

      ))}

    </>

  );

}



function DNAHelix() {

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {

    if (groupRef.current) {

      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;

    }

  });



  const spheres = useMemo(() => {

    const items = [];

    for (let i = 0; i < 24; i++) {

      const angle = (i / 24) * Math.PI * 4;

      const y = (i - 12) * 0.28;

      items.push({

        pos1: [Math.cos(angle) * 0.7, y, Math.sin(angle) * 0.7] as [number, number, number],

        pos2: [Math.cos(angle + Math.PI) * 0.7, y, Math.sin(angle + Math.PI) * 0.7] as [number, number, number],

      });

    }

    return items;

  }, []);



  return (

    <group ref={groupRef} position={[3.2, 0, -3]}>

      {spheres.map((s, i) => (

        <group key={i}>

          <Sphere args={[0.07, 8, 8]} position={s.pos1}>

            <meshStandardMaterial color="#14b8a6" emissive="#0d9488" emissiveIntensity={0.35} />

          </Sphere>

          <Sphere args={[0.07, 8, 8]} position={s.pos2}>

            <meshStandardMaterial color="#f43f5e" emissive="#e11d48" emissiveIntensity={0.35} />

          </Sphere>

        </group>

      ))}

    </group>

  );

}



function MouseParallax() {

  const { camera } = useThree();

  useFrame((state) => {

    const x = (state.pointer.x * 0.3);

    const y = (state.pointer.y * 0.2);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.03);

    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.03);

    camera.lookAt(0, 0, 0);

  });

  return null;

}



function SceneContent({ variant }: { variant: 'hero' | 'background' | 'minimal' }) {

  return (

    <>

      <ambientLight intensity={0.45} />

      <pointLight position={[10, 10, 10]} intensity={1.2} color="#14b8a6" />

      <pointLight position={[-10, -5, 5]} intensity={0.6} color="#f43f5e" />

      <pointLight position={[0, 5, -5]} intensity={0.3} color="#fbbf24" />

      <Stars

        radius={60}

        depth={60}

        count={variant === 'minimal' ? 400 : 2500}

        factor={2.5}

        fade

        speed={0.4}

      />

      {variant !== 'minimal' && <FloatingHeart />}

      {variant === 'hero' && (

        <>

          <FloatingOrbs />

          <DNAHelix />

          <MaternalRing />

          <MouseParallax />

        </>

      )}

      {variant === 'background' && <FloatingOrbs />}

    </>

  );

}



interface Scene3DProps {

  variant?: 'hero' | 'background' | 'minimal';

  className?: string;

}



export default function Scene3D({ variant = 'hero', className = '' }: Scene3DProps) {

  return (

    <div className={`absolute inset-0 ${className}`}>

      <Canvas

        camera={{ position: [0, 0, 6], fov: 55 }}

        style={{ background: 'transparent' }}

        dpr={[1, 1.5]}

        gl={{ alpha: true, antialias: true }}

      >

        <Suspense fallback={null}>

          <SceneContent variant={variant} />

        </Suspense>

      </Canvas>

    </div>

  );

}

