type Point = { x: number; y: number };
interface PolygonProps {
    sides: number;
    width: number;
    height: number;
};

export const createPentagon = ({ sides, width, height }: PolygonProps) => {
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;
    const angleStep = (2 * Math.PI) / sides;
    const rotation = -Math.PI / 2;

    return Array.from({ length: sides }, (_, i) => ({
        x: centerX + radius * Math.cos(angleStep * i + rotation),
        y: centerY + radius * Math.sin(angleStep * i + rotation)
    }));
};