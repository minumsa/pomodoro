import { AlbumInfo } from "../modules/data";
import styles from "../music.module.css";

interface ArtistPageImageProps {
  data: AlbumInfo[];
}

export const ArtistPageImage = ({ data }: ArtistPageImageProps) => {
  return (
    data?.length > 0 && (
      <div className={styles["artist-page-image-container"]}>
        <div className={styles["artist-page-image"]}>
          <img
            className={styles["category-meta-image"]}
            src={data[0].artistImgUrl}
            alt={data[0].artist}
            loading="lazy"
          />
        </div>
        <div
          className={styles["artist-page-title"]}
          style={{ marginTop: "10px", cursor: "default" }}
        >
          {data[0].artist}
        </div>
      </div>
    )
  );
};
