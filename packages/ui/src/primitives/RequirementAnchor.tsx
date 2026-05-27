export function RequirementAnchor({
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className="font-semibold cursor-pointer text-brand-primary"
    >
      {children}
    </span>
  );
}
