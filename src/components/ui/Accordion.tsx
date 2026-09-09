import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({ title, children, defaultOpen }: AccordionItemProps) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b hairline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="label-caps">{title}</span>
        <Plus size={16} strokeWidth={1.25} className={clsx("transition-transform duration-500", open && "rotate-45")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm leading-relaxed text-mute">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items }: { items: { title: string; content: ReactNode; defaultOpen?: boolean }[] }) {
  return (
    <div className="border-t hairline">
      {items.map((item) => (
        <AccordionItem key={item.title} title={item.title} defaultOpen={item.defaultOpen}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
