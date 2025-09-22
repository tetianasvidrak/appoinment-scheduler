import { useDraggable } from "@dnd-kit/core";
import type { VisitProps } from "./index.model";

export const Visit = ({ visit, onClick }: VisitProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: visit._id,
  });

  console.log("VISIT", visit);
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
  const totalMinutes = visit.duration;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const totalPrice = visit.services.reduce((acc, curr) => {
    return acc + Number(curr.service.price);
  }, 0);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-[#cbd5e1] bg-[#E6F0FF] text-xs px-2 py-1 shadow rounded w-full relative"
      onClick={onClick}
    >
      <div className="text-sm font-semibold mb-2">
        {visit.time}{" "}
        {hours < 1 ? `(${minutes} min)` : `(${hours} hour ${minutes} min)`}
      </div>

      {visit.services.map(({ service, category }) => {
        console.log("CATEGORY", category);
        // console.log("CATEGORIES", categories);
        // const category = categories.find((c) => c._id === service.categoryId);

        return (
          <p
            key={service._id}
            className="text-sm font-semibold px-2 py-2 rounded mb-1 shadow"
            style={{
              backgroundColor: `${category.displayColor}`,
            }}
          >
            {service.name} ({service.duration} хв)
          </p>
        );
      })}
      <p>{visit.client.name}</p>
      <p className="text-sm">Total: {totalPrice} &euro;</p>

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
