import React, { FC, useRef } from "react";
import styles from "./Spinny.module.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import { useMantineTheme } from "@mantine/core";

interface SpinnyProps {
  shape: "square" | "triangle";
}

const Mesh: FC<SpinnyProps> = (props) => {
  const ref = useRef<THREE.Mesh>();
  const theme = useMantineTheme();

  useFrame((_state, _delta) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ref}>
      {props.shape === "square" ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        <coneGeometry args={[0.8, 1.13, 3]} />
      )}
      <meshStandardMaterial opacity={0.0} transparent />
      <Edges color={theme.colors.dark[3]} />
    </mesh>
  );
};

const Spinny: FC<SpinnyProps> = (props: SpinnyProps) => (
  <div className={styles.Spinner}>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Mesh {...props} />
    </Canvas>
  </div>
);

export default Spinny;
