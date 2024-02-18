import Image from "next/image";
import React from "react";

type LoadingProps = {
  width?: number;
  height?: number;
}

const LoadingKalla: React.FC<LoadingProps> = ({
  width,
  height,
}) => {
  return (
    <Image src="/loading-animation.svg" alt="logo" width={width} height={height} />
  );
};

export default LoadingKalla;
