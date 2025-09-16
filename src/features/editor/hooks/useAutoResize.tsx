import { Canvas, iMatrix, Point, Rect, util } from "fabric";
import { useCallback, useEffect } from "react";

interface AutoResizeProps {
    canvas: Canvas | null;
    container: HTMLDivElement | null;
}

const useAutoResize = ({ canvas, container }: AutoResizeProps) => {
    const autoZoom = useCallback(async () => {
        if (!canvas || !container) return;

        const width = container.offsetWidth;
        const height = container.offsetHeight;

        canvas.setDimensions({
            width: width,
            height: height
        });

        const center = canvas.getCenterPoint();
        const zoomRatio = 0.85;
        const localWorkspace = canvas.getObjects().find((object) => object.name === 'clip');

        if (!localWorkspace) return;

        const scale = util.findScaleToFit(localWorkspace, {
            width: width,
            height: height
        });
        const zoom = zoomRatio * scale;
        canvas.setViewportTransform(iMatrix);
        canvas.zoomToPoint(new Point(center), zoom);

        const workspaceCenter = localWorkspace.getCenterPoint();
        const viewportTransform = canvas.viewportTransform;

        if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return;

        // calculate the position of canvas
        viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
        viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

        canvas.setViewportTransform(viewportTransform);

        const clonedWorkspace = await localWorkspace.clone();
        // clipping canvas for new workspace
        canvas.clipPath = clonedWorkspace as Rect;
        canvas.renderAll();

    }, [canvas, container]);

    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null;

        if (canvas && container) {
            resizeObserver = new ResizeObserver(() => {
                autoZoom();
            });

            resizeObserver.observe(container);
        };

        // need to disconnect observer
        return () => {
            if (resizeObserver) resizeObserver.disconnect();
        };
    }, [canvas, container, autoZoom]);
};

export default useAutoResize;