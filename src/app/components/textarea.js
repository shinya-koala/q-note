import React, { useRef, useState } from "react";
import { Box, Button, TextareaAutosize } from "@mui/material";
import MarkdownIt from "markdown-it";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const md = new MarkdownIt();

export const Textarea = ({
  showTextarea,
  showSidebar,
  setShowSidebar,
  inputText,
  setInputText,
}) => {
  const [openEditer, setOpenEditer] = useState(false);
  const inputRef = useRef();

  const htmlText = md.render(inputText); // マークダウン表示部分

  return (
    <>
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
          "@media (maxWidth: 768px)": {
            marginTop: "36px",
          },
        }}
      >
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
          transform: "translateX(0)",
          "@media (maxWidth: 768px)": {
            display: "block", // 768px以下で表示
          },
        }}
      >
        <Button variant="contained">
          <ArrowForwardIosIcon style={{ color: "#FFF" }} />
        </Button>
      </Box>
    </>
  );
};
