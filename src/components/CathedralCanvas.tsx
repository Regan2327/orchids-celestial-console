"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, Stars, MeshDistortMaterial, Text3D, Center } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function CathedralArch({ position, rotation, scale = [1, 1, 1] }: { position: [number, number, number], rotation: [number, number, number], scale?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main Arch Pillar Left */}
      <mesh position={[-2, 2, 0]}>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Main Arch Pillar Right */}
      <mesh position={[2, 2, 0]}>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Arch Top */}
      <mesh position={[0, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2, 0.25, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={["#000B1E"]} />
      <fog attach="fog" args={["#000B1E", 10, 25]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
      <pointLight position={[-10, 5, -5]} intensity={0.5} color="#4A90E2" />
      
      <group ref={groupRef}>
        {/* Creating a hall of arches */}
        {[-10, -5, 0, 5, 10].map((z) => (
          <CathedralArch key={z} position={[0, -2, z]} rotation={[0, 0, 0]} />
        ))}
        
        {/* Floating particles/snow */}
        <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Central glowing element */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[0, 1, 0]}>
            <octahedronGeometry args={[1, 0]} />
            <MeshDistortMaterial
              color="#FFD700"
              speed={2}
              distort={0.4}
              radius={1}
              emissive="#FFD700"
              emissiveIntensity={0.5}
              metalness={1}
            />
          </mesh>
        </Float>
      </group>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#000B1E" metalness={0.5} roughness={0.8} />
      </mesh>
    </>
  );
}

export default function CathedralCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <Scene />
      </Canvas>
    </div>
  );
}
