import { useRouter } from "next/navigation";
import styles from "./tagdisplay.module.css";
import { defaultTags } from "../modules/data";
import { useState } from "react";

export const TagDisplay = () => {
  const router = useRouter();
  const [showAllTagItems, setShowAllTagItems] = useState<boolean>(false);

  const colors = ["#A5494F", "#AD7E48", "#A7A15A", "#48864D", "#4A57BA", "#5F388B"];

  return (
    <div
      className={styles["tag-display-container"]}
      style={showAllTagItems ? { flexWrap: "wrap", paddingRight: "31px" } : { flexWrap: "nowrap" }}
    >
      {Object.values(defaultTags).map((tag, index) => (
        <div
          key={index}
          className={styles["tag-display-item"]}
          onClick={() => {
            router.push("/music/pop");
          }}
        >
          {tag}
        </div>
      ))}
      <div
        className={styles["arrow-down-container"]}
        onClick={() => {
          setShowAllTagItems(!showAllTagItems);
        }}
      >
        <img
          className={styles["arrow-down"]}
          src={showAllTagItems ? "/music/arrow-up.svg" : "/music/arrow-down.svg"}
          alt="arrow-down"
        />
      </div>
    </div>
  );
};
