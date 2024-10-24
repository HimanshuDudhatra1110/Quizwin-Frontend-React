import React, { useEffect } from "react";

const Ad336x280 = () => {
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
        id="mMTag_Responsive_55036086"
        data-size="Responsive"
        data-desktop="336x280"
        data-tablet="336x280"
        data-mobile="336x280"
        style={{ display: "inline-block" }}
      />
    </div>
  );
};

export default Ad336x280;
