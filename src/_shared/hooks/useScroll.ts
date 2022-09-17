import React, { useEffect } from "react";

export const useScroll = (callbackfn: ()=>void) => {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      Math.floor((document.documentElement.offsetHeight) / 1.5)
    ) {
      callbackfn();
    }
  };
};
