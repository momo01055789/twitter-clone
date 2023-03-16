export default function Layout({ children }) {
  return (
    <div
      className="mx-auto border-l border-r border-twitterBorder min-h-screen"
      style={{ width: "75vw" }}
    >
      {children}
    </div>
  );
}
