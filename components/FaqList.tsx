import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-lg border border-line bg-white p-5 shadow-card"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left font-medium text-ink">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-slate-400 transition group-open:rotate-180"
              size={20}
            />
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
