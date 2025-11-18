import { useDraggable } from "@dnd-kit/core";
import type { VisitProps } from "./index.model";
import EventNoteIcon from "@mui/icons-material/EventNote";

export const Visit = ({ visit, onClick }: VisitProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: visit._id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    height: `calc(${(visit.duration / 15) * 2.5}rem - 20px)`,
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
      className="flex flex-col gap-3 border-2 border-[#a6c4e8] bg-[#E6F0FF] text-xs shadow rounded w-full relative"
      onClick={onClick}
    >
      <div className="bg-[#a6c4e8] text-sm font-bold px-2 py-0.5">
        {visit.time}{" "}
        {hours < 1 ? `(${minutes} min)` : `(${hours} hour ${minutes} min)`}
      </div>
      <div className="px-2">
        <div>
          {visit.services.map(({ service, category }) => {
            // console.log("CATEGORIES", categories);
            // const category = categories.find((c) => c._id === service.categoryId);

            return (
              <p
                key={service._id}
                className="text-sm font-semibold px-2 py-1 rounded-2xl mb-2 shadow"
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
  );
};
