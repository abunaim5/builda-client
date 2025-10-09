'use client'
import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveTool, Editor } from "@/types/types";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";
import { twMerge } from "tailwind-merge";

interface UploadsSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const UploadsSidebar = ({ activeTool, editor, onChangeActiveTool }: UploadsSidebarProps) => {

    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside className={cn('w-[360px] h-full relative border-r z-40', activeTool === 'uploads' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Files' description='Your uploaded files' />
            <div className='p-4 border-b'>
                <UploadButton
                    endpoint='imageUploader'
                    onClientUploadComplete={(res) => {
                        console.log(res)
                        editor?.addImage(res[0].ufsUrl)
                    }}
                    appearance={{
                        button: 'w-full text-sm font-medium',
                        allowedContent: 'hidden',
                    }}
                    content={{
                        button: 'Upload images',
                        allowedContent: ''
                    }}
                    onUploadError={(error: Error) => {
                        console.error(`ERROR! ${error.message}`);
                    }}
                    config={{ cn: twMerge }}
                    className='ut-button:bg-[#0F52FF] hover:ut-button:bg-blue-700 ut-button:ut-readying:bg-[#0F52FF]/50'
                />
            </div>
            <ScrollArea className='overflow-auto'>
                <div className='p-4'>
                    <div className='grid grid-cols-2 gap-4'>

                    </div>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default UploadsSidebar;