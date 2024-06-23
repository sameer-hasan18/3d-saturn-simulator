import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, Stars, Html, useTexture } from '@react-three/drei';
import { useState, useRef } from 'react';
import * as THREE from 'three';

export default function Saturn() {
    return (
        <Canvas camera={{ position: [0, 0, 10] }} style={{ height: "100vh" }}>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <color attach="background" args={['black']} />
            <Stars saturation={0} count={5000} speed={1} />
            <Float speed={1.5}>
                <Planet />
                <Moons />
            </Float>
        </Canvas>
    );
}

function Planet() {
    const texturePath = '/textures/saturn.png';
    console.log(`Loading texture from ${texturePath}`);
    const texture = useTexture(texturePath);
    return (
        <Sphere args={[2, 128, 128]}>
            <meshStandardMaterial map={texture} />
        </Sphere>
    );
}

function Moons() {
    const moonCount = 5;
    const radius = 5.0;
    const moonSize = 0.5;
    const titles = ["Home", "About Us", "Services/Products", "Blog/News", "Contact"];
    const links = ["/home", "/about", "/services", "/blog", "/contact"];
    const moons = [];

    for (let i = 0; i < moonCount; i++) {
        const angle = (i / moonCount) * (2 * Math.PI);
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        moons.push(<Moon key={i} position={[x, 0, z]} size={moonSize} title={titles[i]} link={links[i]} />);
    }

    return (
        <group>
            {moons}
        </group>
    );
}

function Moon({ position, size, title, link }) {
    const [hovered, setHovered] = useState(false);
    const moonRef = useRef();
    const textRef = useRef();
    const texturePath = '/textures/moon.png';
    console.log(`Loading texture from ${texturePath}`);
    const moonTexture = useTexture(texturePath);
    const saturnRadius = 2;

    useFrame(({ camera }) => {
        if (moonRef.current && textRef.current) {
            const moonPos = new THREE.Vector3().setFromMatrixPosition(moonRef.current.matrixWorld);
            const saturnPos = new THREE.Vector3(0, 0, 0);
            const camPos = camera.position;

            const moonToCamDist = moonPos.distanceTo(camPos);
            const saturnToCamDist = saturnPos.distanceTo(camPos);

            if (moonToCamDist > saturnToCamDist + saturnRadius) {
                textRef.current.style.display = 'none';
            } else {
                textRef.current.style.display = 'block';
            }
        }
    });

    const handlePointerOver = () => setHovered(true);
    const handlePointerOut = () => setHovered(false);
    const handleClick = () => {
        window.location.href = link;
    };

    return (
        <group ref={moonRef} position={position} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
            <Sphere args={[size, 32, 32]}>
                <meshStandardMaterial map={moonTexture} color={hovered ? 'yellow' : 'gray'} />
            </Sphere>
            <Html ref={textRef} position={[0, size * 1.5, 0]} center>
                <div style={{ color: 'white', fontSize: '16px', textAlign: 'center', width: '100px' }}>{title}</div>
            </Html>
        </group>
    );
}
