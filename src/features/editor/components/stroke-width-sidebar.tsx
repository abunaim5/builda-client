import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { StrokeWidth } from "@/constants/constants";
import { ActiveTool, Editor } from "@/types/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AiOutlineDash, AiOutlineSmallDash } from "react-icons/ai";
import { Ban, Minus } from "lucide-react";

interface StrokeWidthSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const StrokeWidthSidebar = ({ activeTool, editor, onChangeActiveTool }: StrokeWidthSidebarProps) => {
    const value = editor?.getActiveStrokeWidth() || StrokeWidth;

    const onClose = () => {
        onChangeActiveTool('select');
    };

    const onChange = (value: number) => {
        editor?.changeStrokeWidth(value);
    };

    return (
        <aside className={cn('w-[360px] relative', activeTool === 'stroke-width' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Stroke width' description='Change stroke width in elements' />
            <ScrollArea>
                <div className='p-4 space-y-4 border-b'>
                    <h3 className='text-sm font-semibold'>Stroke weight</h3>
                    <Slider
                        defaultValue={[value]}
                        value={[value]}
                        onValueChange={(values) => onChange(values[0])}
                    />
                </div>
                <div className='p-4 space-y-4 border-b'>
                    <h3 className='text-sm font-semibold'>Stroke styles</h3>
                    <div className='flex items-center justify-between'>
                        <Button variant='outline' className={cn(value === 0 && 'border-[#5BD0F4]')}>
                            <Ban className='size-5' />
                        </Button>
                        <Button variant='outline' className={cn(value > 0 && 'border-[#5BD0F4]')}>
                            <Minus className='size-5' />
                        </Button>
                        <Button variant='outline'>
                            <AiOutlineDash className='size-5' />
                        </Button>
                        <Button variant='outline'>
                            <AiOutlineSmallDash className='size-5' />
                        </Button>
                    </div>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default StrokeWidthSidebar;