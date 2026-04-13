import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import { useAtom } from "jotai";
import { Book } from "./Book";
import { bookOpenAtom, staticViewAtom, fixedPoseAtom } from "./UI";

export const Experience = () => {
  const [bookOpen] = useAtom(bookOpenAtom);
  const [staticView] = useAtom(staticViewAtom);
  const controlsRef = useRef();
  const [fixedPose] = useAtom(fixedPoseAtom);
  const bookGroupRef = useRef();
  const { camera } = useThree();

  useFrame((_, delta) => {
    const isMobile = window.innerWidth <= 768;

    if (staticView || fixedPose) {
      // 2D view: snap ngay vị trí/góc nhìn cố định
      const pos = new Vector3(0, 2.0, 4.2);
      const target = new Vector3(0, 1.0, 0);
      camera.position.copy(pos);
      if (controlsRef.current) {
        controlsRef.current.target.copy(target);
        controlsRef.current.update();
      }
      // Reset góc/độ nghiêng của sách về mặc định khi bật cố định
      if (bookGroupRef.current) {
        bookGroupRef.current.position.set(0, 0, 0);
        bookGroupRef.current.rotation.set(0, 0, 0);
        bookGroupRef.current.updateMatrixWorld();
      }
      const targetFov = isMobile ? 45 : 38;
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
      return;
    }

    // Mobile positioning: sách ở trên cao, giữa màn hình
    const mobileOpenPos = new Vector3(0, 2.2, 3.5);
    const mobileClosedPos = new Vector3(0, 1.8, 4.5);

    // Desktop positioning: sách ở giữa màn hình
    const desktopOpenPos = new Vector3(0.9, 2, 2.6);
    const desktopClosedPos = new Vector3(-0.5, 1, 4);

    const openPos = isMobile ? mobileOpenPos : desktopOpenPos;
    const closedPos = isMobile ? mobileClosedPos : desktopClosedPos;

    const to = bookOpen ? openPos : closedPos;
    camera.position.lerp(to, Math.min(1, delta * 2.5));

    if (controlsRef.current) {
      // Mobile target: nhìn vào sách ở trên cao
      const mobileOpenTarget = new Vector3(0, 1.2, 0);
      const mobileClosedTarget = new Vector3(0, 0.8, 0);

      // Desktop target: nhìn vào sách ở giữa
      const desktopOpenTarget = new Vector3(0.35, 0.66, 0);
      const desktopClosedTarget = new Vector3(0, 0, 0);

      const openTarget = isMobile ? mobileOpenTarget : desktopOpenTarget;
      const closedTarget = isMobile ? mobileClosedTarget : desktopClosedTarget;

      const tt = bookOpen ? openTarget : closedTarget;
      controlsRef.current.target.lerp(tt, Math.min(1, delta * 2.5));
      controlsRef.current.update();
    }

    // Mobile FOV: rộng hơn để thấy cả sách và content
    const mobileOpenFov = 65;
    const mobileClosedFov = 55;
    const desktopOpenFov = 55;
    const desktopClosedFov = 45;

    const openFov = isMobile ? mobileOpenFov : desktopOpenFov;
    const closedFov = isMobile ? mobileClosedFov : desktopClosedFov;

    camera.fov +=
      ((bookOpen ? openFov : closedFov) - camera.fov) *
      Math.min(1, delta * 2.5);
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <group ref={bookGroupRef}>
        <Float
          key={fixedPose ? "fixed" : "anim"}
          rotation-x={staticView || fixedPose ? 0 : -Math.PI / 4}
          floatIntensity={staticView || fixedPose ? 0 : 1}
          speed={staticView || fixedPose ? 0 : 2}
          rotationIntensity={staticView || fixedPose ? 0 : 2}
          position={
            staticView || fixedPose
              ? window.innerWidth <= 768
                ? [0, bookOpen ? 1.6 : 1.2, 0]
                : [0, 1.2, 0]
              : bookOpen
              ? window.innerWidth <= 768
                ? [0, 1.8, 0]
                : [1, 0.6, 0]
              : window.innerWidth <= 768
              ? [0, -0.2, 0]
              : [0, 0, 0]
          }
        >
          <Book
            scale={
              typeof window !== "undefined" && window.innerWidth <= 768
                ? 0.8
                : 1
            }
          />
        </Float>
      </group>
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        enableRotate={!staticView}
        enableZoom={!staticView}
        enablePan
      />
      <Environment preset="studio"></Environment>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[2, 5, 2]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};
