import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ActiveTool, Editor } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { StrokeWidth } from "@/constants/constants";

interface StrokeWidthSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const StrokeWidthSidebar = ({ activeTool, editor, onChangeActiveTool }: StrokeWidthSidebarProps) => {
    // const value = editor?.getActiveStrokeWidth() || StrokeWidth;

    const onClose = () => {
        onChangeActiveTool('select');
    };

    const onChange = (value: number) => {
        editor?.changeStrokeWidth(value);
    };

    return (
        <aside className={cn('w-[360px] relative', activeTool === 'stroke-width' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Stroke width' description='Change stroke width in elements' />
            <ScrollArea className='p-4'>
                <div className='w-full h-full'>
                    
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default StrokeWidthSidebar;