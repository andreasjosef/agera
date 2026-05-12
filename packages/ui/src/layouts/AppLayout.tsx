interface AppLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function AppLayout({ sidebar, children }: AppLayoutProps) {
  return (
    <main className="h-screen grid grid-cols-[auto_1fr] overflow-hidden">
      <aside>{sidebar}</aside>
      <div className="p-4">{children}</div>
    </main>
  );
}
