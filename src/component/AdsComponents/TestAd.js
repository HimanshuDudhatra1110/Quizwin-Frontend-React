import React, { useEffect } from "react";

const TestAd = ({ adSlot, adFormat }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error loading ad:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-2203630319493333"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    ></ins>
  );
};

export default TestAd;
