import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

const ResizableTable = ({ children, className }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={cn("min-h-[200px] rounded-lg border relative", className)}
    >
      <ResizablePanel 
        defaultSize={100} 
        minSize={30}
        className="relative"
      >
        {children}
        <div className="absolute top-0 right-0 bottom-0 w-1 cursor-col-resize hover:bg-accent/50 transition-colors" />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ResizableTable;