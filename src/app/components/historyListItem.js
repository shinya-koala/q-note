import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Box, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";

const StyledListItemText = styled(ListItemText)({
  margin: 0,
});

const StyledTypography = styled(Typography)({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  maxWidth: "179px",
});

export const HistoryListItem = ({ domain, id, title, onAcceptDelete }) => {
  const [deleteAccept, setDeleteAccept] = useState(false);

  useEffect(() => {
    // 履歴を消さなかった場合3秒簿にiconを戻す
    if (deleteAccept) {
      const timeout = setTimeout(() => {
        setDeleteAccept(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [deleteAccept]);

  const onClickDelete = useCallback(() => {
    if (deleteAccept && onAcceptDelete) {
      onAcceptDelete(id);
    }
    setDeleteAccept(!deleteAccept);
  }, [deleteAccept, onAcceptDelete, id]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "Row",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "4px",
          transition: "background-color .3s ease",
          "&:hover": {
            backgroundColor: "#F9DD3A",
          },
        }}
      >
        <Link
          key={id}
          href={`${domain}/${id}`}
          style={{
            cursor: "pointer",
            padding: "0 8px",
          }}
        >
          <StyledListItemText
            primary={<StyledTypography>{title}</StyledTypography>}
          />
        </Link>
      </Box>
      <Box
        onClick={onClickDelete}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          color: "#FFF",
          transition: "background-color .3s ease",
          ":hover": {
            backgroundColor: "#f44336",
          },
        }}
      >
        {deleteAccept ? <CheckIcon /> : <DeleteForeverIcon />}
      </Box>
    </div>
  );
};
