import { Canvas, CanvasEvents, iMatrix, Point, TMat2D, util } from "fabric";
import { useCallback, useEffect } from "react";

interface AutoResizeProps {
    canvas: Canvas | null;
    container: HTMLDivElement | null;
}

const useAutoResize = ({ canvas, container }: AutoResizeProps) => {
    const autoZoom = useCallback(() => {
        if (!canvas || !container) return;

        const width = container.offsetWidth;
        const height = container.offsetHeight;

        canvas.setDimensions({
            width: width,
            height: height
        });

        const center: CanvasEvents = canvas.getCenterPoint();
        const zoomRatio = 0.85;
        const localWorkspace = canvas.getObjects().find((object) => object.name === 'clip');

        if (!localWorkspace) return;

        const scale = util.findScaleToFit(localWorkspace, {
            width: width,
            height: height
        });
        const zoom = zoomRatio * scale;
        console.log(iMatrix.concat() as TMat2D);
        canvas.setViewportTransform(iMatrix.concat() as TMat2D);
        // canvas.zoomToPoint(new Point(center.left, center.top), zoom);

    }, [canvas, container]);

    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null;

        if (canvas && container) {
            resizeObserver = new ResizeObserver(() => {
                autoZoom();
            });

            resizeObserver.observe(container);
        };

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [canvas, container, autoZoom]);
};

export default useAutoResize;