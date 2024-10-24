import React, { useEffect } from "react";

const Ad300x250 = () => {
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
        id="mMTag_Responsive_57333489"
        data-size="Responsive"
        data-desktop="300x250"
        data-tablet="300x250"
        data-mobile="300x250"
        style={{ display: "inline-block" }}
      />
    </div>
  );
};

export default Ad300x250;
