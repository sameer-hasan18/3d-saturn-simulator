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

{/*

고리, https://ko.wikipedia.org/wiki/%ED%86%A0%EC%84%B1%EC%9D%98_%EA%B3%A0%EB%A6%AC
토성으로부터 7만키로 ~ 14만키로. 너비 약 7만키로.

72900km : 0.58
시작점 : 1.58
끝점 : 2.16

DCBAF 순서 (72900 = 7500+17500+25500+4700+14600+2600+500)
D : 7500km -> 0.059670781893004114
C : 17500km -> 0.1392318244170096
B : 25500km -> 0.20288065843621397
카시니 간극 : 4700km -> 0.03739368998628258
A : 14600km -> 0.11615912208504801
로슈 간극 : 2600km -> 0.020685871056241426
F : 500km -> 0.003978052126200274

*/}

function PlanetRing() {
    return (
        <group>
            <Ring args={[1.58, 1.6396707819, 60]} rotation={[4.8, 10, 0]}>
                <meshBasicMaterial color="rgb(84, 76, 73)" side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[1.6396707819, 1.7789026063, 60]} rotation={[4.8, 10, 0]}>
                <meshBasicMaterial color="rgb(86, 79, 73)" side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[1.7789026063, 1.9817832647, 60]} rotation={[4.8, 10, 0]}>
                <meshBasicMaterial color="rgb(203, 179, 145)" side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[2.0191769547, 2.1353360768, 60]} rotation={[4.8, 10, 0]}>
                <meshBasicMaterial color="rgb(217, 188, 163)" side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[2.1560219479, 2.16, 60]} rotation={[4.8, 10, 0]}>
                <meshBasicMaterial color="rgb(89, 89, 89)" side={THREE.DoubleSide} />
            </Ring>
        </group>
    )
}