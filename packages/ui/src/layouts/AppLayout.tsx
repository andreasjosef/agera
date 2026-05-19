interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="h-screen grid md:grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-hidden">
      {children}
    </main>
  );
}
