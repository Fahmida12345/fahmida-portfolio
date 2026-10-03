import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/cn";

export function TimelineItem({ item, index = 0, isLast = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.5,
        delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.3),
      }}
      className="relative grid grid-cols-[auto_1fr] gap-x-4 pb-8 last:pb-0 sm:gap-x-6"
    >
      <div className="relative flex flex-col items-center">
        <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-surface font-mono text-[11px] font-medium text-accent">
          {item.stage}
        </span>
        {!isLast ? (
          <span
            aria-hidden="true"
            className="absolute top-9 h-[calc(100%-2.25rem)] w-px bg-gradient-to-b from-accent/45 via-line to-line"
          />
        ) : null}
      </div>

      <div className="pt-1.5">
        <h3 className="text-base leading-snug sm:text-[17px]">{item.title}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
          {item.text}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {item.keywords.map((keyword) => (
            <li
              key={keyword}
              className={cn(
                "rounded-lg border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted",
              )}
            >
              {keyword}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
