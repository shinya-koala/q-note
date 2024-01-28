"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import { db } from "../components/firebase";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";

const TEXT_DATA_FIELD = "memoText";

function Index() {
  const [inputText, setInputText] = useState("");

  const GetDocFromKey = async (key) => {
    const docRef = doc(db, "memo_data", key);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setInputText(result?.[TEXT_DATA_FIELD]);
  };

  useEffect(() => {
    GetDocFromKey("A7zRyxcU8ySgPLv9lWZw");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // アップデート保存
  const updateDB = useCallback(async () => {
    const DocsData = doc(db, "memo_data", "A7zRyxcU8ySgPLv9lWZw");
    await updateDoc(DocsData, {
      [TEXT_DATA_FIELD]: inputText,
    });
  }, [inputText]);

  useEffect(() => {
    // ctrl + sで保存
    const handleSaveShortcut = async (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        await updateDB();
        console.log("保存しました。");
      }
    };
    document.addEventListener("keydown", handleSaveShortcut);
    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [updateDB]);

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
            <button onClick={() => GetDocFromKey("A7zRyxcU8ySgPLv9lWZw")}>
              読み込み
            </button>
            <button onClick={updateDB}>保存</button>
          </div>
        </div>
        <div className={styles["input-area"]}>
          <textarea
            className={styles["input-text"]}
            // defaultValue={inputText}
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default Index;
