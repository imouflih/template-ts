import Point from './point';

type Matrix3x3Values = [
    [number, number, number],
    [number, number, number],
    [number, number, number]
];

class Matrix3x3 {
    constructor(public values: Matrix3x3Values) { }

    static multiply(m1: Matrix3x3, m2: Matrix3x3): Matrix3x3 {
        const result: Matrix3x3Values = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                result[i][j] =
                    m1.values[i][0] * m2.values[0][j] +
                    m1.values[i][1] * m2.values[1][j] +
                    m1.values[i][2] * m2.values[2][j];
            }
        }

        return new Matrix3x3(result);
    }

    static inverse(m: Matrix3x3): Matrix3x3 | null {
        const det = Matrix3x3.determinant(m);

        if (det === 0) return null;

        const invDet = 1 / det;
        const [[a, b, c], [d, e, f], [g, h, i]] = m.values;

        const result: Matrix3x3Values = [
            [
                (e * i - f * h) * invDet,
                (c * h - b * i) * invDet,
                (b * f - c * e) * invDet,
            ],
            [
                (f * g - d * i) * invDet,
                (a * i - c * g) * invDet,
                (c * d - a * f) * invDet,
            ],
            [
                (d * h - e * g) * invDet,
                (b * g - a * h) * invDet,
                (a * e - b * d) * invDet,
            ],
        ];

        return new Matrix3x3(result);
    }

    static determinant(m: Matrix3x3): number {
        const [[a, b, c], [d, e, f], [g, h, i]] = m.values;
        return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    }

    static transformPoint(m: Matrix3x3, p: Point): Point {
        const { x, y } = p;
        const [[a, b, c], [d, e, f]] = m.values;

        const transformedX = x * a + y * b + c;
        const transformedY = x * d + y * e + f;

        return new Point(transformedX, transformedY);
    }

    static translationMatrix(tx: number, ty: number): Matrix3x3 {
        return new Matrix3x3([
            [1, 0, tx],
            [0, 1, ty],
            [0, 0, 1],
        ]);
    }

    static rotationMatrix(angle: number): Matrix3x3 {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Matrix3x3([
            [cos, -sin, 0],
            [sin, cos, 0],
            [0, 0, 1],
        ]);
    }

    static scalingMatrix(sx: number, sy: number): Matrix3x3 {
        return new Matrix3x3([
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1],
        ]);
    }
}

export default Matrix3x3;
