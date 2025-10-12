import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ActiveTool, Editor } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AiSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const AiSidebar = ({ activeTool, editor, onChangeActiveTool }: AiSidebarProps) => {

    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside className={cn('w-[360px] flex flex-col relative border-r z-40 max-h-[calc(100vh-56px)]', activeTool === 'ai' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Ai' description='Generate an image using AI' />
            <ScrollArea className='overflow-auto'>
                <form className='p-4 space-y-6'>
                    <Textarea
                        placeholder='Write something...'
                        cols={30}
                        rows={10}
                        required
                        minLength={3}
                        className='field-sizing-fixed'
                    />
                    <Button type='submit' className='w-full'>Generate</Button>
                </form>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default AiSidebar;