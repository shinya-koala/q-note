"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import { Header } from "../components/header";
import { Textarea } from "../components/textarea";
import { MemoList } from "../components/memolist";

function MainScreen({ id }) {
  const [inputText, setInputText] = useState("");
  const [showSidebar, setShowSidebar] = useState(true); // Drawerのスライド
  const [showTextarea, setShowTextarea] = useState(false); // テキストエリアの表示領域100%

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="Q-note" />
        <meta name="description" content="This is my portfolio page." />
        <meta name="keywords" content="Next.js, JavaScript, React, QRcode" />
        <link rel="canonical" href="https://example.com/q-note" />
        {/* <link rel="icon" href="https://example.com/favicon.ico" /> */}
      </Head>
      {/* Headerエリア */}
      <Header />

      <Box
        className="content-wrap"
        sx={{
          display: "flex",
          width: "100%",
          height: "calc(100vh - 64px)",
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* リストエリア */}
        <MemoList
          id={id}
          inputText={inputText}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          setShowTextarea={setShowTextarea}
          setInputText={setInputText}
        />
        {/* テキストエリア */}
        <Textarea
          showTextarea={showTextarea}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          inputText={inputText}
          setInputText={setInputText}
        />
      </Box>
    </>
  );
}

export default MainScreen;
