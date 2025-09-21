'use client';
import { CloudUpload, Download, MousePointerClick, Pencil, Redo2, SquarePen, Undo2 } from "lucide-react";
import { BsCloudCheck } from "react-icons/bs";
import { CiExport } from "react-icons/ci";
import { FaCrown } from "react-icons/fa";
import Logo from "./logo";
import { ActiveTool } from "@/types/types";
import AutoResizeInput from "@/components/custom/auto-resize-input";
import CustomTooltip from "@/components/custom/custom-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
import { cn } from "@/lib/utils";

interface NavbarProps {
    activeTool: ActiveTool;
    onchangeActiveTool: (tool: ActiveTool) => void;
}

const Navbar = ({ activeTool, onchangeActiveTool }: NavbarProps) => {
    return (
        <nav className='w-full h-14 flex items-center justify-between py-2 px-4 lg:px-6 border-b gap-x-8'>
            <div className='h-full flex items-center gap-x-8'>
                <Logo />
                <div className='w-full h-full flex items-center gap-x-1'>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">File</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-60" align="start">
                            <DropdownMenuLabel>
                                <div className='flex text-base items-center gap-x-2'>
                                    Rename project <Pencil className='size-5' />
                                </div>
                                <span className='text-xs font-normal text-muted-foreground select-none'>Logo By Abu Naim</span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <SquarePen className='size-5' /> <span>Create new design</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CloudUpload className='size-5' /> <span>Upload JSON files</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Separator orientation='vertical' className='mx-2' />
                    <CustomTooltip label='Select'>
                        <Button variant='ghost' size='icon' className={cn(activeTool === 'select' && 'bg-muted text-[#5BD0F4]')} onClick={() => onchangeActiveTool('select')}>
                            <MousePointerClick className='size-5' />
                        </Button>
                    </CustomTooltip>
                    <CustomTooltip label='Undo'>
                        <Button variant='ghost' size='icon' className=''>
                            <Undo2 className='size-5' />
                        </Button>
                    </CustomTooltip>
                    <CustomTooltip label='Redo'>
                        <Button variant='ghost' size='icon' className=''>
                            <Redo2 className='size-5' />
                        </Button>
                    </CustomTooltip>
                    <Separator orientation='vertical' className='mx-2' />
                    <div className='flex items-center gap-2 ml-2 text-muted-foreground'>
                        <BsCloudCheck className='size-5' />
                        <span className='text-sm'>Saved</span>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-x-2'>
                <AutoResizeInput initialValue='Builda' placeholder='Untitled design' className='border-none shadow-none focus-visible:ring-1 font-semibold' />
                <Button variant='outline' className='shadow-none'>
                    <FaCrown className='size-4 text-[#FDBC68]' /> <span>Go Pro</span>
                </Button>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='shadow-none'>
                            <CiExport className='size-5 stroke-1' /> <span>Share</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='min-w-72' align='center'>
                        <DropdownMenuLabel>
                            <p className='flex text-base items-center gap-x-2'>
                                Download
                            </p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Button variant='destructive' className='shadow-none w-full'>
                                    Download
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};

export default Navbar;