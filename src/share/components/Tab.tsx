import type { ReactNode } from "react";
import Button from "./Button";

type Props<T> = {
  setTab: (v: T) => void;
  tab: T;
  tabs: readonly T[];
  render: (item: T) => ReactNode;
  className?: string;
};

export default function Tab<T>({
  setTab,
  render,
  tab,
  tabs,
  className = "",
}: Props<T>) {
  return (
    <div className={`inline-flex space-x-1 ${className}`}>
      {tabs.map((t, i) => (
        <Button
          key={i}
          onClick={(e) => {
            setTab(t);
            (e.target as HTMLButtonElement).blur();
          }}
          colors={t === tab ? "primary" : "second"}
          size={"clear"}
          className={`px-3 py-1`}
        >
          {render(t)}
        </Button>
      ))}
    </div>
  );
}
