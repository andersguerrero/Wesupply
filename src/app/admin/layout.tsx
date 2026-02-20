export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-[#f5f5f5]"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
