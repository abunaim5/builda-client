import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';

export interface AutoResizeInputProps {
    initialValue?: string;
    placeholder?: string;
    className?: string;
}

const AutoResizeInput = ({ initialValue = '', placeholder = '', className = '' }: AutoResizeInputProps) => {
    const [value, setValue] = useState<string>(initialValue);
    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!spanRef.current || !inputRef.current) return;
        inputRef.current.style.width = `${spanRef.current.offsetWidth + 16}px`
    }, [value]);

    return (
        <div className='relative inline-block'>
            <span
                ref={spanRef}
                className='absolute whitespace-pre invisible px-1'
                aria-hidden
            >
                {value || placeholder || ''}
            </span>
            <Input
                ref={inputRef}
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={`${className} w-0 transition-all`}
            />
        </div>
    );
};

export default AutoResizeInput;