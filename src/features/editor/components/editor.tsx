'use client';
import { useEffect, useRef } from "react";
import useEditor from "../hooks/useEditor";

const Editor = () => {
    const { init } = useEditor();

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        init({
            initialContainer: containerRef.current!,
            initialCanvas: ''
        });
    }, [init]);

    return (
        <div ref={containerRef}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default Editor;