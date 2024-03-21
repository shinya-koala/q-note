import React, { useEffect, useState } from "react";
import { useQRCode } from "next-qrcode";

export const Qrcode = ({ id }) => {
  const { Canvas } = useQRCode();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("referrer");
      setUrl(currentUrl);
    }
  }, []);

  return (
    <Canvas
      text={`${url?.origin ?? ""}/${id}`}
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
