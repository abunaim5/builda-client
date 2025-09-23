import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ActiveTool, Editor } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ColorPicker from "./color-picker";
import { StrokeColor } from "@/constants/constants";

interface StrokeColorSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const StrokeColorSidebar = ({ activeTool, editor, onChangeActiveTool }: StrokeColorSidebarProps) => {
    const value = editor?.getActiveStrokeColor() || StrokeColor;

    const onClose = () => {
        onChangeActiveTool('select');
    };

    const onChange = (value: string) => {
        editor?.changeStrokeColor(value);
    };

    return (
        <aside className={cn('w-[360px] relative', activeTool === 'stroke-color' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Stroke color' description='Add stroke color in elements' />
            <ScrollArea className='p-4'>
                <div className='w-full h-full'>
                    <ColorPicker value={value} onChange={onChange} />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default StrokeColorSidebar;