"use client";

import { usePathname, useRouter } from "next/navigation";
import { activeStyle, contents } from "./lib/data";
import styles from "./music.module.css";
import Content from "./lib/Content";
import { useEffect, useState } from "react";
import NoSSR from "../divdivdiv/NoSSR";

export default function Page() {
  const router = useRouter();
  const pathName = "";
  const fullPathName = usePathname();
  const [currentCategory, setCurrentCategory] = useState<string>("");

  return (
    <div className={styles["container"]}>
      <div className={styles["category-container"]}>
        {Object.keys(contents).map((category, index) => {
          return (
            <div
              key={category}
              className={styles["category"]}
              onClick={() => {
                router.push(`/music/${category}`);
              }}
              style={pathName === category ? activeStyle : {}}
            >
              {contents[category]}
            </div>
          );
        })}
      </div>
      <div className={styles["content-container"]}>
        <Content pathName={pathName} fullPathName={fullPathName} />
      </div>
    </div>
  );
}
