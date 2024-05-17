export default function Sidebar() {
  function handleDragStart(event) {
    event.dataTransfer.setData("application/reactflow", "add-node");
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <aside className="border-l-2 w-[400px] grid grid-cols-2 gap-3 p-3">
      <div
        onDragStart={handleDragStart}
        draggable
        className={`border cursor-grab bg-white border-blue-400 rounded h-[100px] flex justify-center items-center text-blue-400`}
      >
        Message
      </div>
    </aside>
  );
}
