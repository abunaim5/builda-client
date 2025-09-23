'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import useEditor from "../hooks/useEditor";
import { Canvas } from "fabric";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Toolbar from "./toolbar";
import Footer from "./footer";
import { ActiveTool } from "@/types/types";
import ShapeSidebar from "./shape-sidebar";
import FillColorSidebar from "./fill-color-sidebar";

const Editor = () => {
    const { init, editor } = useEditor();
    const [activeTool, setActiveTool] = useState<ActiveTool>('select');
    const onChangeActiveTool = useCallback((tool: ActiveTool) => {
        if (tool === activeTool) {
            return setActiveTool('select');
        }

        setActiveTool(tool);
    }, [activeTool]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fabricCanvasRef = useRef<Canvas | null>(null);

    useEffect(() => {
        if (!fabricCanvasRef || !canvasRef.current || !containerRef.current) return;

        const options = {
            controlsAboveOverlay: true,
            preserveObjectStacking: true
        };

        fabricCanvasRef.current = new Canvas(canvasRef.current, options);

        init({
            initialCanvas: fabricCanvasRef.current,
            initialContainer: containerRef.current
        });

        // cleanup function
        return () => {
            if (fabricCanvasRef.current) {
                fabricCanvasRef.current.dispose();
                fabricCanvasRef.current = null;
            }
        };

    }, [init]);

    return (
        <div className='h-full flex flex-col'>
            <Navbar activeTool={activeTool} onchangeActiveTool={onChangeActiveTool} />
            <div className='absolute w-full h-[calc(100vh-56px)] flex top-14'>
                <Sidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
                <ShapeSidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                    editor={editor}
                />
                <FillColorSidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                    editor={editor}
                />
                <main className='relative flex flex-col flex-1 overflow-auto bg-muted'>
                    <Toolbar
                        editor={editor}
                        activeTool={activeTool}
                        onchangeActiveTool={onChangeActiveTool}
                        key={JSON.stringify(editor?.canvas.getActiveObject())}
                    />
                    <div className='flex-1 h-[calc(100vh-100px)] bg-muted' ref={containerRef}>
                        <canvas ref={canvasRef} />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default Editor;