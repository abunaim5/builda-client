import { useCallback, useMemo, useState } from "react";
import { Canvas, Circle, FabricObject, InteractiveFabricObject, Object, Rect, Shadow, Triangle } from 'fabric';
import { BuildEditorProps, Editor } from "@/types/types";
import { CircleOptions, RectangleOptions, TriangleOptions } from "@/constants/constants";
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

FabricObject.customProperties = ['name', 'id'];

export interface InitEditorProps {
    initialContainer: HTMLDivElement;
    initialCanvas: Canvas;
};

// build editor custom shapes and add to the canvas
const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
    const getWorkspace = () => {
        return canvas
            .getObjects()
            .find((object) => object.name === 'clip');
    }

    const objectCenter = (object: Object) => {
        const workspace = getWorkspace();
        const center = workspace?.getCenterPoint();
        if (!center) return;
        canvas._centerObject(object, center);
    }

    const addToCanvas = (object: Object) => {
        objectCenter(object);
        canvas.add(object);
        canvas.setActiveObject(object);
    }

    return {
        addRectangle: () => {
            const object = new Rect({
                ...RectangleOptions,
            });

            addToCanvas(object);
        },

        addRoundRectangle: () => {
            const object = new Rect({
                ...RectangleOptions,
                rx: 50,
                ry: 50
            });

            addToCanvas(object);
        },

        addCircle: () => {
            const object = new Circle({
                ...CircleOptions
            });

            addToCanvas(object);
        },

        addTriangle: () => {
            const object = new Triangle({
                ...TriangleOptions
            });

            addToCanvas(object);
        },
    };
};

const useEditor = () => {
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    useAutoResize({ canvas, container });

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({ canvas });
        }

        return undefined;
    }, [canvas]);

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
    }, []);

    return { init, editor }
};

export default useEditor;