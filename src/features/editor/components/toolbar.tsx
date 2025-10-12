import {
    BringToFront,
    Italic,
    Layers2,
    SendToBack,
    Strikethrough,
    TextAlignCenter,
    TextAlignEnd,
    TextAlignJustify,
    TextAlignStart,
    Trash2,
    Underline
} from "lucide-react";
import { TbColorFilter } from 'react-icons/tb';
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
import { FontSize, FontWeight } from "@/constants/constants";
import { useState } from "react";
import FontSizeInput from "@/components/custom/font-size-input";

interface ToolbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onchangeActiveTool: (tool: ActiveTool) => void;
};

const Toolbar = ({ editor, activeTool, onchangeActiveTool }: ToolbarProps) => {
    const initFontFamily = editor?.getActiveFontFamily();
    const initFontSize = editor?.getActiveFontSize() || FontSize;
    const initFontWeight = editor?.getActiveFontWeight() || FontWeight;
    const initFontItalic = editor?.getActiveFontItalic();
    const initFontUnderline = editor?.getActiveFontUnderline();
    const initFontStrikethrough = editor?.getActiveFontStrikethrough();
    const initTextTransform = editor?.getActiveTextTransform();
    const initTextAlign = editor?.getActiveTextAlign();
    const initFillColor = editor?.getActiveFillColor();
    const initStrokeColor = editor?.getActiveStrokeColor();
    const initStrokeWidth = editor?.getActiveStrokeWidth();
    const [properties, setProperties] = useState({
        fontFamily: initFontFamily,
        fontSize: initFontSize,
        fontWeight: initFontWeight,
        fontItalic: initFontItalic,
        fontUnderline: initFontUnderline,
        fontStrikethrough: initFontStrikethrough,
        textTransform: initTextTransform,
        textAlign: initTextAlign,
        fillColor: initFillColor,
        strokeColor: initStrokeColor,
        strokeWidth: initStrokeWidth
    });
    const selectedObject = editor?.selectedObjects[0];
    const selectedObjectType = editor?.selectedObjects[0]?.type;
    const isText = isTextType(selectedObjectType);
    const isImage = selectedObjectType === 'image';

    const onChangeFontSize = (value: number) => {
        if (!selectedObject) return;

        editor.changeFontSize(value);
        setProperties((current) => ({
            ...current,
            fontSize: value
        }));
    };

    const handleToggleFontStyle = (style: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'uppercase' | 'alignment') => {
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
            case 'underline': {
                const newVal = properties.fontUnderline ? false : true;
                editor.changeFontUnderline(newVal);
                setProperties((current) => ({
                    ...current,
                    fontUnderline: newVal
                }));
                break;
            }
            case 'strikethrough': {
                const newVal = properties.fontStrikethrough ? false : true;
                editor.changeFontStrikethrough(newVal);
                setProperties((current) => ({
                    ...current,
                    fontStrikethrough: newVal
                }));
                break;
            }
            case 'uppercase': {
                const newVal = properties.textTransform === 'uppercase' ? 'none' : 'uppercase';
                editor.changeTextTransform(newVal);
                setProperties((current) => ({
                    ...current,
                    textTransform: newVal
                }));
                break;
            }
            case 'alignment': {
                const newVal = properties.textAlign === 'left'
                    ? 'center'
                    : properties.textAlign === 'center'
                        ? 'justify'
                        : properties.textAlign === 'justify'
                            ? 'right'
                            : 'left';
                editor.changeTextAlign(newVal);
                setProperties((current) => ({
                    ...current,
                    textAlign: newVal
                }));
                break;
            }
            default:
                break;
        }
    };

    if (!editor?.selectedObjects.length) return (<></>);

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

                {isText && (
                    <FontSizeInput value={properties.fontSize} onChange={onChangeFontSize} />
                )}

                {!isImage && (<CustomTooltip label={isText ? 'Text color' : 'Color'} side='bottom'>
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
                </CustomTooltip>)}

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
                    <CustomTooltip label='Underline' side='bottom'>
                        <Button variant='ghost' size='icon' onClick={() => handleToggleFontStyle('underline')} className={cn('h-full', properties.fontUnderline && 'bg-gray-100')}>
                            <Underline className='size-5' />
                        </Button>
                    </CustomTooltip>
                )}

                {isText && (
                    <CustomTooltip label='Strikethrough' side='bottom'>
                        <Button variant='ghost' size='icon' onClick={() => handleToggleFontStyle('strikethrough')} className={cn('h-full', properties.fontStrikethrough && 'bg-gray-100')}>
                            <Strikethrough className='size-5' />
                        </Button>
                    </CustomTooltip>
                )}

                {isText && (
                    <CustomTooltip label='Uppercase' side='bottom'>
                        <Button variant='ghost' size='icon' onClick={() => handleToggleFontStyle('uppercase')} className={cn('h-full text-lg', properties.textTransform === 'uppercase' && 'bg-gray-100')}>
                            aA
                        </Button>
                    </CustomTooltip>
                )}

                {isText && (
                    <CustomTooltip label='Alignment' side='bottom'>
                        <Button variant='ghost' size='icon' onClick={() => handleToggleFontStyle('alignment')} className={cn('h-full')}>
                            {
                                properties.textAlign === 'left'
                                    ? <TextAlignStart className='size-5' />
                                    : properties.textAlign === 'center'
                                        ? <TextAlignCenter className='size-5' />
                                        : properties.textAlign === 'justify'
                                            ? <TextAlignJustify className='size-5' />
                                            : properties.textAlign === 'right'
                                                ? <TextAlignEnd className='size-5' />
                                                : <TextAlignStart className='size-5' />
                            }
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

                {isImage && (
                    <CustomTooltip label='Filters' side='bottom'>
                        <Button variant='ghost' size='icon' onClick={() => onchangeActiveTool('filter')} className={cn('h-full', activeTool === 'filter' && 'bg-gray-100')}>
                            <TbColorFilter className='size-5' />
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
                <Transparency editor={editor} />
                <CustomTooltip label='Delete' side='bottom'>
                    <Button variant='ghost' size='icon' onClick={() => editor?.deleteObj()} className='h-full'>
                        <Trash2 className='size-5' />
                    </Button>
                </CustomTooltip>
            </div>
        </div>
    );
};

export default Toolbar;