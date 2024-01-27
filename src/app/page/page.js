"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import { db } from "../components/firebase";
import { collection, getDocs } from "firebase/firestore";

function Index() {
  const [text, setText] = useState([]);

  useEffect(() => {
    const dbPosts = async () => {
      const DocsData = await getDocs(collection(db, "memo_data"));
      setText(DocsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    dbPosts();
  }, []);

  return (
    <>
      <div className={styles["memo-wrap"]}>
        <div className={styles["select-area"]}>
          <ul>
            <li>
              <Link href="#">aaa</Link>
            </li>
          </ul>
          <div className={styles["debug-buttons"]}>
            <button>読み込み</button>
            <button>保存</button>
          </div>
        </div>
        <div className={styles["input-area"]}>
          <textarea
            className={styles["input-text"]}
            defaultValue={text[0].test}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default Index;
