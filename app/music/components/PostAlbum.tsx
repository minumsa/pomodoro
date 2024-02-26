import styles from "../music.module.css";
import { AlbumInfo } from "../modules/data";
import { Loading } from "./Loading";
import { PostAlbumMetadata } from "./PostAlbumMetadata";
import { PostText } from "./PostAlbumText";

interface AlbumProps {
  albumData: AlbumInfo;
}

export const PostAlbum = ({ albumData }: AlbumProps) => {
  return (
    <section className={styles["album-container"]}>
      <PostAlbumMetadata albumData={albumData} />
      <PostText albumData={albumData} />
    </section>
  );
};
