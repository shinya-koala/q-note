import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../components/firebase";
import { styled } from "@mui/system";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Qrcode } from "./qrcode";
import useMediaQuery from "@mui/material/useMediaQuery";
import { HistoryList } from "./historylist";
import { Alert } from "./alert";

const TEXT_DATA_FIELD = "memoText";

// MUI Styles
const StyledDrawer = styled(Drawer)({
  position: "static",
  overflow: "auto",
  maxWidth: "300px",
  width: "100%",
  height: "100%",
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

const StyledListItemSec = styled(ListItem)({
  padding: 0,
});

const StyledListItemTextSec = styled(ListItemText)({
  fontSize: 12,
});

export const MemoList = ({
  id,
  inputText,
  setInputText,
  showSidebar,
  setShowSidebar,
}) => {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const matchesMd = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const handleAlert = () => {
    // アラートを表示
    setIsShowAlert(true);
    // 3秒後にアラートを非表示
    setTimeout(() => {
      setIsShowAlert(false);
    }, 3000);
  };

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
    <div style={{ position: "relative", maxWidth: "300px", width: "100%" }}>
      {/* アラートエリア */}
      {isShowAlert && (
        <Box
          sx={{
            position: "absolute",
            zIndex: "99999",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(51, 51, 51, 0.7)",
          }}
        >
          <Alert />
        </Box>
      )}
      {/* リストエリア */}
      {showSidebar && (
        <StyledDrawer
          variant="persistent"
          open={showSidebar}
          PaperProps={{
            style: {
              position: matchesMd ? "fixed" : "relative",
              overflow: "hidden auto",
              top: matchesMd ? "64px" : "auto",
              height: "100%",
              backgroundColor: "#E8E8E8",
              padding: "40px 0",
            },
          }}
        >
          {/* QRコード */}
          <Box
            className="qr-code"
            sx={{
              width: "150px",
              height: "150px",
              margin: "0 auto",
              backgroundColor: "#DDD",
            }}
          >
            <Qrcode id={id} />
          </Box>
          {/* メモリスト */}
          {/* 履歴 */}
          <StyledList>
            <StyledListItemSec>
              <StyledListItemTextSec secondary="履歴" />
            </StyledListItemSec>
            <HistoryList id={id} />
          </StyledList>

          {/* ボタン */}
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
              onClick={() => router.push("/")}
              variant="contained"
              sx={{
                mb: 2,
                width: "100%",
                maxWidth: "104px",
              }}
            >
              新規作成
            </Button>
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
              onClick={() => {
                updateDB();
                handleAlert();
              }}
              variant="contained"
              sx={{
                width: "100%",
                maxWidth: "104px",
              }}
            >
              公開
            </Button>
          </Box>
          <Box
            className="slider-button"
            sx={{
              display: matchesMd ? "block" : "none",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            >
              <ArrowBackIosNewIcon />
            </Button>
          </Box>
        </StyledDrawer>
      )}
    </div>
  );
};
