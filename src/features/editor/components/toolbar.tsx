import CustomTooltip from "@/components/custom/custom-tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "@/types/types";

interface ToolbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onchangeActiveTool: (tool: ActiveTool) => void;
};

const Toolbar = ({ editor, activeTool, onchangeActiveTool }: ToolbarProps) => {
    const fillColor = editor?.getActiveFillColor();
    const strokeColor = editor?.getActiveStrokeColor();

    if (editor?.selectedObjects.length === 0) return (<></>);

    return (
        <div className='w-[1050px] h-10 mx-auto flex items-center p-1 rounded-xl shrink-0 overflow-x-auto border z-[49] gap-x-2 bg-white'>
            <div className='flex h-full'>
                <CustomTooltip label='Color' side='bottom'>
                    <Button size='icon' variant='ghost' onClick={() => onchangeActiveTool('fill')} className={cn('h-full', activeTool === 'fill' && 'bg-gray-100')}>
                        <div
                            className='rounded-full size-6 border'
                            style={{ backgroundColor: fillColor }}
                        />
                    </Button>
                </CustomTooltip>
                <CustomTooltip label='Color' side='bottom'>
                    <Button size='icon' variant='ghost' onClick={() => onchangeActiveTool('stroke-color')} className={cn('h-full', activeTool === 'stroke-color' && 'bg-gray-100')}>
                        <div
                            className='rounded-full size-6 border-2 bg-white'
                            style={{ borderColor: strokeColor }}
                        />
                    </Button>
                </CustomTooltip>
            </div>
        </div>
    );
};

export default Toolbar;