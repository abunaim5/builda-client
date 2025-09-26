import { ActiveTool, Editor } from "@/types/types";
import { RxBorderWidth } from "react-icons/rx";
import { BringToFront, Layers2, SendToBack } from "lucide-react";
import CustomTooltip from "@/components/custom/custom-tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Transparency from "./transparency";

interface ToolbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onchangeActiveTool: (tool: ActiveTool) => void;
};

const Toolbar = ({ editor, activeTool, onchangeActiveTool }: ToolbarProps) => {
    const fillColor = editor?.getActiveFillColor();
    const strokeColor = editor?.getActiveStrokeColor();
    const strokeWidth = editor?.getActiveStrokeWidth();

    // if (editor?.selectedObjects.length === 0) return (<></>);

    return (
        <div className={cn('w-fit h-10 p-1 rounded-lg absolute top-1 left-1/2 transform -translate-x-1/2 z-[49] shadow-sm bg-white', editor?.selectedObjects.length !== 0 ? 'visible' : 'hidden')}>
            <div className='h-full flex items-center gap-x-2 shrink-0 overflow-x-auto'>
                <CustomTooltip label='Color' side='bottom'>
                    <Button variant='ghost' size='icon' onClick={() => onchangeActiveTool('fill')} className={cn('h-full', activeTool === 'fill' && 'bg-gray-100')}>
                        <div
                            className='rounded-full size-5 border'
                            style={{ backgroundColor: fillColor }}
                        />
                    </Button>
                </CustomTooltip>

                <CustomTooltip label='Stroke color' side='bottom'>
                    <Button variant='ghost' size='icon' onClick={() => onchangeActiveTool('stroke-color')} className={cn('h-full', activeTool === 'stroke-color' && 'bg-gray-100', strokeWidth !== 0 ? 'visible' : 'hidden')}>
                        <div
                            className='rounded-full size-5 border-2 bg-white'
                            style={{ borderColor: strokeColor }}
                        />
                    </Button>
                </CustomTooltip>

                <CustomTooltip label='Stroke style' side='bottom'>
                    <Button variant='ghost' size='icon' onClick={() => onchangeActiveTool('stroke-width')} className={cn('h-full', activeTool === 'stroke-width' && 'bg-gray-100')}>
                        <RxBorderWidth className='size-5' />
                    </Button>
                </CustomTooltip>

                <DropdownMenu modal={false}>
                    <CustomTooltip label='Layer' side='bottom'>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon' className={cn('h-full')}>
                                <Layers2 className='size-5' />
                            </Button>
                        </DropdownMenuTrigger>
                    </CustomTooltip>
                    <DropdownMenuContent align="center" className='mt-[2px]'>
                        <DropdownMenuItem onClick={() => editor?.bringForward()}>
                            <BringToFront className='size-5' /> <span>Bring forward</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => editor?.sendBackwards()}>
                            <SendToBack className='size-5' /> <span>Send backward</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Transparency editor={editor} />
            </div>
        </div>
    );
};

export default Toolbar;