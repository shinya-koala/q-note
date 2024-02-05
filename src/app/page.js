"use client";

import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";

function Index() {
  const router = useRouter();
  // ランダムなIDを生成
  useEffect(() => {
    const RandomID = uuid();
    router.push(RandomID);
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </>
  );
}

export default Index;
