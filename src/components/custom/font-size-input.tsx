import { ChangeEvent } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface FontSizeInputProps {
    value: number;
    onChange: (value: number) => void;
}

const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
    const inc = () => onChange(value + 1);
    const dec = () => onChange(value - 1);

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        onChange(value);
    }

    return (
        <div className='flex items-center h-full border rounded-md'>
            <Button onClick={dec} variant='ghost' size='icon' className={cn('h-full rounded-r-none', value < 2 && 'pointer-events-none')}>
                <Minus />
            </Button>
            <Input
                type='text'
                value={value ? value : 0}
                placeholder='--'
                onChange={handleValueChange}
                className='w-9 h-full px-1 text-center border-none focus-visible:ring-0 rounded-none'
            />
            <Button onClick={inc} variant='ghost' size='icon' className='h-full rounded-l-none'>
                <Plus />
            </Button>
        </div>
    );
};

export default FontSizeInput;