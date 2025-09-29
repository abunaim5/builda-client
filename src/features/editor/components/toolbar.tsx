import { BringToFront, Italic, Layers2, SendToBack, Strikethrough, Underline } from "lucide-react";
import { RxBorderWidth } from "react-icons/rx";
import { FaBold } from "react-icons/fa";
import { ActiveTool, Editor } from "@/types/types";
import CustomTooltip from "@/components/custom/custom-tooltip";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Transparency from "./transparency";
import { isTextType } from "../utils/utils";
import { FontWeight } from "@/constants/constants";
import { useState } from "react";

interface ToolbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onchangeActiveTool: (tool: ActiveTool) => void;
};

const Toolbar = ({ editor, activeTool, onchangeActiveTool }: ToolbarProps) => {
    const initFontWeight = editor?.getActiveFontWeight() || FontWeight;
    const initFontFamily = editor?.getActiveFontFamily();
    const initFontItalic = editor?.getActiveFontItalic();
    const initFontStrikethrough = editor?.getActiveFontStrikethrough();
    const initFillColor = editor?.getActiveFillColor();
    const initStrokeColor = editor?.getActiveStrokeColor();
    const initStrokeWidth = editor?.getActiveStrokeWidth();
    const [properties, setProperties] = useState({
        fontFamily: initFontFamily,
        fontWeight: initFontWeight,
        fontItalic: initFontItalic,
        fontStrikethrough: initFontStrikethrough,
        fillColor: initFillColor,
        strokeColor: initStrokeColor,
        strokeWidth: initStrokeWidth
    });
    const selectedObjectType = editor?.selectedObjects[0]?.type;
    const isText = isTextType(selectedObjectType);

    const handleToggleFontStyle = (style: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
        const selectedObject = editor?.selectedObjects[0];
        if (!selectedObject) return;

        switch (style) {
            case 'bold': {
                const newVal = properties.fontWeight > 500 ? 500 : 700;
                editor.changeFontWeight(newVal);
                setProperties((current) => ({
                    ...current,
                    fontWeight: newVal
                }));
                break;
            }
            case 'italic': {
                const newVal = properties.fontItalic === 'italic' ? 'normal' : 'italic';
                editor.changeFontItalic(newVal);
                setProperties((current) => ({
                    ...current,
                    fontItalic: newVal
                }));
                break;
            }
            case 'strikethrough': {
                const newVal = properties.fontStrikethrough === true ? false : true;
                editor.changeFontStrikethrough(newVal);
                setProperties((current) => ({
                    ...current,
                    fontStrikethrough: newVal
                }));
                break;
            }
            default:
                break;
        }
    };

    // if (editor?.selectedObjects.length === 0) return (<></>);

    return (
        <div className={cn('w-fit h-10 p-1 rounded-lg absolute top-1 left-1/2 transform -translate-x-1/2 z-[49] shadow-sm bg-white', editor?.selectedObjects.length !== 0 ? 'visible' : 'hidden')}>
            <div className='h-full flex items-center gap-x-2 shrink-0 overflow-x-auto'>
                {isText && (
                    <CustomTooltip label='Font' side='bottom'>
                        <Button variant='outline' onClick={() => onchangeActiveTool('font')} className={cn('h-full', activeTool === 'font' && 'bg-gray-100')}>
                            {properties.fontFamily}
                        </Button>
                    </CustomTooltip>
                )}

                <CustomTooltip label={isText ? 'Text color' : 'Color'} side='bottom'>
                    <Button variant='ghost' size='icon' onClick={() => onchangeActiveTool('fill')} className={cn('h-full', activeTool === 'fill' && 'bg-gray-100')}>
                        {
                            isText ? (<div className='flex flex-col items-center justify-center'>
                                <span className='text-lg font-semibold leading-none'>A</span>
                                <div
                                    className='rounded-full h-1 w-5'
                                    style={{ backgroundColor: properties.fillColor }}
                                />
                            </div>) : (<div
                                className='rounded-full size-5 border'
                                style={{ backgroundColor: properties.fillColor }}
                            />)
                        }

                    </Button>
                </CustomTooltip>

                {isText && (
                    <CustomTooltip label='Bold' side='bottom'>
                        <Button variant='ghost' size='icon' onClick={() => handleToggleFontStyle('bold')} className={cn('h-full', properties.fontWeight > 500 && 'bg-gray-100')}>
                            <FaBold className='size-5' />
                        </Button>
                    </CustomTooltip>
                )}

                {isText && (
                    <CustomTooltip label='Italic' side='bottom'>
                        <Button variant='ghost' size='icon' onClick={() => handleToggleFontStyle('italic')} className={cn('h-full', properties.fontItalic === 'italic' && 'bg-gray-100')}>
                            <Italic className='size-5' />
                        </Button>
                    </CustomTooltip>
                )}

                {isText && (
                    <CustomTooltip label='Strikethrough' side='bottom'>
                        <Button variant='ghost' size='icon' onClick={() => handleToggleFontStyle('strikethrough')} className={cn('h-full', properties.fontStrikethrough === true && 'bg-gray-100')}>
                            <Strikethrough className='size-5' />
                        </Button>
                    </CustomTooltip>
                )}

                {!isText && (
                    <CustomTooltip label='Stroke color' side='bottom'>
                        <Button variant='ghost' size='icon' onClick={() => onchangeActiveTool('stroke-color')} className={cn('h-full', activeTool === 'stroke-color' && 'bg-gray-100', properties.strokeWidth !== 0 ? 'visible' : 'hidden')}>
                            <div
                                className='rounded-full size-5 border-2 bg-white'
                                style={{ borderColor: properties.strokeColor }}
                            />
                        </Button>
                    </CustomTooltip>
                )}

                {!isText && (
                    <CustomTooltip label='Stroke style' side='bottom'>
                        <Button variant='ghost' size='icon' onClick={() => onchangeActiveTool('stroke-width')} className={cn('h-full', activeTool === 'stroke-width' && 'bg-gray-100')}>
                            <RxBorderWidth className='size-5' />
                        </Button>
                    </CustomTooltip>
                )}

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
                {/* <Separator orientation='vertical' /> */}
                <Transparency editor={editor} />
                {/* <Separator orientation='vertical' /> */}
            </div>
        </div>
    );
};

export default Toolbar;