import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, Stars, Html } from '@react-three/drei';
import { useState } from 'react';

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
                <Moons />
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

function Moons() {
    const moonCount = 5;
    const radius = 2.0;
    const moonSize = 0.3; // Consistent size for all moons
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

    const handlePointerOver = () => setHovered(true);
    const handlePointerOut = () => setHovered(false);
    const handleClick = () => {
        window.location.href = link;
    };

    return (
        <group position={position} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
            <Sphere args={[size, 32, 32]}>
                <meshBasicMaterial color={hovered ? 'yellow' : 'gray'} />
            </Sphere>
            <Html position={[0, size * 1.5, 0]} center>
                <div style={{ color: 'white', fontSize: '20px', textAlign: 'center', width: '100px' }}>{title}</div>
            </Html>
        </group>
    );
}