import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { StrokeDashArray, StrokeWidth } from "@/constants/constants";
import { ActiveTool, Editor } from "@/types/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AiOutlineDash, AiOutlineSmallDash } from "react-icons/ai";
import { Ban, Minus } from "lucide-react";

interface StrokeWidthSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const StrokeWidthSidebar = ({ activeTool, editor, onChangeActiveTool }: StrokeWidthSidebarProps) => {
    const value = editor?.getActiveStrokeWidth() || StrokeWidth;
    const strokeDash = editor?.getActiveStrokeDashArray() || StrokeDashArray;

    const onClose = () => {
        onChangeActiveTool('select');
    };

    const onChangeStrokeWidth = (value: number) => {
        editor?.changeStrokeWidth(value);
    };

    const onChangeStrokeType = (value: number[]) => {
        editor?.changeStrokeDashArray(value);
    };

    return (
        <aside className={cn('w-[360px] flex flex-col relative border-r z-40 max-h-[calc(100vh-56px)]', activeTool === 'stroke-width' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Stroke styles' description='Change the stroke weight and styles' />
            <ScrollArea className='overflow-auto'>
                <div className='p-4 space-y-4 border-b'>
                    <h3 className='text-sm font-semibold'>Stroke weight</h3>
                    <Slider
                        defaultValue={[value]}
                        value={[value]}
                        onValueChange={(values) => onChangeStrokeWidth(values[0])}
                    />
                </div>
                <div className='p-4 space-y-4 border-b'>
                    <h3 className='text-sm font-semibold'>Stroke patterns</h3>
                    <div className='flex items-center justify-between'>
                        <Button onClick={() => { onChangeStrokeWidth(0); onChangeStrokeType([]) }} variant='outline' className={cn(value === 0 && 'border-[#5BD0F4]')}>
                            <Ban className='size-5' />
                        </Button>
                        <Button onClick={() => { onChangeStrokeWidth(value !== 0 ? value : 4); onChangeStrokeType([]) }} variant='outline' className={cn((value > 0 && strokeDash.length === 0) ? 'border-[#5BD0F4]' : '')}>
                            <Minus className='size-5' />
                        </Button>
                        <Button onClick={() => { onChangeStrokeWidth(value !== 0 ? value : 4); onChangeStrokeType([12, 12]) }} variant='outline' className={cn(strokeDash[0] === 12 && 'border-[#5BD0F4]')}>
                            <AiOutlineDash className='size-5' />
                        </Button>
                        <Button onClick={() => { onChangeStrokeWidth(value !== 0 ? value : 4); onChangeStrokeType([5, 5]) }} variant='outline' className={cn(strokeDash[0] === 5 && 'border-[#5BD0F4]')}>
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