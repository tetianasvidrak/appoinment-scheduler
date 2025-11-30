import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { TooltipVisitProps } from "./index.model";
import EventNoteIcon from "@mui/icons-material/EventNote";

export const TooltipVisit = ({
  visit,
  totalPrice,
  targetRef,
  offset = 8,
}: TooltipVisitProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  //   const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!targetRef.current) return;

    const rect = targetRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + offset,
      left: rect.left + rect.width / 2,
    });

    const handleScroll = () => {
      const rect = targetRef.current!.getBoundingClientRect();
      setPos({ top: rect.bottom + offset, left: rect.left + rect.width / 2 });
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [targetRef, offset]);

  if (!pos) return null;

  return createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "rgb(194, 229, 197)",
        color: "black",
        padding: "10px",
        borderRadius: "6px",
        fontSize: "12px",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        opacity: 1,
        transition: "opacity 0.15s ease-out",
      }}
    >
      <div className="px-2">
        <div>
          {visit.services.map(({ service, category }) => {
            return (
              <p
                key={service._id}
                className="inline-block text-sm font-semibold px-2 py-0.5 rounded-2xl mb-2 shadow"
                style={{
                  backgroundColor: `${category.displayColor}`,
                }}
              >
                {service.name} ({service.duration} хв)
              </p>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">{visit.client.name}</p>
          <p className="text-base font-bold">Total: {totalPrice} &euro;</p>
          {visit.note && (
            <div className="flex items-center gap-1">
              <EventNoteIcon fontSize="small" />
              <p className="italic">{visit.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
