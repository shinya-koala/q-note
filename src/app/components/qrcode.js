import React from "react";
import { useQRCode } from "next-qrcode";

export const Qrcode = ({ id }) => {
  const { Canvas } = useQRCode();
  return (
    <Canvas
      // 本番URLに切り替える
      text={`http://localhost:3000/${id}`}
      options={{
        errorCorrectionLevel: "M",
        type: "image/png",
        quality: 0.95,
        scale: 4,
        width: 150,
        color: {
          dark: "#333",
          light: "#FFF",
        },
      }}
    />
  );
};
