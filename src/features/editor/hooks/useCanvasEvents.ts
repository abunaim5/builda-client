import { Canvas, CanvasEvents, FabricObject } from "fabric";
import { useCallback, useEffect } from "react";

interface UseCanvasEventsProps {
    canvas: Canvas | null;
    setSelectedObjects: (objects: FabricObject[]) => void;
};

const useCanvasEvents = ({ canvas, setSelectedObjects }: UseCanvasEventsProps) => {
    const handleSelection = useCallback((e: CanvasEvents['selection:created' | 'selection:updated']) => {
        setSelectedObjects(e.selected);
    }, [setSelectedObjects]);

    // objects snapping to canvas grid
    const handleMoving = useCallback((e: CanvasEvents['object:moving']) => {
        const obj = e.target;
        if (obj) {
            obj.set({
                left: Math.round(obj.left! / 6) * 6,
                top: Math.round(obj.top! / 6) * 6,
            });
        }
    }, []);

    const handleCleared = useCallback(() => {
        setSelectedObjects([]);
    }, [setSelectedObjects]);

    useEffect(() => {
        if (!canvas) return
        canvas.on('selection:created', handleSelection);
        canvas.on('selection:updated', handleSelection);
        canvas.on('object:moving', handleMoving);
        canvas.on('selection:cleared', handleCleared);

        return () => {
            if (canvas) {
                canvas.off('selection:created', handleSelection);
                canvas.off('selection:updated', handleSelection);
                canvas.off('object:moving', handleMoving);
                canvas.off('selection:cleared', handleCleared);
            };
        };
    }, [canvas, handleSelection, handleMoving, handleCleared]);
};

export default useCanvasEvents;