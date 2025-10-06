import { useCallback, useMemo, useState } from "react";
import { BuildEditorProps, Editor } from "@/types/types";
import {
    Canvas,
    Circle,
    FabricImage,
    FabricObject,
    InteractiveFabricObject,
    Polygon,
    Rect,
    Shadow,
    Textbox,
    Triangle,
    util,
} from 'fabric';
import {
    ArrowOptions,
    CircleOptions,
    DiamondOptions,
    FillColor,
    FontFamily,
    FontSize,
    FontWeight,
    HexagonOptions,
    PentagonOptions,
    RectangleOptions,
    StarOptions,
    StrokeColor,
    StrokeDashArray,
    StrokeWidth,
    TextOptions,
    TriangleOptions
} from "@/constants/constants";
import {
    createArrowLeft,
    createArrowRight,
    createDiamond,
    createInverseTriangle,
    createRegularPolygon,
    createStar
} from "../utils/shape-factory";
import { isFabricText, isTextType } from "../utils/utils";
import useAutoResize from "./useAutoResize";
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
const buildEditor = ({
    canvas,
    fontFamily,
    fillColor,
    strokeColor,
    strokeWidth,
    setFillColor,
    strokeDashArray,
    setFontFamily,
    // setFontWeight,
    setStrokeColor,
    setStrokeWidth,
    setStrokeDashArray,
    selectedObjects
}: BuildEditorProps): Editor => {
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
        // object bring forward and send backward functionalities
        bringForward: () => {
            canvas.getActiveObjects().forEach((obj) => {
                canvas.bringObjectForward(obj);
            });

            canvas.renderAll();

            const workspace = getWorkspace();
            if (!workspace) return;
            canvas.sendObjectToBack(workspace);
        },

        sendBackwards: () => {
            canvas.getActiveObjects().forEach((obj) => {
                canvas.sendObjectBackwards(obj);
            });

            canvas.renderAll();

            const workspace = getWorkspace();
            if (!workspace) return;
            canvas.sendObjectToBack(workspace);
        },

        // font related functionality
        changeFontFamily: (value: string) => {
            setFontFamily(value);
            canvas.getActiveObjects().forEach((obj) => {
                if (isTextType(obj.type)) {
                    obj.set({ fontFamily: value });
                }
            });
            canvas.renderAll();
        },

        changeFontSize: (value: number) => {
            canvas.getActiveObjects().forEach((obj) => {
                if (isTextType(obj.type)) {
                    obj.set({ fontSize: value });
                }
            });
            canvas.renderAll();
        },

        changeFontWeight: (value: number) => {
            canvas.getActiveObjects().forEach((obj) => {
                if (isTextType(obj.type)) {
                    obj.set({ fontWeight: value });
                }
            });
            canvas.renderAll();
        },

        changeFontItalic: (value: string) => {
            canvas.getActiveObjects().forEach((obj) => {
                if (isTextType(obj.type)) {
                    obj.set({ fontStyle: value });
                }
            });
            canvas.renderAll();
        },

        changeFontUnderline: (value: boolean) => {
            canvas.getActiveObjects().forEach((obj) => {
                if (isTextType(obj.type)) {
                    obj.set({ underline: value });
                }
            });
            canvas.renderAll();
        },

        changeFontStrikethrough: (value: boolean) => {
            canvas.getActiveObjects().forEach((obj) => {
                if (isTextType(obj.type)) {
                    obj.set({ linethrough: value });
                }
            });
            canvas.renderAll();
        },

        changeTextTransform: (value: string) => {
            canvas.getActiveObjects().forEach((obj) => {
                if (isFabricText(obj)) {
                    if (value === 'uppercase') {
                        const capitalizeText = obj.text.toUpperCase();
                        obj.set({ 'text': capitalizeText });
                    } else {
                        // This "false" method returns only the first letter capitalized and other letter converted to lowercase
                        const normalText = util.string.capitalize(obj.text, false);
                        obj.set({ 'text': normalText });
                    }
                }
            });
            canvas.renderAll();
        },

        changeTextAlign: (value: string) => {
            canvas.getActiveObjects().forEach((obj) => {
                if (isTextType(obj.type)) {
                    obj.set({ textAlign: value });
                }
            });
            canvas.renderAll();
        },

        // change object color, width and dash array functionalities
        changeOpacity: (value: number) => {
            canvas.getActiveObjects().forEach((obj) => {
                obj.set({ opacity: value });
            });

            canvas.renderAll();
        },

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

        changeStrokeDashArray: (value: number[]) => {
            setStrokeDashArray(value);
            canvas.getActiveObjects().forEach((obj) => {
                obj.set({ strokeDashArray: value, strokeUniform: true });
                obj.setCoords();
            });

            canvas.renderAll();
        },

        // delete objects to the canvas
        deleteObj: () => {
            canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
            canvas.discardActiveObject();
            canvas.renderAll();
        },

        addImage: async (value: string) => {
            const workspace = getWorkspace();
            if (!workspace) return;

            try {
                const img = await FabricImage.fromURL(value);
                if (!img) return;

                img.scaleToWidth(workspace?.width || 0);
                img.scaleToHeight(workspace?.height || 0);

                addToCanvas(img);
            } catch (err) {
                console.error('Error loading image:', err);
            }
        },

        // create and add text functionality
        addText: (value, options) => {
            const obj = new Textbox(value, {
                ...TextOptions,
                ...options,
                fill: fillColor,
            });

            addToCanvas(obj);
        },

        // create and add rectangle
        addRectangle: () => {
            const object = new Rect({
                ...RectangleOptions,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
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
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });

            addToCanvas(object);
        },

        // create and add circle
        addCircle: () => {
            const object = new Circle({
                ...CircleOptions,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });

            addToCanvas(object);
        },

        // create and add triangle
        addTriangle: () => {
            const object = new Triangle({
                ...TriangleOptions,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
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
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
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
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
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
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
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
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
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
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
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
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
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
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
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
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
                },
            );

            addToCanvas(object);
        },

        canvas,

        getActiveFontFamily: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return fontFamily;

            const value = selectedObject.get('fontFamily') || fontFamily;
            return value as string;
        },

        getActiveFontSize: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return FontSize;

            const value = selectedObject.get('fontSize') || FontSize;
            return value;
        },

        getActiveFontWeight: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return FontWeight;

            const value = selectedObject.get('fontWeight') || FontWeight;
            return value;
        },

        getActiveFontItalic: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return 'normal';

            const value = selectedObject.get('fontStyle') || 'normal';
            return value;
        },

        getActiveFontUnderline: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return false;

            const value = selectedObject.get('underline') || false;
            return value;
        },

        getActiveFontStrikethrough: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return false;

            const value = selectedObject.get('linethrough') || false;
            return value;
        },

        getActiveTextTransform: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return 'none';

            const value = selectedObject.get('textTransform') || 'none';
            return value as string;
        },

        getActiveTextAlign: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return 'left';

            const value = selectedObject.get('textAlign') || 'left';
            return value;
        },

        getActiveOpacity: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return 1;

            const value = selectedObject.get('opacity') || 1;
            return value;
        },

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

        getActiveStrokeDashArray: () => {
            const selectedObject = selectedObjects[0];
            if (!selectedObject) return strokeDashArray;

            const value = selectedObject.get('strokeDashArray') || strokeDashArray;
            return value;
        },

        selectedObjects
    };
};

const useEditor = () => {
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [selectedObjects, setSelectedObjects] = useState<FabricObject[]>([]);

    const [fontFamily, setFontFamily] = useState(FontFamily);
    const [fillColor, setFillColor] = useState(FillColor);
    const [strokeColor, setStrokeColor] = useState(StrokeColor);
    const [strokeWidth, setStrokeWidth] = useState(StrokeWidth);
    const [strokeDashArray, setStrokeDashArray] = useState<number[]>(StrokeDashArray);

    useAutoResize({ canvas, container });
    useCanvasEvents({
        canvas,
        setSelectedObjects
    });

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({
                canvas,
                fontFamily,
                // fontWeight,
                fillColor,
                strokeColor,
                strokeWidth,
                strokeDashArray,
                setFontFamily,
                // setFontWeight,
                setFillColor,
                setStrokeColor,
                setStrokeWidth,
                setStrokeDashArray,
                selectedObjects
            });
        }

        return undefined;
    }, [canvas, fontFamily, fillColor, strokeColor, strokeWidth, strokeDashArray, selectedObjects]);

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