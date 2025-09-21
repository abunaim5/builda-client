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
};