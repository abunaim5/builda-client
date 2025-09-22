import { Canvas, CanvasEvents, FabricObject } from "fabric";
import { useCallback, useEffect } from "react";

interface UseCanvasEventsProps {
    canvas: Canvas | null;
    setSelectedObjects: (objects: FabricObject[]) => void;
};

const useCanvasEvents = ({ canvas, setSelectedObjects }: UseCanvasEventsProps) => {
    const handleSelectionCreated = useCallback((e: CanvasEvents['selection:created']) => {
        console.log("Selection created:", e.selected);
        setSelectedObjects(e.selected);
    }, [setSelectedObjects]);

    const handleSelectionUpdated = useCallback((e: CanvasEvents['selection:updated']) => {
        console.log("Selection updated:", e.selected);
        setSelectedObjects(e.selected);
    }, [setSelectedObjects]);

    const handleSelectionCleared = useCallback(() => {
        console.log("Selection cleared:", []);
        setSelectedObjects([]);
    }, [setSelectedObjects]);

    useEffect(() => {
        if (!canvas) return
        canvas.on('selection:created', handleSelectionCreated);

        canvas.on('selection:updated', handleSelectionUpdated);

        canvas.on('selection:cleared', handleSelectionCleared);

        return () => {
            if (canvas) {
                canvas.off('selection:created', handleSelectionCreated);
                canvas.off('selection:updated', handleSelectionUpdated);
                canvas.off('selection:cleared', handleSelectionCleared);
            };
        };
    }, [canvas, handleSelectionCreated, handleSelectionUpdated, handleSelectionCleared]);
};

export default useCanvasEvents;