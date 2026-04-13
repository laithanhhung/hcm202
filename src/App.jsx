import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI, sidebarOpenAtom } from "./components/UI";
import { useAtom } from "jotai";

function App() {
  return (
    <>
      <UI />
      <Loader />
      <div className="fixed top-0 bottom-0 right-0 h-full w-full">
        <Canvas
          shadows
          camera={{
            position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
            fov: 45,
          }}
        >
          <group position-y={0}>
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </group>
        </Canvas>
      </div>
    </>
  );
}

export default App;
