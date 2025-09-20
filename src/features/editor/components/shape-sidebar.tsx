import SidebarClose from "@/components/custom/sidebar-close";
import { cn } from "@/lib/utils";
import { ActiveTool } from "@/types/types";

interface ShapeSidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const ShapeSidebar = ({ activeTool, onChangeActiveTool }: ShapeSidebarProps) => {
    const onClick = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside className={cn('w-[360px] relative', activeTool === 'shapes' ? 'visible' : 'hidden')}>
            <SidebarClose onClick={onClick} />
        </aside>
    );
};

export default ShapeSidebar; 