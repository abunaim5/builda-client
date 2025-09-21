import { ChevronLeft } from "lucide-react";

interface ToolSidebarCloseProps {
    onClick: () => void;
};

const ToolSidebarClose = ({ onClick }: ToolSidebarCloseProps) => {
    return (
        <button onClick={onClick} className='absolute -right-4 top-1/2 transition transform -translate-y-1/2 z-40 px-1 py-4 border-3 rounded-full shadow-lg hover:bg-muted border-white bg-white'>
            <ChevronLeft className='size-4' />
        </button>
    );
};

export default ToolSidebarClose;