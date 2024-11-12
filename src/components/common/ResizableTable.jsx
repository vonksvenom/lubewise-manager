import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

const ResizableTable = ({ children, className }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={cn("min-h-[200px] rounded-lg border", className)}
    >
      <ResizablePanel defaultSize={100} minSize={30}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ResizableTable;