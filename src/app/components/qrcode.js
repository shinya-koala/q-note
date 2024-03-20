import React from "react";
import { useQRCode } from "next-qrcode";

export const Qrcode = ({ id }) => {
  const { Canvas } = useQRCode();
  const url = new URL(window.location.href); // 現在のドメインを取得
  url.searchParams.delete("referrer"); // リファラー情報削除

  return (
    <Canvas
      // 本番URLに切り替える
      text={`${url.origin}/${id}`}
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
