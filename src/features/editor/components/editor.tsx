'use client';
import { useEffect, useRef } from "react";
import useEditor from "../hooks/useEditor";
import { Canvas } from "fabric";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Toolbar from "./toolbar";
import Footer from "./footer";

const Editor = () => {
    const { init } = useEditor();

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
            <Navbar />
            <div className='absolute w-full h-[calc(100vh-56px)] flex top-14'>
                <Sidebar />
                <main className='w-full relative flex flex-col flex-1 overflow-auto bg-muted'>
                    <Toolbar />
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