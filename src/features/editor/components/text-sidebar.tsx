import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "@/types/types";
import { cn } from "@/lib/utils";
import { Type } from "lucide-react";

interface TextSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const TextSidebar = ({ activeTool, editor, onChangeActiveTool }: TextSidebarProps) => {

    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside className={cn('w-[360px] flex flex-col relative border-r z-40 max-h-[calc(100vh-56px)]', activeTool === 'text' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Text' description='Add text in canvas' />
            <ScrollArea className='overflow-auto'>
                <div className='p-4 space-y-4'>
                    <Button
                        onClick={() => editor?.addText('Your paragraph text')}
                        className='w-full bg-[#0F52FF] hover:bg-blue-700'
                    >
                        <Type className='size-5' />
                        <span>Add a text box</span>
                    </Button>

                    <div className='mt-2'>
                        <span className='text-sm font-semibold'>Default text styles</span>
                    </div>
                    <Button
                        variant='outline'
                        onClick={() => editor?.addText('Add a heading', {
                            fontSize: 80,
                            fontWeight: 700,
                        })}
                        className='w-full font-bold text-2xl h-auto'
                    >
                        Add a heading
                    </Button>
                    <Button
                        variant='outline'
                        onClick={() => editor?.addText('Add a subheading', {
                            fontSize: 45,
                            fontWeight: 600,
                        })}
                        className='w-full font-semibold text-lg h-auto'
                    >
                        Add a subheading
                    </Button>
                    <Button
                        variant='outline'
                        onClick={() => editor?.addText('Add a little bit of body text', {
                            fontSize: 32,
                        })}
                        className='w-full text-xs'
                    >
                        Add a little bit of body text
                    </Button>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default TextSidebar;