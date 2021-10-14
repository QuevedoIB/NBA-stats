import { useState, useEffect } from "react";

export default function usePlaceHolderSource({ src, placeHolderSrc }) {
  const [imageSource, setImageSource] = useState({
    src: placeHolderSrc,
    loaded: false,
  });

  useEffect(() => {
    if (!src && imageSource.loaded) {
      return setImageSource({ loaded: false, src: placeHolderSrc });
    }
    const downloadingImage = new window.Image();
    downloadingImage.onload = function () {
      setImageSource({ src: this.src, loaded: true });
    };
    downloadingImage.src = src;
  }, [imageSource.loaded, placeHolderSrc, src]);

  return imageSource;
}
