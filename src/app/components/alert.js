export const Alert = () => {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        backgroundColor: "#FFF",
        maxWidth: "500px",
        padding: "92px",
        borderRadius: "5px",
      }}
    >
      <h1>保存されました。</h1>
      <p>３秒後、自動的に閉じます</p>
    </div>
  );
};
