import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "@/types/types";
import { cn } from "@/lib/utils";
import { fonts } from "@/constants/constants";

interface FontSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const FontSidebar = ({ activeTool, editor, onChangeActiveTool }: FontSidebarProps) => {
    const fontFamily = editor?.getActiveFontFamily();

    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside className={cn('w-[360px] h-full relative z-40 border-r', activeTool === 'font' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Font' description='Change font family' />
            <ScrollArea className='overflow-auto'>
                <div className='p-4 space-y-1'>
                    {fonts.map((font, idx) => <Button
                        key={idx}
                        variant='ghost'
                        onClick={() => editor?.changeFontFamily(font)}
                        className={cn('w-full text-left justify-start rounded-none', fontFamily === font && 'bg-gray-100')}
                        style={{
                            fontFamily: font,
                            fontSize: '16px',
                        }}
                    >
                        {font}
                    </Button>)}
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default FontSidebar;