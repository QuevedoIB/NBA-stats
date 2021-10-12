import { useState, useEffect } from "react";

export default function usePlaceHolderSource({ src, placeHolderSrc }) {
  const [imageSource, setImageSource] = useState({
    src: placeHolderSrc,
    loaded: false,
  });

  useEffect(() => {
    const downloadingImage = new window.Image();
    downloadingImage.onload = function () {
      setImageSource({ src: this.src, loaded: true });
    };
    downloadingImage.src = src;
  }, [src]);

  return imageSource;
}
