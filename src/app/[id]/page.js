"use client";
import { useSearchParams, usePathname, useParams } from "next/navigation";
import MainScreen from "../components/MainScreen";

const QNoteScreen = () => {
  // URLのパラメーターを取得
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  // URLのパスを取得
  const pathname = usePathname();

  // 動的ルーティングのパラメータを取得
  const params = useParams();

  return <MainScreen id={params.id} />;
};

export default QNoteScreen;
