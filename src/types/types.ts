import { Canvas, FabricObject } from "fabric";

export type ActiveTool =
    | 'select'
    | 'shapes'
    | 'text'
    | 'images'
    | 'draw'
    | 'fill'
    | 'filter'
    | 'stroke-color'
    | 'stroke-width'
    | 'font'
    | 'opacity'
    | 'settings'
    | 'ai'
    | 'templates'
    | 'remove-bg';

export type BuildEditorProps = {
    canvas: Canvas;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    selectedObjects: FabricObject[];
    setFillColor: (value: string) => void;
    setStrokeColor: (value: string) => void;
    setStrokeWidth: (value: number) => void;
};

export interface Editor {
    addCircle: () => void;
    addRectangle: () => void;
    addRoundRectangle: () => void;
    addTriangle: () => void;
    addInverseTriangle: () => void;
    addDiamond: () => void;
    addPentagon: () => void;
    addHexagon: () => void;
    addHexagonHorizontal: () => void;
    addStar: () => void;
    addArrowRight: () => void;
    addArrowLeft: () => void;

    canvas: Canvas;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    changeFillColor: (value: string) => void;
    changeStrokeColor: (value: string) => void;
    changeStrokeWidth: (value: number) => void;
    selectedObjects: FabricObject[];
};