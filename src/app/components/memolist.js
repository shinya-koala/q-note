"use client";

import React, { useCallback, useEffect, useState } from "react";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../components/firebase";
import Link from "next/link";
import { styled } from "@mui/system";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TEXT_DATA_FIELD = "memoText";

// MUI Styles
const StyledDrawer = styled(Drawer)({
  position: "static",
  overflow: "auto",
  maxWidth: "300px",
  width: "100%",
});

const StyledList = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: "300px",
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 40,
  paddingBottom: 40,
  "&:not(:last-of-type)": {
    paddingBottom: "0",
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  cursor: "pointer",
  borderRadius: "4px",
  transition: "background-color .3s ease",
  "&:hover": {
    backgroundColor: "#F9DD3A",
  },
}));

const StyledListItemSec = styled(ListItem)({
  padding: 0,
});

const StyledListItemText = styled(ListItemText)({
  margin: 0,
});

const StyledListItemTextSec = styled(ListItemText)({
  fontSize: 12,
});

const StyledTypography = styled(Typography)({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  maxWidth: "100%",
});

export const MemoList = ({ id, inputText, setShowTextarea, setInputText }) => {
  const [showSidebar, setShowSidebar] = useState(true); // Drawerのスライド

  const getDocFromKey = useCallback(async (key) => {
    const docRef = doc(db, "memo_data", key);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    return result?.[TEXT_DATA_FIELD];
  }, []);

  const _getDoc = useCallback(async () => {
    const result = await getDocFromKey(id);
    if (result === undefined) {
      // なければ新規作成
      await setDoc(doc(db, "memo_data", id), {
        [TEXT_DATA_FIELD]: inputText,
      });
    } else {
      setInputText(result);
    }
  }, [getDocFromKey, id, inputText, setInputText]);

  // **firebaseのルール設定により、5/26日以降は書き込み禁止になる。**
  useEffect(() => {
    _getDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // アップデート保存
  const updateDB = useCallback(async () => {
    const DocsData = doc(db, "memo_data", id);
    await updateDoc(DocsData, {
      [TEXT_DATA_FIELD]: inputText,
    });
    console.log("アップデートしました。");
  }, [inputText, id]);

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
      {/* リストエリア */}
      {showSidebar && (
        <StyledDrawer
          variant="persistent"
          open={showSidebar}
          PaperProps={{
            style: {
              position: "relative",
              overflow: "hidden auto",
              height: "auto",
              backgroundColor: "#E8E8E8",
              padding: "40px 0",
              "@media (maxWidth: 768px)": {
                position: "fixed",
                top: "64px",
              },
            },
          }}
        >
          <Box
            className="qr-code"
            sx={{
              width: "150px",
              height: "150px",
              margin: "0 auto",
              backgroundColor: "#DDD",
            }}
          >
            {/*QRコードが入ってくる*/}
          </Box>
          {/* メモリスト */}
          <StyledList>
            <StyledListItemSec>
              <StyledListItemTextSec secondary="メモリスト" />
            </StyledListItemSec>
            <StyledListItem>
              <StyledListItemText
                primary={<StyledTypography>Menu Item 1</StyledTypography>}
              />
            </StyledListItem>
            <StyledListItem>
              <StyledListItemText
                primary={
                  <StyledTypography>
                    Menu Item 2Menu Item 2Menu Item 2Menu Item 2Menu Item 2Menu
                    Item 2Menu Item 2Menu Item 2Menu Item 2
                  </StyledTypography>
                }
              />
            </StyledListItem>
            <StyledListItem>
              <Link href="./pages/memoId/1">
                <StyledListItemText primary="Menu Item 2" />
              </Link>
            </StyledListItem>
          </StyledList>
          {/* 履歴 */}
          <StyledList>
            <StyledListItemSec>
              <StyledListItemTextSec secondary="履歴" />
            </StyledListItemSec>
            <StyledListItem>
              <Link href="./40fa4056-d2da-4c25-9592-72b9cd139be3">
                <StyledListItemText
                  primary={<StyledTypography>Menu Item 1</StyledTypography>}
                />
              </Link>
            </StyledListItem>
            <StyledListItem>
              <StyledListItemText
                primary={
                  <Link href="./A7zRyxcU8ySgPLv9lWZw">
                    <StyledTypography>
                      Menu Item 2Menu Item 2Menu Item 2Menu Item 2Menu Item
                      2Menu Item 2Menu Item 2Menu Item 2Menu Item 2
                    </StyledTypography>
                  </Link>
                }
              />
            </StyledListItem>
            <StyledListItem>
              <Link href="./pages/memoId/1">
                <StyledListItemText primary="Menu Item 2" />
              </Link>
            </StyledListItem>
          </StyledList>
          {/* ブックマーク */}
          <StyledList>
            <StyledListItemSec>
              <StyledListItemTextSec secondary="ブックマーク" />
            </StyledListItemSec>
            <StyledListItem>
              <StyledListItemText
                primary={<StyledTypography>Menu Item 1</StyledTypography>}
              />
            </StyledListItem>
            <StyledListItem>
              <StyledListItemText
                primary={
                  <StyledTypography>
                    Menu Item 2Menu Item 2Menu Item 2Menu Item 2Menu Item 2Menu
                    Item 2Menu Item 2Menu Item 2Menu Item 2
                  </StyledTypography>
                }
              />
            </StyledListItem>
            <StyledListItem>
              <Link href="./pages/memoId/1">
                <StyledListItemText primary="Menu Item 2" />
              </Link>
            </StyledListItem>
          </StyledList>
          　　　　　　　　　
          {/* デバッグボタン */}
          <Box
            className="buttons-area"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              pr: 3,
              pl: 3,
              textAlign: "center",
            }}
          >
            <Button
              // onClick={() => GetDocFromKey("A7zRyxcU8ySgPLv9lWZw")}
              onClick={_getDoc}
              variant="contained"
              sx={{
                mb: 2,
                width: "100%",
                maxWidth: "104px",
              }}
            >
              読み込み
            </Button>
            <Button
              onClick={updateDB}
              variant="contained"
              sx={{
                width: "100%",
                maxWidth: "104px",
              }}
            >
              保存
            </Button>
          </Box>
          <Box
            className="slider-button"
            sx={{
              display: "none",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              "@media (maxWidth: 768px)": {
                display: "block", // 768px以下で表示
              },
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setShowSidebar(!showSidebar);
                setShowTextarea(true); // Drawerを閉じる時にテキストエリア表示フラグを立てる
              }}
            >
              <ArrowBackIosNewIcon />
            </Button>
          </Box>
        </StyledDrawer>
      )}
    </>
  );
};
