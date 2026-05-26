interface MobileNavMenuProps {
  navLinks?: React.ReactNode;
}

export function MobileNavMenu({ navLinks }: MobileNavMenuProps) {
  return (
    <div className="border-t border-cod-gray-300 p-4 bg-app-surface grid @container">
      <nav>
        <ul className="flex justify-around">{navLinks}</ul>
      </nav>
    </div>
  );
}
