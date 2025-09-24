import { useCallback, useMemo, useState } from "react";
import { Canvas, Circle, FabricObject, InteractiveFabricObject, Polygon, Rect, Shadow, Triangle } from 'fabric';
import { BuildEditorProps, Editor } from "@/types/types";
import { ArrowOptions, CircleOptions, DiamondOptions, FillColor, HexagonOptions, PentagonOptions, RectangleOptions, StarOptions, StrokeColor, StrokeWidth, TriangleOptions } from "@/constants/constants";
import useAutoResize from "./useAutoResize";
import { createArrowLeft, createArrowRight, createDiamond, createInverseTriangle, createRegularPolygon, createStar } from "../utils/shape-factory";
import { isTextType } from "../utils/utils";
import useCanvasEvents from "./useCanvasEvents";

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
const buildEditor = ({ canvas, fillColor, strokeColor, strokeWidth, setFillColor, setStrokeColor, setStrokeWidth, selectedObjects }: BuildEditorProps): Editor => {
    const getWorkspace = () => {
        return canvas
            .getObjects()
            .find((object) => object.name === 'clip');
    }

    const objectCenter = (object: FabricObject) => {
        const workspace = getWorkspace();
        const center = workspace?.getCenterPoint();
        if (!center) return;
        canvas._centerObject(object, center);
    }

    const addToCanvas = (object: FabricObject) => {
        objectCenter(object);
        canvas.add(object);
        canvas.setActiveObject(object);
    }

    return {
        changeFillColor: (value: string) => {
            setFillColor(value);
            canvas.getActiveObjects().forEach((obj) => {
                obj.set({ fill: value, strokeColor: value })
            });
            canvas.renderAll();
        },

        changeStrokeColor: (value: string) => {
            setStrokeColor(value);
            canvas.getActiveObjects().forEach((obj) => {
                // ignore strokes if it is a text type
                if (isTextType(obj.type)) {
                    obj.set({ fill: value });
                    return;
                }
                obj.set({ stroke: value })
            });
            canvas.renderAll();
        },

        changeStrokeWidth: (value: number) => {
            setStrokeWidth(value);
            canvas.getActiveObjects().forEach((obj) => {
                obj.set({ strokeWidth: value, strokeUniform: true });
                obj.setCoords();
            });

            canvas.renderAll();
        },

        // create and add rectangle
        addRectangle: () => {
            const object = new Rect({
                ...RectangleOptions,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            });

            addToCanvas(object);
        },

        // create and add round rectangle
        addRoundRectangle: () => {
            const object = new Rect({
                ...RectangleOptions,
                rx: 50,
                ry: 50,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            });

            addToCanvas(object);
        },

        // create and add circle
        addCircle: () => {
            const object = new Circle({
                ...CircleOptions,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            });

            addToCanvas(object);
        },

        // create and add triangle
        addTriangle: () => {
            const object = new Triangle({
                ...TriangleOptions,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            });

            addToCanvas(object);
        },

        // create and add inverse triangle
        addInverseTriangle: () => {
            const { width, height } = TriangleOptions;

            const object = new Polygon(
                createInverseTriangle(width, height),
                {
                    ...TriangleOptions,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                }
            );

            addToCanvas(object);
        },

        // create and add diamond
        addDiamond: () => {
            const { width, height } = DiamondOptions;

            const object = new Polygon(
                createDiamond(width, height),
                {
                    ...DiamondOptions,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                }
            );

            addToCanvas(object);
        },

        // create and add pentagon
        addPentagon: () => {
            const { width, height } = PentagonOptions;
            const sides = 5;
            // const rotation = -Math.PI / 2;

            const object = new Polygon(
                createRegularPolygon(sides, width, height),
                {
                    ...PentagonOptions,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                }
            );

            addToCanvas(object);
        },

        // create and add Hexagon
        addHexagon: () => {
            const { width, height } = HexagonOptions;
            const sides = 6;

            const object = new Polygon(
                createRegularPolygon(sides, width, height),
                {
                    ...HexagonOptions,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                },
            );

            addToCanvas(object);
        },

        // create and add Hexagon horizontal
        addHexagonHorizontal: () => {
            const { width, height } = HexagonOptions;
            const sides = 6;
            const rotation = Math.PI / 3;

            const object = new Polygon(
                createRegularPolygon(sides, width, height, rotation),
                {
                    ...HexagonOptions,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                },
            );

            addToCanvas(object);
        },

        // create and add Hexagon horizontal
        addStar: () => {
            const { width, height } = StarOptions;
            const points = 5;

            const object = new Polygon(
                createStar(points, width, height),
                {
                    ...StarOptions,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                },
            );

            addToCanvas(object);
        },

        // create and add arrow right
        addArrowRight: () => {
            const { width, height } = ArrowOptions;

            const object = new Polygon(
                createArrowRight(width, height),
                {
                    ...ArrowOptions,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                },
            );

            addToCanvas(object);
        },

        // create and add arrow right
        addArrowLeft: () => {
            const { width, height } = ArrowOptions;

            const object = new Polygon(
                createArrowLeft(width, height),
                {
                    ...ArrowOptions,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                },
            );

            addToCanvas(object);
        },

        canvas,
        getActiveFillColor: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return fillColor;

            const value = selectedObject.get('fill') || fillColor;
            return value as string;
        },
        getActiveStrokeColor: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return strokeColor;

            const value = selectedObject.get('stroke-color') || strokeColor;
            return value as string;
        },

        getActiveStrokeWidth: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return strokeWidth;

            const value = selectedObject.get('strokeWidth') || strokeWidth;
            return value as number;
        },
        selectedObjects
    };
};

const useEditor = () => {
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [selectedObjects, setSelectedObjects] = useState<FabricObject[]>([]);

    const [fillColor, setFillColor] = useState(FillColor);
    const [strokeColor, setStrokeColor] = useState(StrokeColor);
    const [strokeWidth, setStrokeWidth] = useState(StrokeWidth);

    useAutoResize({ canvas, container });
    useCanvasEvents({
        canvas,
        setSelectedObjects
    });

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({
                canvas,
                fillColor,
                strokeColor,
                strokeWidth,
                setFillColor,
                setStrokeColor,
                setStrokeWidth,
                selectedObjects
            });
        }

        return undefined;
    }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects]);

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