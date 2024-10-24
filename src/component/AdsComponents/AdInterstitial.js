import React, { useEffect } from "react";

const AdInterstitial = () => {
  useEffect(() => {
    const cachebuster = Math.round(new Date().getTime() / 1000);
    const script = document.createElement("script");
    script.src = `//mahimeta.com/networks/tag.js?cache=${cachebuster}`;
    document.head.appendChild(script);
  }, []);

  return (
    <ins
      className="adsbymahimeta"
      id="mMTag_Responsive_85853953"
      data-placement="interstitial"
      data-size="Responsive"
    />
  );
};

export default AdInterstitial;
