import React, { useEffect } from "react";

const AdFooterSticky = () => {
  useEffect(() => {
    const cachebuster = Math.round(new Date().getTime() / 1000);
    const script = document.createElement("script");
    script.src = `//mahimeta.com/networks/tag.js?cache=${cachebuster}`;
    document.head.appendChild(script);
  }, []);

  return (
    <ins
      className="adsbymahimeta"
      id="mMTag_Responsive_34587167"
      data-placement="floating"
      data-size="Responsive"
      data-desktop="970x90"
      data-tablet="728x90"
      data-mobile="320x100"
      style={{ display: "inline-block" }}
    />
  );
};

export default AdFooterSticky;
