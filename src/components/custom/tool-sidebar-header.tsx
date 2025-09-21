interface ToolSidebarHeaderProps {
    title: string;
    description?: string;
};

const ToolSidebarHeader = ({ title, description }: ToolSidebarHeaderProps) => {
    return (
        <div className='p-4 space-y-1 border-b'>
            <h1 className='text-sm font-medium'>{title}</h1>
            <p className='text-xs text-muted-foreground'>{description}</p>
        </div>
    );
};

export default ToolSidebarHeader;