"use client";
import { styled } from "@mui/system";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import { v4 as uuid } from "uuid";
import { db } from "../components/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import MarkdownIt from "markdown-it";

import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextareaAutosize,
} from "@mui/material";

const TEXT_DATA_FIELD = "memoText";

// MUI Styles
const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "orange",
    color: "yellow",
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  height: "100%",
  paddingLeft: 80,
  paddingRight: 80,
}));

const StyledDrawer = styled(Drawer)({
  position: "static",
});

const md = new MarkdownIt();

function Index() {
  const [inputText, setInputText] = useState("");
  const [openEditer, setOpenEditer] = useState(false);
  const inputRef = useRef();

  const htmlText = md.render(inputText); // マークダウン表示部分

  const GetDocFromKey = async (key) => {
    const docRef = doc(db, "memo_data", key);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    setInputText(result?.[TEXT_DATA_FIELD]);
  };

  // ランダムなIDを生成
  const RandomID = uuid();
  console.log(RandomID);

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
      <Box
        sx={{
          display: "flex",
          height: "100vh",
        }}
      >
        {/* DrawerからBoxに変える作業をする */}
        <StyledDrawer
          variant="permanent"
          PaperProps={{
            style: {
              position: "static",
            },
          }}
        >
          <StyledList>
            <StyledListItem button>
              <ListItemText primary="Menu Item 1" />
            </StyledListItem>
            <StyledListItem button>
              <ListItemText primary="Menu Item 2" />
            </StyledListItem>
            {/* Add more menu items as needed */}
            <Box
              sx={{
                position: "absolute",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                pr: 3,
                pl: 3,
                textAlign: "center",
              }}
            >
              <Button
                onClick={() => GetDocFromKey("A7zRyxcU8ySgPLv9lWZw")}
                variant="contained"
                sx={{
                  mb: 2,
                }}
              >
                読み込み
              </Button>
              <Button onClick={updateDB} variant="contained">
                保存
              </Button>
            </Box>
          </StyledList>
        </StyledDrawer>
        <Box
          sx={{
            width: "calc(100vw - 240px)",
            height: "calc(100vh - 56px)",
          }}
        >
          <Box>
            {/* // フォーカスが外れた時に入力と表示を入れ替える */}
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Type something here..."
              style={{
                width: "100%",
                height: "100vh",
                display: openEditer ? "block" : "none",
                overflowY: "scroll",
              }}
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              ref={inputRef}
              onBlur={() => {
                setOpenEditer(false);
              }}
              open={openEditer}
              // disabled={!openEditer}
            />
            {!openEditer && (
              <Box
                sx={{
                  width: "auto",
                  height: "100vh",
                  padding: "0 24px",
                  overflowY: "scroll",
                  display: openEditer ? "none" : "block",
                }}
                dangerouslySetInnerHTML={{ __html: htmlText }}
                onClick={() => {
                  setOpenEditer(true);
                  if (inputRef.current) {
                    setTimeout(() => {
                      inputRef.current.focus();
                    }, "10");
                  }
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Index;
