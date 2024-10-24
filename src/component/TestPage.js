import React from "react";
import TestAd from "./AdsComponents/TestAd";
import Ad300x600 from "./AdsComponents/Ad300x600";
import Ad300x250 from "./AdsComponents/Ad300x250";
import Ad336x280 from "./AdsComponents/Ad336x280";
import Ad728x90 from "./AdsComponents/Ad728x90";
import Ad970x90 from "./AdsComponents/Ad970x90";
import AdInterstitial from "./AdsComponents/AdInterstitial";
import AdFooterSticky from "./AdsComponents/AdFooterSticky";

const TestPage = () => {
  return (
    <>
      <div>TestPage</div>

      <div>Ad</div>

      <TestAd adSlot="3189657814" adFormat="auto" />

      <Ad300x600 />

      <p>Ad 300 x 250</p>
      <Ad300x250 />

      <p>Ad 336 x 280</p>
      <Ad336x280 />

      <p>Ad 728 x 90</p>
      <Ad728x90 />

      <p>Ad 970 x 90</p>
      <Ad970x90 />

      <p>Ad interstitial</p>
      {/* <AdInterstitial /> */}

      <p>Ad footer sticky</p>
      <AdFooterSticky />
    </>
  );
};

export default TestPage;
