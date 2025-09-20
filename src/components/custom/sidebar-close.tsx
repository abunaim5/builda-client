import { ChevronLeft } from "lucide-react";

interface SidebarCloseProps {
    onClick: () => void;
};

const SidebarClose = ({onClick}: SidebarCloseProps) => {
    return (
        <button onClick={onClick} className='absolute -right-4 top-1/2 transform -translate-y-1/2 z-40 px-1 py-4 border-3 rounded-full shadow-lg hover:bg-muted group border-white bg-white'>
            <ChevronLeft className='size-4' />
        </button>
    );
};

export default SidebarClose;