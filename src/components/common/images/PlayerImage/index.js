import usePlaceHolderSource from "hooks/usePlaceholderSource";

import PlaceholderImage from "public/images/player-placeholder.png";

import styles from "./PlayerImage.module.css";

const PlayerImage = ({ player, ...rest }) => {
  const { src, loaded: loadedImage } = usePlaceHolderSource({
    src:
      player &&
      `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player?.personId}.png`,
    placeHolderSrc: PlaceholderImage,
  });
  return (
    <img
      src={src}
      alt={`${player?.temporaryDisplayName}`}
      className={`${styles.image} ${
        loadedImage ? "" : styles.placeholderImage
      }`}
      loading="lazy"
      {...rest}
    />
  );
};

export default PlayerImage;
