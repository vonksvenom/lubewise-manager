import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

const ResizableTable = ({ children, className }) => {
  const tableRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [columns, setColumns] = useState([]);
  const [startX, setStartX] = useState(null);
  const [currentColumn, setCurrentColumn] = useState(null);

  useEffect(() => {
    if (tableRef.current) {
      const headerCells = tableRef.current.querySelectorAll('th');
      setColumns(Array.from(headerCells).map(cell => ({
        element: cell,
        width: cell.offsetWidth
      })));
    }
  }, []);

  const handleMouseDown = (e, index) => {
    e.preventDefault();
    setResizing(true);
    setStartX(e.pageX);
    setCurrentColumn(index);
  };

  const handleMouseMove = (e) => {
    if (!resizing || currentColumn === null) return;

    const diff = e.pageX - startX;
    const newColumns = [...columns];
    
    if (newColumns[currentColumn]) {
      const newWidth = Math.max(100, newColumns[currentColumn].width + diff);
      newColumns[currentColumn].element.style.width = `${newWidth}px`;
      newColumns[currentColumn].width = newWidth;
    }

    setStartX(e.pageX);
    setColumns(newColumns);
  };

  const handleMouseUp = () => {
    setResizing(false);
    setCurrentColumn(null);
  };

  useEffect(() => {
    if (resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing]);

  const addResizeHandles = () => {
    const table = tableRef.current;
    if (!table) return children;

    const modifiedChildren = React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;

      return React.cloneElement(child, {
        ref: tableRef,
        children: React.Children.map(child.props.children, tableChild => {
          if (!React.isValidElement(tableChild)) return tableChild;

          if (tableChild.type === 'thead' || tableChild.props.asChild) {
            return React.cloneElement(tableChild, {
              children: React.Children.map(tableChild.props.children, headerRow => {
                if (!React.isValidElement(headerRow)) return headerRow;

                return React.cloneElement(headerRow, {
                  children: React.Children.map(headerRow.props.children, (headerCell, index) => {
                    if (!React.isValidElement(headerCell)) return headerCell;

                    return React.cloneElement(headerCell, {
                      style: { position: 'relative', ...headerCell.props.style },
                      children: (
                        <>
                          {headerCell.props.children}
                          <div
                            className="absolute top-0 right-0 bottom-0 w-1 cursor-col-resize hover:bg-accent/50 transition-colors"
                            onMouseDown={(e) => handleMouseDown(e, index)}
                          />
                        </>
                      )
                    });
                  })
                });
              })
            });
          }
          return tableChild;
        })
      });
    });

    return modifiedChildren;
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={cn("min-h-[200px] rounded-lg border", className)}
    >
      <ResizablePanel defaultSize={100} minSize={30}>
        <div className="relative" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
          {addResizeHandles()}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ResizableTable;