import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PillarId } from "../types";
import { PILLARS_DATA } from "../data/pillars";
import { playUiSound } from "../utils/audio";

interface ThreeStageProps {
  selectedPillarId: PillarId | null;
  onSelectPillar: (id: PillarId) => void;
  hoveredPillarId: PillarId | null;
  onHoverPillar: (id: PillarId | null) => void;
}

export const ThreeStage: React.FC<ThreeStageProps> = ({
  selectedPillarId,
  onSelectPillar,
  hoveredPillarId,
  onHoverPillar,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [tagPositions, setTagPositions] = useState<Record<string, { x: number; y: number; visible: boolean }>>({});
  const [isWebGlSupported, setIsWebGlSupported] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const islandsGroupRef = useRef<THREE.Group | null>(null);
  const islandMeshesRef = useRef<Record<PillarId, THREE.Group>>({} as any);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2(-10, -10));

  useEffect(() => {
    if (!mountRef.current) return;

    // Check WebGL availability
    try {
      const canvasTest = document.createElement("canvas");
      if (!window.WebGLRenderingContext || (!canvasTest.getContext("webgl") && !canvasTest.getContext("experimental-webgl"))) {
        setIsWebGlSupported(false);
        return;
      }
    } catch (e) {
      setIsWebGlSupported(false);
      return;
    }

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f5a0, 2.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3b82f6, 2.0);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xec4899, 3, 20);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Background Starfield Particles
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color("#10b981"),
      new THREE.Color("#3b82f6"),
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#00f5a0"),
      new THREE.Color("#ec4899"),
    ];

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 40;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Core Center Crystal (COMIWAY Core)
    const coreGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f5a0,
      emissive: 0x00d2ff,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.6,
      thickness: 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Main Islands Group
    const islandsGroup = new THREE.Group();
    islandsGroupRef.current = islandsGroup;
    scene.add(islandsGroup);

    // Create 4 Islands in a balanced quad layout
    const islandRadius = 4.8;
    const pillarList: PillarId[] = ["branding", "websites", "ai", "blueprinting"];

    const islandMeshes: Record<PillarId, THREE.Group> = {} as any;

    pillarList.forEach((pillarId, idx) => {
      const angle = (idx / pillarList.length) * Math.PI * 2 - Math.PI / 4;
      const x = Math.cos(angle) * islandRadius;
      const y = Math.sin(angle) * (islandRadius * 0.7); // slight ellipse
      const z = (Math.random() - 0.5) * 0.5;

      const islandGroup = new THREE.Group();
      islandGroup.position.set(x, y, z);
      islandGroup.userData = { pillarId, angle, baseX: x, baseY: y, baseZ: z };

      // Base Glow Disc
      const discGeo = new THREE.CircleGeometry(1.2, 32);
      const pillarColor = PILLARS_DATA.find((p) => p.id === pillarId)?.color || "#3b82f6";
      const discMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(pillarColor),
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
      });
      const disc = new THREE.Mesh(discGeo, discMat);
      disc.rotation.x = Math.PI / 2;
      disc.position.y = -1.1;
      islandGroup.add(disc);

      // Build specific 3D Sculpture per pillar
      if (pillarId === "branding") {
        // 1. Strategic Branding: Torus Knot + Translucent Brass/Green Rings
        const knotGeo = new THREE.TorusKnotGeometry(0.55, 0.16, 64, 16);
        const knotMat = new THREE.MeshStandardMaterial({
          color: 0x10b981,
          metalness: 0.9,
          roughness: 0.15,
          emissive: 0x047857,
          emissiveIntensity: 0.3,
        });
        const knotMesh = new THREE.Mesh(knotGeo, knotMat);
        islandGroup.add(knotMesh);

        const ringGeo = new THREE.TorusGeometry(0.95, 0.03, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 3;
        islandGroup.add(ringMesh);
      } else if (pillarId === "websites") {
        // 2. Website Building: Cascading 3D Glass Browser Windows
        for (let k = 0; k < 3; k++) {
          const glassGeo = new THREE.BoxGeometry(1.2 - k * 0.15, 0.75 - k * 0.1, 0.04);
          const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0x3b82f6,
            roughness: 0.1,
            transmission: 0.8,
            thickness: 0.2,
            clearcoat: 1.0,
            wireframe: k === 2,
          });
          const glassBox = new THREE.Mesh(glassGeo, glassMat);
          glassBox.position.set((k - 1) * 0.2, (k - 1) * 0.2, k * 0.25 - 0.2);
          glassBox.rotation.y = 0.2 - k * 0.1;
          islandGroup.add(glassBox);
        }
      } else if (pillarId === "ai") {
        // 3. AI Solutions: Glowing Neural Sphere & Orbiting Circuit Nodes
        const aiGeo = new THREE.SphereGeometry(0.55, 32, 32);
        const aiMat = new THREE.MeshStandardMaterial({
          color: 0x8b5cf6,
          emissive: 0xec4899,
          emissiveIntensity: 0.5,
          roughness: 0.2,
          metalness: 0.8,
        });
        const aiCore = new THREE.Mesh(aiGeo, aiMat);
        islandGroup.add(aiCore);

        // Orbiting Neural Nodes
        const nodeGroup = new THREE.Group();
        nodeGroup.name = "orbitNodes";
        for (let n = 0; n < 6; n++) {
          const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
          const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f5a0 });
          const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
          const a = (n / 6) * Math.PI * 2;
          nodeMesh.position.set(Math.cos(a) * 0.9, Math.sin(a) * 0.9, (n % 2) * 0.2 - 0.1);
          nodeGroup.add(nodeMesh);
        }
        islandGroup.add(nodeGroup);
      } else if (pillarId === "blueprinting") {
        // 4. Strategic Blueprinting: 3D Rising Milestone Pyramid/Roadmap Bars
        const blueprintGroup = new THREE.Group();
        for (let b = 0; b < 5; b++) {
          const height = 0.3 + b * 0.22;
          const barGeo = new THREE.BoxGeometry(0.18, height, 0.18);
          const barMat = new THREE.MeshStandardMaterial({
            color: 0x00f5a0,
            metalness: 0.7,
            roughness: 0.2,
            emissive: 0x10b981,
            emissiveIntensity: 0.2 + b * 0.1,
          });
          const barMesh = new THREE.Mesh(barGeo, barMat);
          barMesh.position.set((b - 2) * 0.26, height / 2 - 0.4, 0);
          blueprintGroup.add(barMesh);
        }
        islandGroup.add(blueprintGroup);
      }

      // Connecting pipeline beam from island to Core
      const lineMat = new THREE.LineDashedMaterial({
        color: new THREE.Color(pillarColor),
        dashSize: 0.2,
        gapSize: 0.1,
        linewidth: 2,
        transparent: true,
        opacity: 0.5,
      });
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      scene.add(line);

      islandsGroup.add(islandGroup);
      islandMeshes[pillarId] = islandGroup;
    });

    islandMeshesRef.current = islandMeshes;

    // Mouse Move Listener
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
      mouseRef.current.set(x, y);

      // Raycasting
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(islandsGroup.children, true);

      if (intersects.length > 0) {
        let parent: THREE.Object3D | null = intersects[0].object;
        while (parent && !parent.userData?.pillarId && parent.parent) {
          parent = parent.parent;
        }
        if (parent && parent.userData?.pillarId) {
          const hoveredId = parent.userData.pillarId as PillarId;
          onHoverPillar(hoveredId);
          container.style.cursor = "pointer";
          return;
        }
      }
      onHoverPillar(null);
      container.style.cursor = "default";
    };

    // Click Listener
    const handleClick = () => {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(islandsGroup.children, true);

      if (intersects.length > 0) {
        let parent: THREE.Object3D | null = intersects[0].object;
        while (parent && !parent.userData?.pillarId && parent.parent) {
          parent = parent.parent;
        }
        if (parent && parent.userData?.pillarId) {
          const clickedId = parent.userData.pillarId as PillarId;
          playUiSound("select");
          onSelectPillar(clickedId);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Resize Listener
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Core Crystal
      coreMesh.rotation.y = elapsedTime * 0.4;
      coreMesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2;

      // Rotate Particles
      particles.rotation.y = elapsedTime * 0.02;

      // Update Islands
      pillarList.forEach((pillarId) => {
        const island = islandMeshes[pillarId];
        if (!island) return;

        const { baseX, baseY, baseZ } = island.userData;

        // Floating hover motion
        island.position.y = baseY + Math.sin(elapsedTime * 1.5 + baseX) * 0.15;
        island.rotation.y = elapsedTime * 0.3;

        // Check if hovered or selected
        const isHovered = hoveredPillarId === pillarId;
        const isSelected = selectedPillarId === pillarId;

        const targetScale = isSelected ? 1.35 : isHovered ? 1.2 : 1.0;
        island.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Sub-animations
        if (pillarId === "ai") {
          const orbitNodes = island.getObjectByName("orbitNodes");
          if (orbitNodes) orbitNodes.rotation.z = -elapsedTime * 0.8;
        }
      });

      // Camera lerp when pillar selected
      if (selectedPillarId && islandMeshes[selectedPillarId]) {
        const targetIsland = islandMeshes[selectedPillarId];
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetIsland.position.x * 0.3, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetIsland.position.y * 0.3, 0.05);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 11, 0.05);
      } else {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseRef.current.x * 0.6, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseRef.current.y * 0.6, 0.05);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 14, 0.05);
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);

      // Project 3D Positions to HTML coordinates for Tag Badges
      const newTagPositions: Record<string, { x: number; y: number; visible: boolean }> = {};
      const vec = new THREE.Vector3();

      pillarList.forEach((id) => {
        const island = islandMeshes[id];
        if (island && camera) {
          island.getWorldPosition(vec);
          vec.y += 1.2; // Float tag above sculpture
          vec.project(camera);

          const screenX = (vec.x * 0.5 + 0.5) * container.clientWidth;
          const screenY = (-vec.y * 0.5 + 0.5) * container.clientHeight;

          newTagPositions[id] = {
            x: screenX,
            y: screenY,
            visible: vec.z < 1,
          };
        }
      });

      setTagPositions(newTagPositions);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [selectedPillarId]);

  if (!isWebGlSupported) {
    // 2D High-Tech Canvas Fallback
    return (
      <div className="w-full h-[520px] md:h-[620px] relative bg-slate-950/80 rounded-3xl border border-slate-800/80 p-6 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 via-blue-900/20 to-purple-900/20 pointer-events-none" />
        <div className="relative z-10 text-center max-w-lg mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> COMIWAY 3D Interactive Stage
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Select an Architectural Pillar</h3>
          <p className="text-slate-400 text-sm mt-1">
            Explore premier strategy, AI, and digital real estate solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10 w-full max-w-4xl">
          {PILLARS_DATA.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                playUiSound("select");
                onSelectPillar(p.id);
              }}
              onMouseEnter={() => onHoverPillar(p.id)}
              onMouseLeave={() => onHoverPillar(null)}
              className={`group p-4 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between h-40 backdrop-blur-md ${
                selectedPillarId === p.id
                  ? "bg-slate-900/90 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-900/70"
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg mb-2"
                style={{ backgroundColor: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40` }}
              >
                {p.title.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider block text-slate-400">{p.shortTitle}</span>
                <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {p.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[580px] md:h-[680px] lg:h-[720px] rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950/90 shadow-2xl shadow-emerald-950/20">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Projection Tag Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PILLARS_DATA.map((p) => {
          const pos = tagPositions[p.id];
          if (!pos || !pos.visible) return null;

          const isSelected = selectedPillarId === p.id;
          const isHovered = hoveredPillarId === p.id;

          return (
            <div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-200"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
              }}
            >
              <button
                onClick={() => {
                  playUiSound("select");
                  onSelectPillar(p.id);
                }}
                onMouseEnter={() => {
                  playUiSound("hover");
                  onHoverPillar(p.id);
                }}
                onMouseLeave={() => onHoverPillar(null)}
                className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border text-xs font-medium transition-all duration-300 shadow-xl ${
                  isSelected
                    ? "bg-slate-900/90 border-emerald-400 text-white scale-110 shadow-emerald-500/30 ring-2 ring-emerald-400/40"
                    : isHovered
                    ? "bg-slate-900/80 border-slate-400 text-emerald-300 scale-105"
                    : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-600"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: p.color }}
                />
                <span className="font-semibold tracking-wide whitespace-nowrap">{p.title}</span>

                {/* Sub-tag badge */}
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-md font-mono hidden sm:inline-block whitespace-nowrap opacity-80"
                  style={{ backgroundColor: `${p.color}25`, color: p.color }}
                >
                  {p.tags[0]}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Stage Bottom Controls / Instructions */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 backdrop-blur-lg px-4 py-2.5 rounded-2xl border border-slate-800/80 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">Click or Hover any island to inspect</span>
        </div>
      </div>
    </div>
  );
};
