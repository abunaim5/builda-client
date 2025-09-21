import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface ShapeToolProps {
    icon: LucideIcon | IconType;
    iconClassName?: string;
    onClick: () => void;
}
const ShapeTool = ({icon: Icon, iconClassName, onClick}: ShapeToolProps) => {
    return (
        <button className='aspect-square rounded border p-4 group' onClick={onClick}>
            <Icon className={cn('w-full h-full group-hover:animate-pulse', iconClassName)} />
        </button>
    );
};

export default ShapeTool;