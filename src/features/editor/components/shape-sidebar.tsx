import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { cn } from "@/lib/utils";
import { ActiveTool } from "@/types/types";

interface ShapeSidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const ShapeSidebar = ({ activeTool, onChangeActiveTool }: ShapeSidebarProps) => {
    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside className={cn('w-[360px] relative', activeTool === 'shapes' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Shapes' description='Add shapes in canvas' />

            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default ShapeSidebar; 