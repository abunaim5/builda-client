import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ActiveTool, Editor } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ColorPicker from "./color-picker";
import { FillColor } from "@/constants/constants";

interface FillColorSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const FillColorSidebar = ({ activeTool, editor, onChangeActiveTool }: FillColorSidebarProps) => {
    const value = editor?.getActiveFillColor() || FillColor;

    const onClose = () => {
        onChangeActiveTool('select');
    };

    const onChange = (value: string) => {
        editor?.changeFillColor(value);
    };

    return (
        <aside className={cn('w-[360px] relative', activeTool === 'fill' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Color' description='Add fill color in elements' />
            <ScrollArea>
                <div className='p-4'>
                    <ColorPicker value={value} onChange={onChange} />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default FillColorSidebar;