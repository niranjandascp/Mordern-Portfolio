"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import spaceStationUrl from "@/assets/space_station.glb?url";

function SpaceStationModel() {
  const { scene } = useGLTF(spaceStationUrl);
  return <primitive object={scene} scale={0.15} />;
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const arrivalRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current || !arrivalRef.current) return;

    // Use GSAP context to clean up easily
    const ctx = gsap.context(() => {
      // --- Arrival Animation ---
      // The object warps in from deep space and spins into place
      gsap.from(arrivalRef.current.position, {
        z: -15,
        y: 8,
        duration: 3,
        ease: "power3.out",
      });
      
      gsap.from(arrivalRef.current.rotation, {
        x: Math.PI * 3,
        y: Math.PI * 2,
        duration: 3.5,
        ease: "power2.out",
      });
      
      gsap.from(arrivalRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.5,
        ease: "back.out(1.5)",
      });

      // --- Scroll Animation ---
      // The timeline that spans the entire scroll height of the page
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // 1.5 seconds smoothing
        },
      });

      // Initial state: Top left, pushed slightly back
      groupRef.current.position.set(-2.5, 1.5, -1);
      groupRef.current.rotation.set(0, 0, 0);
      groupRef.current.scale.set(1, 1, 1);

      // Waypoint 1: Move to bottom right
      tl.to(groupRef.current.position, { x: 2.5, y: -1, z: 0, duration: 1 }, 0)
        .to(groupRef.current.rotation, { x: Math.PI, y: Math.PI * 0.5, duration: 1 }, 0)
        
      // Waypoint 2: Move to center left (slightly forward)
        .to(groupRef.current.position, { x: -2, y: 0.5, z: 1, duration: 1 }, 1)
        .to(groupRef.current.rotation, { x: Math.PI * 2, y: Math.PI, duration: 1 }, 1)
        
      // Waypoint 3: Move to top right
        .to(groupRef.current.position, { x: 2, y: 1.2, z: 0, duration: 1 }, 2)
        .to(groupRef.current.rotation, { x: Math.PI * 3, y: Math.PI * 1.5, duration: 1 }, 2)
        
      // Waypoint 4: Move to bottom center
        .to(groupRef.current.position, { x: 0, y: -1.5, z: 0.5, duration: 1 }, 3)
        .to(groupRef.current.rotation, { x: Math.PI * 4, y: Math.PI * 2, duration: 1 }, 3)
        
      // Waypoint 5: End at center, scaled up slightly for the footer
        .to(groupRef.current.position, { x: 0, y: 0, z: 2.5, duration: 1 }, 4)
        .to(groupRef.current.rotation, { x: Math.PI * 5, y: Math.PI * 2.5, duration: 1 }, 4);
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={arrivalRef}>
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
          <SpaceStationModel />
        </Float>
      </group>
    </group>
  );
}

export default function ScrollAnimatedObject() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        <Scene />
      </Canvas>
    </div>
  );
}

useGLTF.preload(spaceStationUrl);
