import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ActiveTool, Editor } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ColorPicker from "./color-picker";
import { FillColor } from "@/constants/constants";

interface FillColorSidebarProps {
    isText: boolean;
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const FillColorSidebar = ({ isText, activeTool, editor, onChangeActiveTool }: FillColorSidebarProps) => {
    const value = editor?.getActiveFillColor() || FillColor;

    const onClose = () => {
        onChangeActiveTool('select');
    };

    const onChange = (value: string) => {
        editor?.changeFillColor(value);
    };

    return (
        <aside className={cn('w-[360px] flex flex-col relative border-r z-40 max-h-[calc(100vh-56px)]', activeTool === 'fill' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title={isText ? 'Text color' : 'Color'} description={isText ? 'Add text color' : 'Add fill color in elements'} />
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