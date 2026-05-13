interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="h-screen grid grid-cols-[auto_1fr] overflow-hidden">
      {children}
    </main>
  );
}
