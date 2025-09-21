import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { IoSquareSharp, IoStarSharp, IoTriangleSharp } from "react-icons/io5";
import { RiHexagonFill, RiPentagonFill } from "react-icons/ri";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import { FaCircle, FaSquare, } from "react-icons/fa";
import { MdSquare } from "react-icons/md";
import { ActiveTool, Editor } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./shape-tool";
import { cn } from "@/lib/utils";

interface ShapeSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const ShapeSidebar = ({ activeTool, editor, onChangeActiveTool }: ShapeSidebarProps) => {
    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside className={cn('w-[360px] relative', activeTool === 'shapes' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Shapes' description='Add shapes in canvas' />
            <ScrollArea className='p-4'>
                <div className='grid grid-cols-3 gap-4'>
                    <ShapeTool onClick={() => { }} icon={IoSquareSharp} />
                    <ShapeTool onClick={() => { }} icon={FaSquare} />
                    <ShapeTool onClick={() => editor?.addCircle()} icon={FaCircle} />
                    <ShapeTool onClick={() => { }} icon={IoTriangleSharp} />
                    <ShapeTool onClick={() => { }} icon={IoTriangleSharp} iconClassName='rotate-180' />
                    <ShapeTool onClick={() => { }} icon={MdSquare} iconClassName='rotate-45' />
                    <ShapeTool onClick={() => { }} icon={RiPentagonFill} />
                    <ShapeTool onClick={() => { }} icon={RiHexagonFill} iconClassName='rotate-90' />
                    <ShapeTool onClick={() => { }} icon={RiHexagonFill} />
                    <ShapeTool onClick={() => { }} icon={IoStarSharp} />
                    <ShapeTool onClick={() => { }} icon={ImArrowRight} />
                    <ShapeTool onClick={() => { }} icon={ImArrowLeft} />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default ShapeSidebar;