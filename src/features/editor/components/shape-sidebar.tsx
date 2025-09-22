import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { IoSquareSharp, IoStarSharp, IoTriangleSharp } from "react-icons/io5";
import { RiHexagonFill, RiPentagonFill } from "react-icons/ri";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import { FaCircle, FaSquare, } from "react-icons/fa";
import { LiaStarSolid } from "react-icons/lia";
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
                    <ShapeTool onClick={() => editor?.addRectangle()} icon={IoSquareSharp} />
                    <ShapeTool onClick={() => editor?.addRoundRectangle()} icon={FaSquare} />
                    <ShapeTool onClick={() => editor?.addCircle()} icon={FaCircle} />
                    <ShapeTool onClick={() => editor?.addTriangle()} icon={IoTriangleSharp} />
                    <ShapeTool onClick={() => editor?.addInverseTriangle()} icon={IoTriangleSharp} iconClassName='rotate-180' />
                    <ShapeTool onClick={() => editor?.addDiamond()} icon={MdSquare} iconClassName='rotate-45' />
                    <ShapeTool onClick={() => editor?.addPentagon()} icon={RiPentagonFill} />
                    <ShapeTool onClick={() => editor?.addHexagon()} icon={RiHexagonFill} iconClassName='rotate-90' />
                    <ShapeTool onClick={() => editor?.addHexagonHorizontal()} icon={RiHexagonFill} />
                    <ShapeTool onClick={() => editor?.addStar()} icon={LiaStarSolid} />
                    <ShapeTool onClick={() => editor?.addArrowRight()} icon={ImArrowRight} />
                    <ShapeTool onClick={() => editor?.addArrowLeft()} icon={ImArrowLeft} />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default ShapeSidebar;