import type { VisitProps } from "./index.model";
import { useDraggable } from "@dnd-kit/core";

export const Visit = ({ visit, onClick }: VisitProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: visit.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    height: `calc(${(visit.duration / 15) * 3}rem - 20px)`,
    marginTop: "10px",
    width: "95%",
    zIndex: 1,
    cursor: "pointer",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-blue-600 text-white text-xs px-2 py-1 rounded shadow w-full text-center relative"
      onClick={onClick}
    >
      <div className="text-sm font-semibold">
        {visit.time} ({visit.duration}хв)
      </div>

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()} // не передає клік візиту
        className="absolute top-0 right-0 px-1 py-0.5 bg-white text-blue-600 text-[10px] rounded-bl cursor-grab"
      >
        ⠿
      </div>
    </div>
  );
};
