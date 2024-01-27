"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import { db } from "../components/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const TEXT_DATA_FIELD = "memoText";

function Index() {
  const [text, setText] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // DB取得
    const dbPosts = async () => {
      const DocsData = await getDocs(collection(db, "memo_data"));
      setText(DocsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    dbPosts();
  }, []);

  const updateDB = async () => {
    const DocsData = doc(db, "memo_data", "A7zRyxcU8ySgPLv9lWZw");
    await updateDoc(DocsData, {
      [TEXT_DATA_FIELD]: inputText,
    });
  };

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
            <button onClick={updateDB}>保存</button>
          </div>
        </div>
        <div className={styles["input-area"]}>
          <textarea
            className={styles["input-text"]}
            defaultValue={text[0] && text[0][TEXT_DATA_FIELD]}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default Index;
