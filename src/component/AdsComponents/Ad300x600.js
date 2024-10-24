import React, { useEffect } from "react";

const Ad300x600 = () => {
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
        id="mMTag_Responsive_77291232"
        data-size="Responsive"
        data-desktop="300x600"
        data-tablet="160x600"
        data-mobile="hide"
        style={{ display: "inline-block" }}
      ></ins>
    </div>
  );
};

export default Ad300x600;
