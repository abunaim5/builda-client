import { Canvas, FabricObject, ITextProps } from "fabric";

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
    fontFamily: string;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    strokeDashArray: number[];
    selectedObjects: FabricObject[];
    setFontFamily: (value: string) => void;
    setFillColor: (value: string) => void;
    setStrokeColor: (value: string) => void;
    setStrokeWidth: (value: number) => void;
    setStrokeDashArray: (value: number[]) => void;
};

export interface Editor {
    addText: (value: string, options?: Partial<ITextProps>) => void;
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
    getActiveFontFamily: () => string;
    getActiveFontSize: () => number;
    getActiveFontWeight: () => number;
    getActiveFontItalic: () => string;
    getActiveFontUnderline: () => boolean;
    getActiveFontStrikethrough: () => boolean;
    getActiveTextTransform: () => string;
    getActiveTextAlign: () => string;
    getActiveOpacity: () => number;
    getActiveFillColor: () => string;
    getActiveStrokeColor: () => string;
    getActiveStrokeWidth: () => number;
    getActiveStrokeDashArray: () => number[];
    bringForward: () => void;
    sendBackwards: () => void;
    changeFontFamily: (value: string) => void;
    changeFontSize: (value: number) => void;
    changeFontWeight: (value: number) => void;
    changeFontItalic: (value: string) => void;
    changeFontUnderline: (value: boolean) => void;
    changeFontStrikethrough: (value: boolean) => void;
    changeTextTransform: (value: string) => void;
    changeTextAlign: (value: string) => void;
    changeOpacity: (value: number) => void;
    changeFillColor: (value: string) => void;
    changeStrokeColor: (value: string) => void;
    changeStrokeWidth: (value: number) => void;
    changeStrokeDashArray: (value: number[]) => void;
    deleteObj: () => void;
    selectedObjects: FabricObject[];
};