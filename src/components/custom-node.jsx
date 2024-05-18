import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { memo, useMemo } from "react";
import {
  Handle,
  Position,
  getConnectedEdges,
  useNodeId,
  useStore,
} from "reactflow";
import { cn } from "../utils";

const CustomNode = memo(function CustomNode({ data, selected }) {
  const nodeId = useNodeId();
  const { nodeInternals, edges } = useStore();

  const isHandleConnectable = useMemo(() => {
    const node = nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], edges);
    let count = 0;
    for (let edge of connectedEdges) {
      if (edge.source === nodeId) {
        count++;
      }
    }

    return count < 1;
  }, [edges, nodeId, nodeInternals]);

  return (
    <div
      className={cn(
        "rounded shadow-lg border overflow-hidden border-black bg-white w-[150px] text-xs",
        { "border-blue-400": selected }
      )}
    >
      <Handle type="target" position={Position.Left} />
      <div className="bg-teal-200 text-[10px] flex items-center gap-x-1 py-1 px-2 font-medium">
        <ChatBubbleOvalLeftEllipsisIcon className="size-3" />
        Send Message
      </div>
      <div className="p-3 text-center">{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isHandleConnectable}
      />
    </div>
  );
});

export default CustomNode;
