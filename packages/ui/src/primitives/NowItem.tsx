import { LucideIcon } from "lucide-react";

interface NowItemProps {
  icon: LucideIcon;
  title: string;
  content: string;
  iconClassName?: string; // NOTE: This can be used for example to change stroke color
}

export const NowItem = ({
  icon: Icon,
  title,
  content,
  iconClassName = "stroke-brand-subtle",
}: NowItemProps) => {
  return (
    <section className="grid gap-y-2">
      <header className="flex gap-2 items-center">
        <Icon className={iconClassName} />
        {/*<h3 className="text-sm text-content-muted font-display uppercase tracking-wider">*/}
        <h3 className="text-sm text-content-muted uppercase">{title}</h3>
      </header>
      <div className="text-lg leading-relaxed text-content-main">{content}</div>
    </section>
  );
};
