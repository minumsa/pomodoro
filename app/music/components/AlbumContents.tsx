import { AlbumPanel } from "./AlbumPanel";
import styles from "../music.module.css";
import { AlbumInfo } from "../modules/types";
import { SUB_PER_PAGE_COUNT } from "../modules/constants";

interface AlbumContentsProps {
  artistData: AlbumInfo[];
}

export const AlbumContents = ({ artistData }: AlbumContentsProps) => {
  return artistData.map((item, index) => {
    const itemIndex = index + 1;
    const isLastData = index === artistData.length - 1;
    const isLastDataPerPage = itemIndex % SUB_PER_PAGE_COUNT === 0;

    return (
      <article
        key={index}
        className={styles["album-container"]}
        style={
          isLastDataPerPage || isLastData
            ? undefined
            : { borderBottom: "1px solid var(--border-color)" }
        }
      >
        <AlbumPanel albumData={item} />
      </article>
    );
  });
};
