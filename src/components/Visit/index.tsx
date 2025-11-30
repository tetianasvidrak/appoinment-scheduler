import { useDraggable } from "@dnd-kit/core";
import type { VisitProps } from "./index.model";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { TooltipVisit } from "../TooltipVisit";
import { useRef, useState } from "react";

export const Visit = ({ visit, onClick }: VisitProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: visit._id,
  });
  const ref = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const combinedRef = (node: HTMLDivElement | null) => {
    setNodeRef(node); // реф для dnd-kit
    ref.current = node; // реф для tooltip
  };

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    height: `calc(${(visit.duration / 15) * 2.5}rem - 20px)`,
    minHeight: "1.5rem",
    marginTop: "10px",
    width: "95%",
    zIndex: 1,
    cursor: "pointer",
  };
  const totalMinutes = visit.duration;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const totalPrice = visit.services.reduce((acc, curr) => {
    return acc + Number(curr.service.price);
  }, 0);

  const shouldShowTooltip = visit.duration < 60 && showTooltip;

  return (
    <>
      <div
        ref={combinedRef}
        style={style}
        onMouseEnter={() => visit.duration < 60 && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex flex-col gap-3 border-2 border-[#53b35b] bg-[#c2e5c5] text-xs shadow rounded w-full relative ${
          visit.duration < 60 ? "truncate" : ""
        } `}
        // className={`flex flex-col gap-3 border-2 border-[#a6c4e8] bg-[#E6F0FF] text-xs shadow rounded w-full relative ${
        //   visit.duration < 60 ? "truncate" : ""
        // } `}
        onClick={onClick}
      >
        <div className="bg-[#53b35b] text-sm font-bold px-2 py-0.5">
          {/* <div className="bg-[#a6c4e8] text-sm font-bold px-2 py-0.5"> */}
          {visit.time}{" "}
          {hours < 1 ? `(${minutes} min)` : `(${hours} hour ${minutes} min)`}
        </div>
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

        <div
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-0 right-0 px-1 py-0.5 bg-white text-blue-600 text-[10px] rounded-bl cursor-grab"
        >
          ⠿
        </div>
      </div>
      {shouldShowTooltip && (
        <TooltipVisit targetRef={ref} visit={visit} totalPrice={totalPrice} />
      )}
    </>
  );
};
