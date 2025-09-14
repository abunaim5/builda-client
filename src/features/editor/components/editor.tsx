'use client';
import { useEffect, useRef } from "react";
import useEditor from "../hooks/useEditor";
import { Canvas } from "fabric";

const Editor = () => {
    const { init } = useEditor();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fabricCanvasRef = useRef<Canvas | null>(null);

    useEffect(() => {
        if(!fabricCanvasRef || !canvasRef.current || !containerRef.current) return;

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
            if(fabricCanvasRef.current) {
                fabricCanvasRef.current.dispose();
                fabricCanvasRef.current = null;
            }
        };

    }, [init]);

    return (
        <div className='h-full flex flex-col'>
            <div className='flex-1 h-full bg-muted' ref={containerRef}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};

export default Editor;