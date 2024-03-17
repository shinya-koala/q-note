import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const Header = () => {
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
          {/* ログインボタン */}
          {/* <Box
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
              ユーザーボタン切り替え
              <Button variant="text">ログイン</Button>
              <Box className="arrow-icon" component="span">
                <KeyboardArrowDownIcon />
              </Box>
            </Link>
          </Box> 
          */}
        </Toolbar>
      </AppBar>
    </>
  );
};
