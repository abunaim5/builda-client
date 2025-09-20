import {IconType as ReactIcon} from "react-icons"
import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
    icon: LucideIcon | ReactIcon;
    label: string;
    isActive?: boolean;
    onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, isActive, onClick }: SidebarItemProps) => {
    return (
        <Button
            variant='ghost'
            onClick={onClick}
            className={cn('w-full h-fit aspect-square p-3 py-4 flex flex-col rounded-none', isActive && 'bg-muted text-primary')}
        >
            <Icon className={cn('shrink-0 size-5 stroke-2', isActive && 'text-[#5BD0F4]')} />
            <span className='text-xs'>{label}</span>
        </Button>
    );
};

export default SidebarItem;