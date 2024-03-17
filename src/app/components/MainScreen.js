"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/system";
import MarkdownIt from "markdown-it";
import { db } from "../components/firebase";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextareaAutosize,
  Toolbar,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Head from "next/head";
import Image from "next/image";

const TEXT_DATA_FIELD = "memoText";

// MUI Styles
const StyledDrawer = styled(Drawer)({
  position: "static",
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

const md = new MarkdownIt();

function MainScreen({ id }) {
  const [inputText, setInputText] = useState("");
  const [openEditer, setOpenEditer] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true); // Drawerのスライド
  const [showTextarea, setShowTextarea] = useState(false); // テキストエリアの表示領域100%
  const inputRef = useRef();

  const GetDocFromKey = async (key) => {
    const docRef = doc(db, "memo_data", key);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    return result?.[TEXT_DATA_FIELD];
  };

  // **firebaseのルール設定により、5/26日以降は書き込み禁止になる。**
  useEffect(() => {
    const getDoc = async () => {
      const result = await GetDocFromKey(id);
      if (result === undefined) {
        await setDoc(doc(db, "memo_data", id), {
          [TEXT_DATA_FIELD]: inputText,
        });
      } else {
        setInputText(result);
      }
    };
    getDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // アップデート保存
  const updateDB = useCallback(async () => {
    const DocsData = doc(db, "memo_data", id);
    await updateDoc(DocsData, {
      [TEXT_DATA_FIELD]: inputText,
    });
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

  const htmlText = md.render(inputText); // マークダウン表示部分
  return (
    <>
      {/* Headerエリア */}
      <AppBar
        position="relative"
        sx={{
          zIndex: 9999,
          backgroundColor: "#FFF",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "64px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h1" component="div">
            <Image
              src="logo-bk.svg"
              width="334"
              height="125"
              alt="Logo"
              style={{
                width: "10vw",
                minWidth: "75px",
                maxWidth: "140px",
                height: "auto",
              }}
            />
          </Typography>
          <Box
            className="user-area"
            sx={{
              textAlign: "center",
            }}
          >
            <Link
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              {/* ユーザーボタン切り替え */}
              <Button variant="text">ログイン</Button>
              <Box className="arrow-icon" component="span">
                <KeyboardArrowDownIcon />
              </Box>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* リストエリア */}
      <Box
        className="content-wrap"
        sx={{
          display: "flex",
          width: "100%",
          height: "calc(100vh - 64px)",
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out",
          //  transform: showSidebar ? "translateX(0)" : "translateX(-300px)",
        }}
      >
        {showSidebar && (
          <StyledDrawer
            variant="persistent"
            open={showSidebar}
            PaperProps={{
              style: {
                position: "relative",
                overflow: "hidden auto",
                backgroundColor: "#E8E8E8",
                padding: "40px 0",
                "@media (max-width: 768px)": {
                  display: showSidebar ? "block" : "",
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
                      Menu Item 2Menu Item 2Menu Item 2Menu Item 2Menu Item
                      2Menu Item 2Menu Item 2Menu Item 2Menu Item 2
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
                <StyledListItemText
                  primary={<StyledTypography>Menu Item 1</StyledTypography>}
                />
              </StyledListItem>
              <StyledListItem>
                <StyledListItemText
                  primary={
                    <StyledTypography>
                      Menu Item 2Menu Item 2Menu Item 2Menu Item 2Menu Item
                      2Menu Item 2Menu Item 2Menu Item 2Menu Item 2
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
                      Menu Item 2Menu Item 2Menu Item 2Menu Item 2Menu Item
                      2Menu Item 2Menu Item 2Menu Item 2Menu Item 2
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
                onClick={() => GetDocFromKey("A7zRyxcU8ySgPLv9lWZw")}
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
                "@media (max-width: 768px)": {
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
        {/* テキストエリア */}
        <Box
          className="textArea-wrap"
          sx={{
            position: "relative",
            width: showSidebar ? "calc(100% - 300px)" : "100%",
            height: "100vh",
            position: "relative",
            transition: "width 0.3s ease-in-out",
            // テキストエリアの拡大表示
            ...(showTextarea && {
              width: "100%",
              left: 0, // 必要に応じて調整
              top: 0, // 必要に応じて調整
              zIndex: 1000, // 上に重ねる場合
            }),
            "@media (max-width: 768px)": {
              marginTop: "36px",
            },
          }}
        >
          {/* drawerのスライドボタン
          <Box
            className="slider-buttom"
            sx={{
              display: "none",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              "@media (max-width: 768px)": {
                display: "block", // 768px以下で表示
              },
            }}
          >
            <Button
              variant={showSidebar ? "outlined" : "contained"}
              onClick={() => setShowSidebar(!showSidebar)}
              sx={{
                minWidth: "32px",
                height: "100vh",
                padding: "68px 8px",
              }}
            >
              {showSidebar ? (
                <ArrowBackIosNewIcon />
              ) : (
                <ArrowForwardIosIcon style={{ color: "#FFF" }} />
              )}
            </Button>
          </Box> */}
          {/* // フォーカスが外れた時に入力と表示を入れ替える */}
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="テキストを入力してください。"
            style={{
              width: "100%",
              height: "100vh",
              display: openEditer ? "block" : "none",
              overflow: "visible scroll",
            }}
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            ref={inputRef}
            onBlur={() => {
              setOpenEditer(false);
            }}
            open={openEditer}
          />
          {!openEditer && (
            <Box
              sx={{
                width: "auto",
                height: "100vh",
                padding: "0 24px",
                overflow: "visible scroll",
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
        {/* menuを閉じるスイッチ */}
        <Box
          className="close-menu-button"
          onClick={() => setShowSidebar(!showSidebar)}
          sx={{
            display: "none",
            position: "absolute",
            left: 0,
            ransition: "transform 0.5s ease-in-out",
            transform: showSidebar ? "translateX(-300px)" : "translateX(0)",
            "@media (max-width: 768px)": {
              display: "block", // 768px以下で表示
            },
          }}
        >
          <Button variant="contained">
            <ArrowForwardIosIcon style={{ color: "#FFF" }} />
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default MainScreen;
