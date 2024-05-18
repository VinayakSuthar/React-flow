import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import Sidebar from "./components/sidebar";
import TextNode from "./components/text-node";
import { cn } from "./utils";

function getId() {
  return `node_${Date.now()}`;
}

const nodeTypes = {
  "text-node": TextNode,
};

const statusMap = {
  success: "Changes saved successfully",
  error: "Cannot save flow",
};

const statusVariant = {
  success: "bg-green-200",
  error: "bg-red-200",
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [status, setStatus] = useState("");
  let timeoutId;

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // Adjusting the position by adding half of the node's width and height to center the node
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - 75,
        y: event.clientY - 33,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `test node ${nodes.length + 1}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes]
  );

  const handleSave = () => {
    let i = 0;
    let nodesWithEmptyTargetHandle = 0;

    while (i < nodes.length && nodesWithEmptyTargetHandle < 2) {
      const node = nodes[i];
      const target = edges.find((edge) => edge.target === node.id);
      if (!target) {
        nodesWithEmptyTargetHandle++;
      }
      i++;
    }

    setStatus(nodesWithEmptyTargetHandle > 1 ? "error" : "success");
    // Clear previous timeout
    clearTimeout(timeoutId);
    // Clear status message after 3 seconds
    timeoutId = setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  return (
    <div className="h-screen">
      <div className="px-3 py-2 border-b-2 flex items-center">
        <div className="flex-1 flex justify-center">
          {status && (
            <p
              className={cn(
                "bg-red-200 px-3 py-1 rounded-md",
                statusVariant[status]
              )}
            >
              {statusMap[status]}
            </p>
          )}
        </div>
        <button
          onClick={handleSave}
          className="text-sm text-blue-700 border-2 border-blue-500 px-3 py-1 rounded-md font-medium"
        >
          Save Changes
        </button>
      </div>
      <div className="flex h-full">
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
          >
            <Panel position="bottom-right" />
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
