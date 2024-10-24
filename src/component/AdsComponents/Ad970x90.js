import React, { useEffect } from "react";

const Ad970x90 = () => {
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
        id="mMTag_Responsive_88711598"
        data-size="Responsive"
        data-desktop="970x90"
        data-tablet="728x90"
        data-mobile="336x280"
        style={{ display: "inline-block" }}
      />
    </div>
  );
};

export default Ad970x90;
