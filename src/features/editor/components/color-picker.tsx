import { colors } from "@/constants/constants";
import { Palette } from "lucide-react";
import { ChromePicker, CirclePicker } from "react-color";
import { rgbaObjectToString } from "../utils/utils";

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
    return (
        <div className='w-full h-full space-y-8'>
            <ChromePicker
                color={value}
                onChange={(color) => {
                    const formattedValue = rgbaObjectToString(color.rgb);
                    onChange(formattedValue);
                }}
                className='w-full border rounded-full'
            />

            <div className='space-y-5'>
                <div className='flex items-center gap-x-3'>
                    <Palette size={20} /> <span className='font-semibold'>Default solid colors</span>
                </div>
                <CirclePicker
                    circleSize={34}
                    circleSpacing={15}
                    color={value}
                    colors={colors}
                    onChangeComplete={(color) => {
                        const formattedValue = rgbaObjectToString(color.rgb);
                        onChange(formattedValue);
                    }}
                    className='absolute z-50'
                />
            </div>
        </div>
    );
};

export default ColorPicker;