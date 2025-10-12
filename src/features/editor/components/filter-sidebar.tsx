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
        <aside className={cn('w-[360px] flex flex-col relative border-r z-40 max-h-[calc(100vh-56px)]', activeTool === 'filter' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Filters' description='Apply filters to images' />
            <ScrollArea className='overflow-auto'>
                <div className='p-4 space-y-1'>
                    {filters.map((filter, idx) => <Button
                        key={idx}
                        variant='ghost'
                        onClick={() => editor?.changeImageFilter(filter)}
                        className={cn('w-full text-left justify-start rounded-none', filterVal[0] === filter && 'bg-gray-100')}
                    >
                        {/* Uppercase the first letter */}
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Button>)}
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default FilterSidebar;