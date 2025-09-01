// import { services } from "../../data/services";
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

  const totalMinutes = visit.services.reduce(
    (acc, curr) => acc + curr.duration,
    0
  );
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-[#E8F1FF] text-xs px-2 py-1 rounded shadow w-full relative"
      onClick={onClick}
    >
      <div className="text-sx font-semibold">
        {visit.time} ({hours} hour {minutes} min)
      </div>
      {visit.services.map((service) => (
        <p key={service.id} className="text-xs font-semibold">
          {service.name} ({service.duration}хв)
        </p>
      ))}
      <p>
        Загальний час : {hours} год {minutes} хв
      </p>

      <div
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 px-1 py-0.5 bg-white text-blue-600 text-[10px] rounded-bl cursor-grab"
      >
        ⠿
      </div>
    </div>
  );
};
