/**
 * Class defining a 3D vector.
 *
 * @param {number} x X coordinate of the vector.
 * @param {number} y Y coordinate of the vector.
 * @param {number} z Z coordinate of the vector.
 * @constructor
 * @class
 */
function Vector3(x, y, z)
{
    this.m_x = x || 0;
    this.m_y = y || 0;
    this.m_x = z || 0;
}

Vector3.prototype =
{
    /**
     * X coordinate of the vector.
     * @type {number}
     */
    m_x: 0,
    /**
     * Y coordinate of the vector.
     * @type {number}
     */
    m_y: 0,
    /**
     * Z coordinate of the vector.
     * @type {number}
     */
    m_z: 0,
    /**
     * Adds a vector to this vector.
     *
     * @param {Vector3} vector Vector to add.
     * @returns {Vector3} This vector.
     */
    add: function add(vector)
    {
        this.m_x += vector.m_x;
        this.m_y += vector.m_y;
        this.m_z += vector.m_z;
        return this;
    },
    /**
     * Adds two vectors to each other and stores the result in this vector.
     *
     * @param {Vector3} vector1 First vector.
     * @param {Vector3} vector2 Second vector.
     * @returns {Vector3} This vector.
     */
    addVectors: function addVectors(vector1, vector2)
    {
        this.m_x = vector1.m_x + vector2.m_x;
        this.m_y = vector1.m_y + vector2.m_y;
        this.m_z = vector1.m_z + vector2.m_z;
        return this;
    },
    /**
     * Calculates angle between this and other vector.
     *
     * @param {Vector3} vector Vector between which calculate angle.
     * @returns {number} Angle between this and other vector.
     */
    angleTo: function angleTo(vector)
    {
        var theta = this.dot(vector) / (this.length() * vector.length());

        return Math.acos(Math.clamp(theta, -1, 1));
    },
    /**
     * Applies projection matrix to this vector.
     *
     * @param {Matrix4} matrix Matrix 4x4 formatted as a projection matrix.
     * @returns {Vector3} This vector.
     */
    applyProjection: function applyProjection(matrix)
    {
        var x = this.m_x;
        var y = this.m_y;
        var z = this.m_z;

        var e = matrix.m_elements;
        var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

        this.m_x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
        this.m_y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
        this.m_z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;

        return this;
    },
    /**
     * Applies quaternion transformation to this vector.
     *
     * @param {Quaternion} quaternion Quaternion to apply.
     * @returns {Vector3} This vector.
     */
    applyQuaternion: function applyQuaternion(quaternion)
    {
        var x = this.m_x;
        var y = this.m_y;
        var z = this.m_z;

        var qx = quaternion.m_x;
        var qy = quaternion.m_y;
        var qz = quaternion.m_z;
        var qw = quaternion.m_w;

        var ix =  qw * x + qy * z - qz * y;
        var iy =  qw * y + qz * x - qx * z;
        var iz =  qw * z + qx * y - qy * x;
        var iw = - qx * x - qy * y - qz * z;

        this.m_x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
        this.m_y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
        this.m_z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

        return this;
    },
    /**
     * Applies Matrix3 transformations to this object.
     *
     * @param {Matrix3} matrix Matrix 3x3.
     * @returns {Vector3} This vector.
     */
    applyMatrix3: function applyMatrix3(matrix)
    {
        var x = this.m_x;
        var y = this.m_y;
        var z = this.m_z;

        var e = matrix.m_elements;

        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;

        return this;
    },
    /**
     * Applies Matrix4 transformations to this object.
     *
     * @param {Matrix4} matrix Matrix 4x4.
     * @returns {Vector3} This vector.
     */
    applyMatrix4: function applyMatrix4(matrix)
    {
        var x = this.m_x;
        var y = this.m_y;
        var z = this.m_z;

        var e = matrix.m_elements;

        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];

        return this;
    },
    /**
     * Rounds the values of X, Y and Z to higher value.
     *
     * @returns {Vector3} This vector.
     */
    ceil: function ceil()
    {
        this.m_x = Math.ceil(this.m_x);
        this.m_y = Math.ceil(this.m_y);
        this.m_z = Math.ceil(this.m_z);
        return this;
    },
    /**
     * Clamps the vector in specified min and max range.
     *
     * @param {number} min Minimum range for X, Y and Z.
     * @param {number} max Maximum range for X, Y and Z.
     * @returns {Vector3} This vector.
     */
    clamp: function clamp(min, max)
    {
        if (this.m_x < min)
        {
            this.m_x = min;
        }
        else if (this.m_x > max)
        {
            this.m_x = max;
        }

        if (this.m_y < min)
        {
            this.m_y = min;
        }
        else if (this.m_y > max)
        {
            this.m_y = max;
        }

        if (this.m_z < min)
        {
            this.m_z = min;
        }
        else if (this.m_z > max)
        {
            this.m_z = max;
        }

        return this;
    },
    /**
     * Clones this vector.
     *
     * @returns {Vector3} Copy of this vector.
     */
    clone: function clone()
    {
        return new Vector3(this.m_x, this.m_y, this.m_z);
    },
    /**
     * Copies values from other vector onto this vector.
     *
     * @param {Vector3} vector Vector to copy.
     * @returns {Vector3} This vector.
     */
    copy: function copy(vector)
    {
        this.m_x = vector.m_x;
        this.m_y = vector.m_y;
        this.m_z = vector.m_z;
        return this;
    },
    /**
     * Crosses this vector with other vector.
     *
     * @param {Vector3} vector Other vector.
     * @returns {Vector3} This vector.
     */
    cross: function cross(vector)
    {
        var x = this.m_x;
        var y = this.m_y;
        var z = this.m_z;

        this.m_x = y * vector.m_z - z * vector.m_y;
        this.m_y = z * vector.m_x - x * vector.m_z;
        this.m_z = x * vector.m_y - y * vector.m_x;

        return this;
    },
    /**
     * Crosses the vector1 with vector2 and stores the result in this vector.
     *
     * @param {Vector3} vector1 First vector.
     * @param {Vector3} vector2 Second vector.
     * @returns {Vector3} This vector.
     */
    crossVectors: function cross(vector1, vector2)
    {
        var ax = vector1.m_x;
        var ay = vector1.m_y;
        var az = vector1.m_z;

        var bx = vector2.m_x;
        var by = vector2.m_y;
        var bz = vector2.m_z;

        this.m_x = ay * bz - az * by;
        this.m_y = az * bx - ax * bz;
        this.m_z = ax * by - ay * bx;

        return this;
    },
    /**
     * Calculates the distance to the specified vector.
     *
     * @param {Vector3} vector Vector to which calculate distance.
     * @returns {number} Distance to the vector.
     */
    distanceTo: function distanceTo(vector)
    {
        return Math.sqrt(this.distanceToSquared(vector));
    },
    /**
     * Calculates the distance to the specified vector.
     * Distance is squared.
     *
     * @param {Vector3} vector Vector to which calculate distance.
     * @returns {number} Distance to the vector squared.
     */
    distanceToSquared: function distanceToSquared(vector)
    {
        var dx = this.m_x - vector.m_x;
        var dy = this.m_y - vector.m_y;
        var dz = this.m_z - vector.m_z;
        return dx * dx + dy * dy + dz * dz;
    },
    /**
     * Divides this vector by other vector.
     *
     * @param {Vector3} vector Vector used for division.
     * @returns {Vector3} This vector.
     */
    divide: function divide(vector)
    {
        this.m_x /= vector.m_x;
        this.m_y /= vector.m_y;
        this.m_z /= vector.m_z;
        return this;
    },
    /**
     * Divides this vector by scalar.
     *
     * @param {number} scalar Scalar value.
     * @returns {Vector3} This vector.
     */
    divideScalar: function divideScalar(scalar)
    {
        this.m_x /= scalar;
        this.m_y /= scalar;
        this.m_z /= scalar;
        return this;
    },
    /**
     * Creates a dot product of this vector and other vector.
     *
     * @param {Vector3} vector Other vector.
     * @returns {number} This vector.
     */
    dot: function dot(vector)
    {
        return this.m_x * vector.m_x + this.m_y * vector.m_y + this.m_z * vector.m_z;
    },
    /**
     * Checks if the vectors are equal.
     *
     * @param {Vector3} vector Other vector.
     * @returns {boolean} True if are equal; otherwise false.
     */
    equals: function equals(vector)
    {
        return this.m_x == vector.m_x && this.m_y == vector.m_y && this.m_z == vector.m_z;
    },
    /**
     * Rounds the values to smaller value.
     *
     * @returns {Vector3} This vector.
     */
    floor: function floor()
    {
        this.m_x = Math.floor(this.m_x);
        this.m_y = Math.floor(this.m_y);
        this.m_z = Math.floor(this.m_z);
        return this;
    },
    /**
     * Calculates the length of the vector.
     *
     * @returns {number} Length of this vector.
     */
    length: function length()
    {
        return Math.sqrt(this.m_x * this.m_x + this.m_y * this.m_y + this.m_z * this.m_z);
    },
    /**
     * Calculates the length of the vector.
     * Length is returned as a squared value.
     *
     * @returns {number} Length of this vector squared.
     */
    lengthSquared: function lengthSquared()
    {
        return this.m_x * this.m_x + this.m_y * this.m_y + this.m_z * this.m_z;
    },
    /**
     * Linearly interpolates two points (this and the other vector).
     *
     * @param {Vector3} vector Other vector.
     * @param {number} alpha Value for linear interpolation.
     * @returns {Vector3} This vector.
     */
    lerp: function lerp(vector, alpha)
    {
        this.m_x += (vector.m_x - this.m_x) * alpha;
        this.m_y += (vector.m_y - this.m_y) * alpha;
        this.m_z += (vector.m_z - this.m_z) * alpha;
        return this;
    },
    /**
     * Sets this vector to maximum value of components of this and other vector.
     *
     * @param {Vector3} vector Vector with max values.
     * @returns {Vector3} This vector.
     */
    max: function max(vector)
    {
        if (this.m_x < vector.m_x)
        {
            this.m_x = vector.m_x;
        }

        if (this.m_y < vector.m_y)
        {
            this.m_y = vector.m_y;
        }

        if (this.m_z < vector.m_z)
        {
            this.m_z = vector.m_z;
        }

        return this;
    },
    /**
     * Sets this vector to minimum value of components of this and other vector.
     *
     * @param {Vector3} vector Vector with min values.
     * @returns {Vector3} This vector.
     */
    min: function min(vector)
    {
        if (this.m_x > vector.m_x)
        {
            this.m_x = vector.m_x;
        }

        if (this.m_y > vector.m_y)
        {
            this.m_y = vector.m_y;
        }

        if (this.m_z > vector.m_z)
        {
            this.m_z = vector.m_z;
        }

        return this;
    },
    /**
     * Multiplies this vector with other vector.
     *
     * @param {Vector3} vector Vector with which to multiply.
     * @returns {Vector3} This vector.
     */
    multiply: function multiply(vector)
    {
        this.m_x *= vector.m_x;
        this.m_y *= vector.m_y;
        this.m_z *= vector.m_z;
        return this;
    },
    /**
     * Multiplies this vector with a scalar.
     *
     * @param {number} scalar Scalar value.
     * @returns {Vector3} This vector.
     */
    multiplyScalar: function multiplyScalar(scalar)
    {
        this.m_x *= scalar;
        this.m_y *= scalar;
        this.m_z *= scalar;
        return this;
    },
    /**
     * Multiplies two vectors and sets the result to this vector.
     *
     * @param {Vector3} vector1 First vector.
     * @param {Vector3} vector2 Second vector.
     * @returns {Vector3} This vector.
     */
    multiplyVectors: function multiplyVectors(vector1, vector2)
    {
        this.m_x = vector1.m_x * vector2.m_x;
        this.m_y = vector1.m_y * vector2.m_y;
        this.m_z = vector1.m_z * vector2.m_z;
        return this;
    },
    /**
     * Normalises the vector.
     * @returns {Vector3} This vector.
     */
    normalise: function normalise()
    {
        return this.divideScalar(this.length());
    },
    /**
     * Rounds the vector's X and Y values.
     * @returns {Vector3} This vector.
     */
    round: function round()
    {
        this.m_x = Math.round(this.m_x);
        this.m_y = Math.round(this.m_y);
        this.m_z = Math.round(this.m_z);
        return this;
    },
    /**
     * Sets the X, Y and Z components of this vector.
     *
     * @param {number} x Value of X component.
     * @param {number} y Value of Y component.
     * @param {number} z Value of Z component.
     * @returns {Vector3} This vector.
     */
    set: function set(x, y, z)
    {
        this.m_x = x;
        this.m_y = y;
        this.m_z = z;
        return this;
    },
    /**
     * Sets the value of this vector from Matrix4 by copying column values.
     * 
     * @param {Matrix4} matrix Matrix from which copy values.
     * @param {number} columnIndex Index of the column to copy.
     * @returns {Vector3} This vector.
     */
    setFromMatrixColumn: function setFromMatrixColumn(matrix, columnIndex)
    {
        var offset = columnIndex * 4;
        var e = matrix.m_elements;

        this.m_x = e[offset];
        this.m_y = e[offset + 1];
        this.m_z = e[offset + 2];

        return this;
    },
    /**
     * Sets the value of this vector from Matrix4 by copying position values.
     *
     * @param {Matrix4} matrix Matrix from which copy values.
     * @returns {Vector3} This vector.
     */
    setFromMatrixPosition: function setFromMatrixPosition(matrix)
    {
        this.m_x = matrix.m_elements[12];
        this.m_y = matrix.m_elements[13];
        this.m_z = matrix.m_elements[14];
        return this;
    },
    /**
     * Sets the value of this vector from Matrix4 by copying scale values.
     *
     * @param {Matrix4} matrix Matrix from which copy values.
     * @returns {Vector3} This vector.
     */
    setFromMatrixScale: function setFromMatrixScale(matrix)
    {
        var e = matrix.m_elements;
        var sx = this.set(e[0], e[1], e[2]).length();
        var sy = this.set(e[4], e[5], e[6]).length();
        var sz = this.set(e[8], e[9], e[10]).length();

        this.m_x = sx;
        this.m_y = sy;
        this.m_z = sz;

        return this;
    },
    /**
     * Sets the length of this vector to a new value.
     * Length of this vector CANNOT BE 0.
     *
     * @param {number} length New length to set.
     * @returns {Vector3} This vector.
     */
    setLength: function setLength(length)
    {
        var oldLength = this.length();

        if (oldLength && length != oldLength)
        {
            this.multiplyScalar(length / oldLength);
        }

        return this;
    },
    /**
     * Subtracts a vector from this vector.
     *
     * @param {Vector3} vector Vector to subtract.
     * @returns {Vector3} This vector.
     */
    subtract: function subtract(vector)
    {
        this.m_x -= vector.m_x;
        this.m_y -= vector.m_y;
        this.m_z -= vector.m_z;
        return this;
    },
    /**
     * Subtracts the values of two vectors components' and stores the result in this vector.
     *
     * @param {Vector3} vector1 First vector.
     * @param {Vector3} vector2 Second vector.
     * @returns {Vector3} This vector.
     */
    subtractVectors: function subtractVectors(vector1, vector2)
    {
        this.m_x = vector1.m_x - vector2.m_x;
        this.m_y = vector1.m_y - vector2.m_y;
        this.m_z = vector1.m_z - vector2.m_z;
        return this;
    }
};