import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useOnSelectionChange, useReactFlow } from "reactflow";

const nodeTypes = [
  {
    type: "text-node",
    label: "Message",
  },
];

export default function Sidebar() {
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState(null);
  const inputRef = useRef();
  const { id, data } = selectedNode || {};

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length > 0) setSelectedNode(nodes[0]);
      else setSelectedNode(null);
    },
  });

  function handleChange(event) {
    const { name, value } = event.target;

    const updatedNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        [name]: value,
      },
    };

    setSelectedNode(updatedNode);

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return updatedNode;
        }
        return node;
      })
    );
  }

  function handleDragStart(event, type) {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  }

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [selectedNode]);

  return (
    <aside className="border-l-2 w-[400px]">
      {!selectedNode && (
        <div className="grid grid-cols-2 gap-3 p-3">
          {nodeTypes.map(({ type, label }) => (
            <div
              key={type}
              onDragStart={(e) => handleDragStart(e, type)}
              draggable
              className={`border cursor-grab bg-white border-blue-400 rounded h-[100px] flex flex-col justify-center items-center text-blue-400 p-3`}
            >
              <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
              {label}
            </div>
          ))}
        </div>
      )}
      {selectedNode && (
        <>
          <div className="flex items-center border-b-2 p-2">
            <button>
              <ArrowLeftIcon className="size-5" />
            </button>
            <p className="flex-1 text-center">Message</p>
          </div>
          <div className="px-3 py-6 border-b-2">
            <div className="flex flex-col gap-y-2 ">
              <label htmlFor={`label-${id}`} className="text-gray-600 text-sm">
                Text
              </label>
              <textarea
                name="label"
                ref={inputRef}
                autoFocus
                id={`label-${id}`}
                value={data.label}
                onChange={handleChange}
                className="border border-slate-300 rounded p-2 text-sm outline-slate-400"
              />
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
