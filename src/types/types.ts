import { Canvas } from "fabric";

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
};