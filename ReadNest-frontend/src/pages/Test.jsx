import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Navbar from '../components/Navbar';

const Test = () => {
    const mountRef = useRef(null);
    const modelRef = useRef(null);

    const generateStars = () => {
        const stars = [];
        for (let i = 0; i < 50; i++) {
            const size = Math.random() * 4 + 2;
            stars.push({
                id: i,
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                size,
                animationDelay: Math.random() * 3 + 's'
            });
        }
        return stars;
    };

    const stars = generateStars();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.1, 1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7);
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load(
            '/models/book.glb',
            (gltf) => {
                const model = gltf.scene;
                model.position.set(0, -2, 0);
                model.scale.set(1.5, 1.5, 1.5);
                model.rotation.set(Math.PI / 4, Math.PI, 0);
                scene.add(model);
                modelRef.current = model;
            },
            (xhr) => {
                console.log(`${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
            },
            (error) => {
                console.error('GLB loading error:', error);
            }
        );

        camera.position.z = 5;

        let mouseX = 0;
        let mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX) / windowHalfX;
            mouseY = (event.clientY - windowHalfY) / windowHalfY;
        };

        document.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            if (modelRef.current) {

                const targetRotY = mouseX * 0.5;
                const targetRotX = mouseY * 0.5;

                const baseY = 3.15;
                const maxX = 0.1;

                const clampedTargetRotX = THREE.MathUtils.clamp(targetRotX, -maxX, maxX);
                modelRef.current.rotation.y += ((baseY + targetRotY) - modelRef.current.rotation.y) * 0.05;
                modelRef.current.rotation.x += (clampedTargetRotX - modelRef.current.rotation.x) * 0.05;
            }

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);



        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="overflow-hidden h-screen bg-gray-50 relative">
            <div className="bg-[#e8bae6] absolute top-[-6rem] right-[11rem] h-[30rem] w-[30rem] 
                sm:h-[35rem] sm:w-[35rem] 
                md:h-[40rem] md:w-[40rem] 
                lg:h-[45rem] lg:w-[45rem] 
                xl:h-[50rem] xl:w-[50rem] 
                2xl:h-[55rem] 2xl:w-[55rem] 
                rounded-full blur-[8rem] z-0">
            </div>
            <div className="bg-[#c9A5ed] absolute top-[-1rem] left-[5rem] h-[30rem] w-[30rem] 
                sm:h-[35rem] sm:w-[35rem] 
                md:h-[40rem] md:w-[40rem] 
                lg:h-[45rem] lg:w-[45rem] 
                xl:h-[50rem] xl:w-[50rem] 
                2xl:h-[55rem] 2xl:w-[55rem] 
                rounded-full blur-[10rem] z-0">
            </div>
            <div className="relative z-2">
                <Navbar />
            </div>
            <div className="absolute inset-0 pointer-events-none">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="star"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            animationDelay: star.animationDelay
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 m-0 z-1" ref={mountRef} />
            <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 
                   bg-gray-300 text-black font-semibold rounded-lg shadow-md 
                   transition duration-300 hover:bg-gray-400 hover:scale-105 pointer-events-auto z-2">
                Click Me
            </button>

        </div>
    );

};

export default Test;
