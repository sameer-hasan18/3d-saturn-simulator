import * as THREE from 'three';

import { Canvas } from "@react-three/fiber";
import { Float, Ring, OrbitControls, Sphere, Stars } from '@react-three/drei'

// 토성 위키백과 https://ko.wikipedia.org/wiki/%ED%86%A0%EC%84%B1

export default function Saturn() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }} style={{ height: "100vh" }}>
            <OrbitControls />

            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            
            <color attach="background" args={['black']} />
            <Stars saturation={0} count={400} speed={0.5} />

            <Float speed={1.5}>
                <Planet />
                <PlanetRing />
            </Float>
        </Canvas>
    )
}

function Planet() {
    return (
        <Sphere args={[1, 128, 128]}>
            <meshBasicMaterial color="rgb(142, 117, 95)" />
        </Sphere>
    )
}

function PlanetRing() {
    return (
        <Ring args={[1.58, 2.16, 60]} rotation={[4.8, 10, 0]}>
            <meshBasicMaterial color="rgb(203, 179, 145)" side={THREE.DoubleSide} />
        </Ring>
    )
}