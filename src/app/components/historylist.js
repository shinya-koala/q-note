import React, { useEffect, useState, useCallback } from "react";
import { styled } from "@mui/system";
import { ListItem } from "@mui/material";
import { HistoryListItem } from "./historyListItem";

const StyledListItem = styled(ListItem)(({ theme }) => ({}));

const localStorageKey = "histories";

export const HistoryList = ({ id }) => {
  const [domain, setDomain] = useState();
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // データがなければ新規作成
    if (!localStorage.hasOwnProperty(localStorageKey)) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify([{ id: id, title: id }])
      );
    }

    // ローカルストレージからデータを取得
    let _historyData = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    if (_historyData.length !== 0) {
      // 既存のデータを削除
      _historyData = _historyData.filter((dataArray) => dataArray.id !== id);
      // 新規追加
      _historyData.push({ id: id, title: id });
      // 更新
      setHistoryData(_historyData);
    }

    if (window && window.location) {
      const url = new URL(window.location.href); // 現在のドメインを取得
      url.searchParams.delete("referrer"); // リファラー情報削除
      setDomain(url.origin);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // useEffectを使用してクライアントサイドでのみ実行

  // ローカルストレージ更新
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(historyData));
  }, [historyData]);

  const onAcceptDelete = useCallback(
    (id) => {
      // 削除処理
      setHistoryData(historyData.filter((item) => item.id !== id));
    },
    [historyData]
  );

  return historyData
    .map((dataArray) => (
      <StyledListItem key={dataArray.id}>
        <HistoryListItem
          key={dataArray.id}
          domain={domain}
          id={dataArray.id}
          title={dataArray.title}
          onAcceptDelete={onAcceptDelete}
        />
      </StyledListItem>
    ))
    .reverse();
};
