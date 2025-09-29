import CustomTooltip from "@/components/custom/custom-tooltip";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider";
import { Editor } from "@/types/types";
import { useEffect, useMemo, useState } from "react";
import { RxTransparencyGrid } from "react-icons/rx";

interface TransparencyProps {
    editor: Editor | undefined;
};

const Transparency = ({ editor }: TransparencyProps) => {
    const initValue = editor?.getActiveOpacity() || 1;
    const [opacity, setOpacity] = useState<number>(initValue);
    const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects]);

    const onchangeOpacity = (value: number) => {
        editor?.changeOpacity(value);
        setOpacity(value);
    };

    useEffect(() => {
        if (!selectedObject) return;
        setOpacity(selectedObject.get('opacity') || 1);
    }, [selectedObject]);

    return (
        <Popover>
            <CustomTooltip label='Transparency' side='bottom'>
                <PopoverTrigger asChild>
                    <Button variant='ghost' size='icon' className='h-full'>
                        <RxTransparencyGrid className='size-5' />
                    </Button>
                </PopoverTrigger>
            </CustomTooltip>
            <PopoverContent className='mt-[2px]'>
                <div className='space-y-5'>
                    <h4 className='leading-none text-sm font-medium'>Transparency</h4>
                    <Slider
                        defaultValue={[opacity]}
                        value={[opacity]}
                        max={1}
                        min={0}
                        step={0.01}
                        onValueChange={(values) => onchangeOpacity(values[0])}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default Transparency;