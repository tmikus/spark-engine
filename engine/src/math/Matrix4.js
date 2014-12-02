/**
 * Class defining a 4x4 matrix.
 * @constructor
 * @class
 */
function Matrix4()
{
    this.m_elements = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
}

Matrix4.prototype =
{
    /**
     * Array of matrix elements.
     * @type {Float32Array}
     */
    m_elements: null,
    /**
     * Clones this matrix.
     * @returns {Matrix4} Clone of this matrix.
     */
    clone: function clone()
    {
        return new Matrix4().copy(this);
    },
    /**
     * Copies values from other matrix to this matrix.
     *
     * @param {Matrix4} matrix Other matrix.
     * @returns {Matrix4} This matrix.
     */
    copy: function copy(matrix)
    {
        this.m_elements.set(matrix.m_elements);
        return this;
    },
    /**
     * Copies the position from the other matrix.
     *
     * @param {Matrix4} matrix Other matrix.
     * @returns {Matrix4} This matrix.
     */
    copyPosition: function copyPosition(matrix)
    {
        var e = matrix.m_elements;
        var me = this.m_elements;

        me[12] = e[12];
        me[13] = e[13];
        me[14] = e[14];

        return this;
    },
    /**
     * Gets the determinant of this matrix.
     *
     * @returns {number} Determiant of this matrix.
     */
    determinant: function determinant()
    {
        var me = this.m_elements;

        var e11 = me[0];
        var e12 = me[4];
        var e13 = me[8];
        var e14 = me[12];
        var e21 = me[1];
        var e22 = me[5];
        var e23 = me[9];
        var e24 = me[13];
        var e31 = me[2];
        var e32 = me[6];
        var e33 = me[10];
        var e34 = me[14];
        var e41 = me[3];
        var e42 = me[7];
        var e43 = me[11];
        var e44 = me[15];

        return (
            e41 * (e14 * e23 * e32 - e13 * e24 * e32 - e14 * e22 * e33 + e12 * e24 * e33 + e13 * e22 * e34 - e12 * e23 * e34)
            + e42 * (e11 * e23 * e34 - e11 * e24 * e33 + e14 * e21 * e33 - e13 * e21 * e34 + e13 * e24 * e31 - e14 * e23 * e31)
            + e43 * (e11 * e24 * e32 - e11 * e22 * e34 - e14 * e21 * e32 + e12 * e21 * e34 + e14 * e22 * e31 - e12 * e24 * e31)
            + e44 * (- e13 * e22 * e31 - e11 * e23 * e32 + e11 * e22 * e33 + e13 * e21 * e32 - e12 * e21 * e33 + e12 * e23 * e31)
        );
    },
    /**
     * Sets this matrix as identity matrix.
     *
     * @returns {Matrix4} This matrix.
     */
    identity: function identity()
    {
        return this.set(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    },
    /**
     * Inverts this matrix.
     *
     * @returns {Matrix4} This matrix.
     */
    inverse: function inverse()
    {
        var determinant = this.determinant();

        if (determinant == 0)
        {
            SE_WARNING("Cannot inverse matrix: Matrix determinant is 0.");
            return this;
        }

        return this.multiplyScalar(1 / determinant);
    },
    /**
     * Configures this matrix to be a frustum.
     *
     * @param {number} left Left side of the frustum.
     * @param {number} right Right side of the frustum.
     * @param {number} bottom Bottom side of the frustum.
     * @param {number} top Top side of the frustum.
     * @param {number} near Near side of the frustum.
     * @param {number} far Far side of the frustum.
     * @returns {Matrix4} This matrix.
     */
    makeFrustum: function makeFrustum(left, right, bottom, top, near, far)
    {
        var me = this.m_elements;

        me[0] = 2 * near / (right - left);
        me[1] = 0;
        me[2] = 0;
        me[3] = 0;

        me[4] = 0;
        me[5] = 2 * near / (top - bottom);
        me[6] = 0;
        me[7] = 0;

        me[8] = (right + left) / (right - left);
        me[9] = (top + bottom) / (top - bottom);
        me[10] = -(far + near) / (far - near);
        me[11] = -1;

        me[12] = 0;
        me[13] = 0;
        me[14] = -2 * far * near / (far - near);
        me[15] = 0;

        return this;
    },
    /**
     * Configures the matrix to work as a orthographic projection.
     *
     * @param {number} left Left side of the view.
     * @param {number} right Right side of the view.
     * @param {number} top Top side of the view.
     * @param {number} bottom Bottom side of the view.
     * @param {number} near Near side of the view.
     * @param {number} far Far side of the view.
     * @returns {Matrix4} This matrix.
     */
    makeOrthographic: function makeOrthographic(left, right, top, bottom, near, far)
    {
        var me = this.m_elements;
        var w = right - left;
        var h = top - bottom;
        var p = far - near;

        var x = (right + left) / w;
        var y = (top + bottom) / h;
        var z = (far + near) / p;

        me[0] = 2 / w;
        me[1] = 0;
        me[2] = 0;
        me[3] = 0;

        me[4] = 0;
        me[5] = 2 / h;
        me[6] = 0;
        me[7] = 0;

        me[8] = 0;
        me[9] = 0;
        me[10] = -2 / p;
        me[11] = 0;

        me[12] = -x;
        me[13] = -y;
        me[14] = -z;
        me[15] = 1;

        return this;
    },
    /**
     * Configures the matrix to work as a perspective projection.
     *
     * @param {number} fov Vertical field of view.
     * @param {number} aspect Aspect ratio.
     * @param {number} near Near plane.
     * @param {number} far Far plane.
     * @returns {Matrix4} This matrix.
     */
    makePerspective: function makePerspective(fov, aspect, near, far)
    {
        var yMax = near * Math.tan(fov * 0.5 * DEGREES_TO_RADIANS);
        var yMin = -yMax;
        var xMin = yMin * aspect;
        var xMax = yMax * aspect;

        return this.makeFrustum(xMin, xMax, yMin, yMax, near, far);
    },
    /**
     * Configures the matrix to be a rotation matrix.
     *
     * @param {Vector3} axisVector Vector containing multipliers for angle for specific axis.
     * @param {number} angle Angle.
     * @returns {Matrix4} This matrix.
     */
    makeRotationAxis: function makeRotationAxis(axisVector, angle)
    {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var tan = 1 - cos;
        var x = axisVector.m_x;
        var y = axisVector.m_y;
        var z = axisVector.m_z;

        var tanX = tan * x;
        var tanY = tan * y;

        return this.set(
            tanX * x + cos, tanX * y - sin * z, tanX * z + sin * y, 0,
            tanX * y + sin * z, tanY * y + cos, tanY * z - sin * x, 0,
            tanX * z - sin * y, tanY * z + sin * x, tan * z * z + cos, 0,
            0, 0, 0, 1
        );
    },
    /**
     * Configures the matrix to be a rotation matrix.
     * Takes the configuration from Euler object.
     *
     * @param {Euler} euler Euler angle configuration.
     * @returns {Matrix4} This matrix.
     */
    makeRotationFromEuler: function makeRotationFromEuler(euler)
    {
        var te = this.elements;

        var x = euler.m_x;
        var y = euler.m_y;
        var z = euler.m_z;
        var a = Math.cos(x);
        var b = Math.sin(x);
        var c = Math.cos(y);
        var d = Math.sin(y);
        var e = Math.cos(z);
        var f = Math.sin(z);

        var ac;
        var ad;
        var ae;
        var af;
        var bc;
        var bd;
        var be;
        var bf;
        var ce;
        var cf;
        var de;
        var df;

        if (euler.m_order === 'XYZ')
        {
            ae = a * e;
            af = a * f;
            be = b * e;
            bf = b * f;

            te[0] = c * e;
            te[4] = -c * f;
            te[8] = d;

            te[1] = af + be * d;
            te[5] = ae - bf * d;
            te[9] = -b * c;

            te[2] = bf - ae * d;
            te[6] = be + af * d;
            te[10] = a * c;
        }
        else if (euler.m_order === 'YXZ')
        {
            ce = c * e;
            cf = c * f;
            de = d * e;
            df = d * f;

            te[0] = ce + df * b;
            te[4] = de * b - cf;
            te[8] = a * d;

            te[1] = a * f;
            te[5] = a * e;
            te[9] = -b;

            te[2] = cf * b - de;
            te[6] = df + ce * b;
            te[10] = a * c;

        }
        else if (euler.m_order === 'ZXY')
        {
            ce = c * e;
            cf = c * f;
            de = d * e;
            df = d * f;

            te[0] = ce - df * b;
            te[4] = -a * f;
            te[8] = de + cf * b;

            te[1] = cf + de * b;
            te[5] = a * e;
            te[9] = df - ce * b;

            te[2] = -a * d;
            te[6] = b;
            te[10] = a * c;
        }
        else if (euler.m_order === 'ZYX')
        {
            ae = a * e;
            af = a * f;
            be = b * e;
            bf = b * f;

            te[0] = c * e;
            te[4] = be * d - af;
            te[8] = ae * d + bf;

            te[1] = c * f;
            te[5] = bf * d + ae;
            te[9] = af * d - be;

            te[2] = -d;
            te[6] = b * c;
            te[10] = a * c;
        }
        else if (euler.m_order === 'YZX')
        {
            ac = a * c;
            ad = a * d;
            bc = b * c;
            bd = b * d;

            te[0] = c * e;
            te[4] = bd - ac * f;
            te[8] = bc * f + ad;

            te[1] = f;
            te[5] = a * e;
            te[9] = -b * e;

            te[2] = -d * e;
            te[6] = ad * f + bc;
            te[10] = ac - bd * f;
        }
        else if (euler.m_order === 'XZY')
        {
            ac = a * c;
            ad = a * d;
            bc = b * c;
            bd = b * d;

            te[0] = c * e;
            te[4] = -f;
            te[8] = d * e;

            te[1] = ac * f + bd;
            te[5] = a * e;
            te[9] = ad * f - bc;

            te[2] = bc * f - ad;
            te[6] = b * e;
            te[10] = bd * f + ac;
        }

        // last column
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;

        // bottom row
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;

        return this;
    },
    /**
     * Configures the matrix to be a rotation matrix.
     * Takes the configuration from Quaternion object.
     *
     * @param {Quaternion} quaternion Rotation quaternion.
     * @returns {Matrix4} This matrix.
     */
    makeRotationFromQuaternion: function makeRotationFromQuaternion(quaternion)
    {
        var me = this.m_elements;

        var x = quaternion.m_x;
        var y = quaternion.m_y;
        var z = quaternion.m_z;
        var w = quaternion.m_w;
        var x2 = x + x;
        var y2 = y + y;
        var z2 = z + z;
        var xx = x * x2;
        var xy = x * y2;
        var xz = x * z2;
        var yy = y * y2;
        var yz = y * z2;
        var zz = z * z2;
        var wx = w * x2;
        var wy = w * y2;
        var wz = w * z2;

        me[0] = 1 - (yy + zz);
        me[4] = xy - wz;
        me[8] = xz + wy;

        me[1] = xy + wz;
        me[5] = 1 - (xx + zz);
        me[9] = yz - wx;

        me[2] = xz - wy;
        me[6] = yz + wx;
        me[10] = 1 - (xx + yy);

        me[3] = 0;
        me[7] = 0;
        me[11] = 0;

        me[12] = 0;
        me[13] = 0;
        me[14] = 0;
        me[15] = 1;

        return this;
    },
    /**
     * Configures the matrix to be a rotation matrix over X axis.
     *
     * @param {number} theta Angle theta.
     * @returns {Matrix4} This matrix.
     */
    makeRotationX: function makeRotationX(theta)
    {
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);

        return this.set(
            1, 0, 0, 0,
            0, cos, -sin, 0,
            0, sin, cos, 0,
            0, 0, 0, 1
        );
    },
    /**
     * Configures the matrix to be a rotation matrix over Y axis.
     *
     * @param {number} theta Angle theta.
     * @returns {Matrix4} This matrix.
     */
    makeRotationY: function makeRotationY(theta)
    {
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);

        return this.set(
            cos, sin, 0,
            0, 1, 0, 0,
            -sin, 0, cos, 0,
            0, 0, 0, 1
        );
    },
    /**
     * Configures the matrix to be a rotation matrix over Z axis.
     *
     * @param {number} theta Angle theta.
     * @returns {Matrix4} This matrix.
     */
    makeRotationZ: function makeRotationZ(theta)
    {
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);

        return this.set(
            cos, -sin, 0, 0,
            sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    },
    /**
     * Configures the matrix to be a scale matrix.
     *
     * @param {number} x Scale for X axis.
     * @param {number} y Scale for Y axis.
     * @param {number} z Scale for Z axis.
     * @returns {Matrix4} This matrix.
     */
    makeScale: function makeScale(x, y, z)
    {
        return this.set(
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        );
    },
    /**
     * Configures the matrix to be a scale matrix.
     *
     * @param {Vector3} vector Vector containing scale.
     * @returns {Matrix4} This matrix.
     */
    makeScaleFromVector: function makeScaleFromVector(vector)
    {
        return this.set(
            vector.m_x, 0, 0, 0,
            0, vector.m_y, 0, 0,
            0, 0, vector.m_z, 0,
            0, 0, 0, 1
        );
    },
    /**
     * Configures the matrix to be a translation matrix.
     *
     * @param {number} x Position on X axis.
     * @param {number} y Position on Y axis.
     * @param {number} z Position on Z axis.
     * @returns {Matrix4} This matrix.
     */
    makeTranslation: function makeTranslation(x, y, z)
    {
        return this.set(
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        );
    },
    /**
     * Configures the matrix to be a translation matrix.
     *
     * @param {Vector3} vector Vector containing position.
     * @returns {Matrix4} This matrix.
     */
    makeTranslationFromVector: function makeTranslationFromVector(vector)
    {
        return this.set(
            1, 0, 0, vector.m_x,
            0, 1, 0, vector.m_y,
            0, 0, 1, vector.m_z,
            0, 0, 0, 1
        );
    },
    /**
     * Multiplies this matrix with other matrix.
     *
     * @param {Matrix4} matrix Other matrix.
     * @returns {Matrix4} This matrix.
     */
    multiply: function multiply(matrix)
    {
        return this.multiplyMatrices(this, matrix);
    },
    /**
     * Multiplies matrix1 with matrix2 and stores the value in this matrix.
     *
     * @param {Matrix4} matrix1 First matrix.
     * @param {Matrix4} matrix2 Second matrix.
     * @returns {Matrix4} This matrix.
     */
    multiplyMatrices: function multiplyMatrices(matrix1, matrix2)
    {
        var ae = matrix1.m_elements;
        var be = matrix2.m_elements;
        var me = this.m_elements;

        var a11 = ae[0];
        var a12 = ae[4];
        var a13 = ae[8];
        var a14 = ae[12];
        var a21 = ae[1];
        var a22 = ae[5];
        var a23 = ae[9];
        var a24 = ae[13];
        var a31 = ae[2];
        var a32 = ae[6];
        var a33 = ae[10];
        var a34 = ae[14];
        var a41 = ae[3];
        var a42 = ae[7];
        var a43 = ae[11];
        var a44 = ae[15];

        var b11 = be[0];
        var b12 = be[4];
        var b13 = be[8];
        var b14 = be[12];
        var b21 = be[1];
        var b22 = be[5];
        var b23 = be[9];
        var b24 = be[13];
        var b31 = be[2];
        var b32 = be[6];
        var b33 = be[10];
        var b34 = be[14];
        var b41 = be[3];
        var b42 = be[7];
        var b43 = be[11];
        var b44 = be[15];

        me[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        me[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        me[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        me[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        me[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        me[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        me[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        me[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        me[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        me[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        me[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        me[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        me[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        me[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        me[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        me[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return this;
    },
    /**
     * Multiplies the matrix by a scalar value.
     *
     * @param {number} scalar Scalar value to multiply with.
     * @returns {Matrix4} This matrix.
     */
    multiplyScalar: function multiplyScalar(scalar)
    {
        var me = this.m_elements;

        me[0] *= scalar;
        me[1] *= scalar;
        me[2] *= scalar;
        me[3] *= scalar;
        me[4] *= scalar;
        me[5] *= scalar;
        me[6] *= scalar;
        me[7] *= scalar;
        me[8] *= scalar;
        me[9] *= scalar;
        me[10] *= scalar;
        me[11] *= scalar;
        me[12] *= scalar;
        me[13] *= scalar;
        me[14] *= scalar;
        me[15] *= scalar;

        return this;
    },
    /**
     * Scales the matrix by a specified vector.
     *
     * @param {Vector3} vector Vector to scale by.
     * @returns {Matrix4} This matrix.
     */
    scale: function scale(vector)
    {
        var me = this.m_elements;
        var x = vector.m_x;
        var y = vector.m_y;
        var z = vector.m_z;

        me[0] *= x;
        me[1] *= x;
        me[2] *= x;
        me[3] *= x;

        me[4] *= y;
        me[5] *= y;
        me[6] *= y;
        me[7] *= y;

        me[8] *= z;
        me[9] *= z;
        me[10] *= z;
        me[11] *= z;

        return this;
    },
    /**
     * Sets the values of the matrix.
     *
     * @param {number} e11
     * @param {number} e12
     * @param {number} e13
     * @param {number} e14
     * @param {number} e21
     * @param {number} e22
     * @param {number} e23
     * @param {number} e24
     * @param {number} e31
     * @param {number} e32
     * @param {number} e33
     * @param {number} e34
     * @param {number} e41
     * @param {number} e42
     * @param {number} e43
     * @param {number} e44
     * @returns {Matrix4} This matrix.
     */
    set: function set(e11, e12, e13, e14, e21, e22, e23, e24, e31, e32, e33, e34, e41, e42, e43, e44)
    {
        var me = this.m_elements;

        me[0] = e11;
        me[1] = e12;
        me[2] = e13;
        me[3] = e14;
        me[4] = e21;
        me[5] = e22;
        me[6] = e23;
        me[7] = e24;
        me[8] = e31;
        me[9] = e32;
        me[10] = e33;
        me[11] = e34;
        me[12] = e41;
        me[13] = e42;
        me[14] = e43;
        me[15] = e44;

        return this;
    },
    /**
     * Sets the position component of the matrix.
     *
     * @param {Vector3} vector Vector containing position.
     * @returns {Matrix4} This matrix.
     */
    setPosition: function setPosition(vector)
    {
        var me = this.m_elements;

        me[12] = vector.m_x;
        me[13] = vector.m_y;
        me[14] = vector.m_z;

        return this;
    },
    /**
     * Transposes the matrix.
     * @returns {Matrix4} This matrix.
     */
    transpose: function transpose()
    {
        var temp;
        var me = this.m_elements;

        temp = me[1];
        me[1] = me[4];
        me[4] = temp;

        temp = me[2];
        me[2] = me[8];
        me[8] = temp;

        temp = me[6];
        me[6] = me[9];
        me[9] = temp;

        temp = me[3];
        me[3] = me[12];
        me[12] = temp;

        temp = me[7];
        me[7] = me[13];
        me[13] = temp;

        temp = me[11];
        me[11] = me[14];
        me[14] = temp;

        return this;
    }
};