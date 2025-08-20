import type { EditVisitModalProps } from "./index.model";

export const EditVisitModal = ({ employees, modal }: EditVisitModalProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Edit appointment</h2>
      <div className="mb-5 w-md flex flex-col items-start gap-3">
        <p>
          Employee: {employees.find((e) => e.id === modal.employeeId)?.name}
        </p>

        <p>Time: {modal.time}</p>

        <label>Notes: </label>
        <textarea className="p-2 bg-pink-100 border caret-pink-500 focus:outline-pink-500 rounded resize-none w-full"></textarea>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Save changes
      </button>
      <button className="ml-3 bg-gray-300 text-black px-4 py-2 rounded cursor-pointer">
        Delete
      </button>
    </>
  );
};
