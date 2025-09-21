type Point = { x: number; y: number };

export const createInverseTriangle = (width: number, height: number) => {
    return [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width / 2, y: height }
    ];
};

export const createDiamond = (width: number, height: number) => {
    return [
        { x: width / 2, y: 0 },
        { x: width, y: height / 2 },
        { x: width / 2, y: height },
        { x: 0, y: height / 2 },
    ];
};

export const createRegularPolygon = (sides: number, width: number, height: number, rotation = -Math.PI / 2) => {
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;
    const angleStep = (2 * Math.PI) / sides;

    return Array.from({ length: sides }, (_, i) => ({
        x: centerX + radius * Math.cos(angleStep * i + rotation),
        y: centerY + radius * Math.sin(angleStep * i + rotation)
    }));
};

export const createStar = (pointsCount: number, width: number, height: number) => {
    const outerRadius = Math.min(width, height) / 2;
    const innerRadius = outerRadius / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    return Array.from({length: pointsCount * 2}, (_, i) => {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI / pointsCount) * i - Math.PI / 2;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    });
};