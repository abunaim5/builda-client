import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "@/types/types";
import { cn } from "@/lib/utils";
import { filters } from "@/constants/constants";

interface FilterSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const FilterSidebar = ({ activeTool, editor, onChangeActiveTool }: FilterSidebarProps) => {
    const filterVal = editor?.getActiveFilters() || [];

    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside className={cn('w-[360px] h-full relative z-40 border-r', activeTool === 'filter' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Filters' description='Apply filters to images' />
            <ScrollArea className=''>
                <div className='p-4 space-y-1'>
                    {filters.map((filter, idx) => <Button
                        key={idx}
                        variant='ghost'
                        onClick={() => editor?.changeImageFilter(filter)}
                        className={cn('w-full text-left justify-start rounded-none', filterVal[0] === filter && 'bg-gray-100')}
                    >
                        {filter}
                    </Button>)}
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default FilterSidebar;