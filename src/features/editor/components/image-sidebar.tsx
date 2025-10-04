import ToolSidebarClose from "@/components/custom/tool-sidebar-close";
import ToolSidebarHeader from "@/components/custom/tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActiveTool, Editor } from "@/types/types";
import { cn } from "@/lib/utils";
import useGetImages from "@/features/images/api/use-get-images";
import { AlertTriangle, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ImageSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
};

const ImageSidebar = ({ activeTool, editor, onChangeActiveTool }: ImageSidebarProps) => {
    const { data, isLoading, isError } = useGetImages();

    const onClose = () => {
        onChangeActiveTool('select');
    };

    return (
        <aside className={cn('w-[360px] relative border-r z-40 flex flex-col', activeTool === 'images' ? 'visible' : 'hidden')}>
            <ToolSidebarHeader title='Images' description='Add images in canvas' />
            {
                isLoading && (<div className='flex items-center justify-center flex-1'>
                    <Loader className='size-5 text-muted-foreground animate-spin' />
                </div>)
            }
            {
                isError && (<div className='flex flex-col gap-4 items-center justify-center flex-1'>
                    <AlertTriangle className='size-5 text-muted-foreground' />
                    <p className='text-xs text-muted-foreground'>Failed to fetch images</p>
                </div>)
            }
            <ScrollArea className='h-full'>
                <div className='p-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        {data && data.map((image) => {
                            return (
                                <button key={image.id} className='w-full h-[100px] relative group hover:opacity-75 transition rounded-sm overflow-hidden border bg-muted'>
                                    <Image
                                        fill
                                        src={image.urls.small}
                                        alt={image.alt_description || 'Image'}
                                        className='object-cover'
                                    />
                                    <Link href={image.links.html} target='_blank' className='opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-xs truncate text-left hover:underline p-1 text-white bg-black/50'>{image.user.name}</Link>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

export default ImageSidebar;