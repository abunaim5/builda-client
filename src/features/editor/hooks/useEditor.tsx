import { useCallback, useState } from "react";
import { Canvas, FabricObject, InteractiveFabricObject, Rect, Shadow } from 'fabric';
import useAutoResize from "./useAutoResize";

declare module 'fabric' {
    interface FabricObject {
        name?: string;
        id?: string;
    }
    interface SerializedObjectProps {
        name?: string;
        id?: string;
    }
}

FabricObject.customProperties = ['name'];

export interface InitEditorProps {
    initialContainer: HTMLDivElement;
    initialCanvas: Canvas;
};

const useEditor = () => {
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    useAutoResize({ canvas, container });

    const init = useCallback(({ initialContainer, initialCanvas }: InitEditorProps) => {
        // added custom control classes 
        InteractiveFabricObject.ownDefaults = {
            ...InteractiveFabricObject.ownDefaults,
            cornerStyle: 'circle',
            cornerColor: '#FFF',
            borderColor: '#8B3DFF',
            cornerStrokeColor: '#0000001A',
            borderScaleFactor: 1.7,
            transparentCorners: false,
            borderOpacityWhenMoving: 1,
            hoverCursor: 'default',
        };

        const initialWorkspace = new Rect({
            name: 'clip',
            width: 900,
            height: 1200,
            fill: 'white',
            selectable: false,
            hasControls: false,
            shadow: new Shadow({
                color: 'rgba(0,0,0,0.8)',
                blur: 5
            }),
        });

        initialCanvas.setDimensions({
            width: initialContainer.offsetWidth,
            height: initialContainer.offsetHeight
        });

        initialCanvas.add(initialWorkspace);
        initialCanvas.centerObject(initialWorkspace);
        initialCanvas.clipPath = initialWorkspace;

        setCanvas(initialCanvas);
        setContainer(initialContainer);

        const test = new Rect({
            width: 200,
            height: 200,
            fill: 'black'
        });
        initialCanvas.add(test);
        initialCanvas.centerObject(test);

    }, []);

    return { init }
};

export default useEditor;