'use client';
import { CloudCheck, CloudUpload, MousePointerClick, Pencil, Redo2, SquarePlus, Undo2 } from "lucide-react";
import Logo from "./logo";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";


const Navbar = () => {
    return (
        <nav className='w-full h-14 flex items-center py-2 px-4 lg:px-6 border-b gap-x-8'>
            <Logo />
            <div className='w-full h-full flex items-center gap-x-1'>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">File</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-60" align="start">
                        <DropdownMenuLabel>
                            <div className='flex text-base items-center gap-x-2'>
                                Rename project <Pencil size={16} />
                            </div>
                            <span className='text-xs font-normal text-muted-foreground select-none'>Logo By Abu Naim</span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <SquarePlus size={32} /> <span>Create new design</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CloudUpload size={32} /> <span>Upload JSON files</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation='vertical' className='mx-2' />
                <Button variant='ghost' size='icon' className=''>
                    <MousePointerClick size={16} />
                </Button>
                <Button variant='ghost' size='icon' className=''>
                    <Undo2 size={16} />
                </Button>
                <Button variant='ghost' size='icon' className=''>
                    <Redo2 size={16} />
                </Button>
                <Separator orientation='vertical' className='mx-2' />
                <Button variant='ghost' size='icon' className=''>
                    <CloudCheck size={16} />
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;