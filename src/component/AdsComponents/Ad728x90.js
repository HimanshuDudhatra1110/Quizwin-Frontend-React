import React, { useEffect } from "react";

const Ad728x90 = () => {
  useEffect(() => {
    const cachebuster = Math.round(new Date().getTime() / 1000);
    const script = document.createElement("script");
    script.src = `//mahimeta.com/networks/tag.js?cache=${cachebuster}`;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="ad-container">
      <ins
        className="adsbymahimeta"
        id="mMTag_Responsive_14601943"
        data-size="Responsive"
        data-desktop="728x90"
        data-tablet="728x90"
        data-mobile="336x280"
        style={{ display: "inline-block" }}
      />
    </div>
  );
};

export default Ad728x90;
