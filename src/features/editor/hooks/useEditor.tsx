import { useCallback } from "react";
import { Canvas, InteractiveFabricObject, Rect, Shadow } from 'fabric';

export interface InitEditorProps {
    initialContainer: HTMLDivElement;
    initialCanvas: Canvas;
};

const useEditor = () => {
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
            width: 900,
            height: 1200,
            name: 'clip',
            fill: 'white',
            selectable: false,
            hasControls: false,
            shadow: new Shadow({
                color: 'rgba(0,0,0,0.8)',
                blur: 5
            })
        });

        initialCanvas.setDimensions({
            width: initialContainer.offsetWidth,
            height: initialContainer.offsetHeight
        });

        initialCanvas.add(initialWorkspace);
        initialCanvas.centerObject(initialWorkspace);
        initialCanvas.clipPath = initialWorkspace;

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