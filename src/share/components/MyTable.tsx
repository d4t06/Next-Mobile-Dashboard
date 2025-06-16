import type { ReactNode } from "react";

type Props = {
  colList: string[];
  className?: string;
  children: ReactNode;
};

export default function MyTable({ colList, className = "", children }: Props) {
  return (
    <div className={`rounded-md overflow-hidden ${className}`}>
      <table className="w-full [&_td]:text-sm hover:[&_tr]:bg-black/5 [&_tbody_tr]:border-t [&_tr]:border-black/10 [&_th]:text-sm [&_th]:text-left [&_td]:p-2 [&_th]:p-2">
        <thead className="bg-[#cd1818] text-white font-medium">
          <tr>
            {colList.map((i) => (
              <th key={i}>{i}</th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
