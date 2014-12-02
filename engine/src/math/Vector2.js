/**
 * Class defining a 2D vector.
 *
 * @param {number} x X coordinate of the vector.
 * @param {number} y Y coordinate of the vector.
 * @constructor
 * @class
 */
function Vector2(x, y)
{
    this.m_x = x || 0;
    this.m_y = y || 0;
}

Vector2.prototype =
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
     * Adds a vector to this vector.
     *
     * @param {Vector2} vector Vector to add.
     * @returns {Vector2} This vector.
     */
    add: function add(vector)
    {
        this.m_x += vector.m_x;
        this.m_y += vector.m_y;
        return this;
    },
    /**
     * Adds two vectors to each other and stores the result in this vector.
     *
     * @param {Vector2} vector1 First vector.
     * @param {Vector2} vector2 Second vector.
     * @returns {Vector2} This vector.
     */
    addVectors: function addVectors(vector1, vector2)
    {
        this.m_x = vector1.m_x + vector2.m_x;
        this.m_y = vector1.m_y + vector2.m_y;
        return this;
    },
    /**
     * Rounds the values of X and Y to higher value.
     *
     * @returns {Vector2} This vector.
     */
    ceil: function ceil()
    {
        this.m_x = Math.ceil(this.m_x);
        this.m_y = Math.ceil(this.m_y);
        return this;
    },
    /**
     * Clamps the vector in specified min and max range.
     *
     * @param {number} min Minimum range for X and Y.
     * @param {number} max Maximum range for X and Y.
     * @returns {Vector2} This vector.
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

        return this;
    },
    /**
     * Clones this vector.
     *
     * @returns {Vector2} Copy of this vector.
     */
    clone: function clone()
    {
        return new Vector2(this.m_x, this.m_y);
    },
    /**
     * Copies values from other vector onto this vector.
     *
     * @param {Vector2} vector Vector to copy.
     * @returns {Vector2} This vector.
     */
    copy: function copy(vector)
    {
        this.m_x = vector.m_x;
        this.m_y = vector.m_y;
        return this;
    },
    /**
     * Calculates the distance to the specified vector.
     *
     * @param {Vector2} vector Vector to which calculate distance.
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
     * @param {Vector2} vector Vector to which calculate distance.
     * @returns {number} Distance to the vector squared.
     */
    distanceToSquared: function distanceToSquared(vector)
    {
        var dx = this.m_x - vector.m_x;
        var dy = this.m_y - vector.m_y;
        return dx * dx + dy * dy;
    },
    /**
     * Divides this vector by other vector.
     *
     * @param {Vector2} vector Vector used for division.
     * @returns {Vector2} This vector.
     */
    divide: function divide(vector)
    {
        this.m_x /= vector.m_x;
        this.m_y /= vector.m_y;
        return this;
    },
    /**
     * Divides this vector by scalar.
     *
     * @param {number} scalar Scalar value.
     * @returns {Vector2} This vector.
     */
    divideScalar: function divideScalar(scalar)
    {
        this.m_x /= scalar;
        this.m_y /= scalar;
        return this;
    },
    /**
     * Creates a dot product of this vector and other vector.
     *
     * @param {Vector2} vector Other vector.
     * @returns {number} This vector.
     */
    dot: function dot(vector)
    {
        return this.m_x * vector.m_x + this.m_y * vector.m_y;
    },
    /**
     * Checks if the vectors are equal.
     *
     * @param {Vector2} vector Other vector.
     * @returns {boolean} True if are equal; otherwise false.
     */
    equals: function equals(vector)
    {
        return this.m_x == vector.m_x && this.m_y == vector.m_y;
    },
    /**
     * Rounds the values to smaller value.
     *
     * @returns {Vector2} This vector.
     */
    floor: function floor()
    {
        this.m_x = Math.floor(this.m_x);
        this.m_y = Math.floor(this.m_y);
        return this;
    },
    /**
     * Calculates the length of the vector.
     *
     * @returns {number} Length of this vector.
     */
    length: function length()
    {
        return Math.sqrt(this.m_x * this.m_x + this.m_y * this.m_y);
    },
    /**
     * Calculates the length of the vector.
     * Length is returned as a squared value.
     *
     * @returns {number} Length of this vector squared.
     */
    lengthSquared: function lengthSquared()
    {
        return this.m_x * this.m_x + this.m_y * this.m_y;
    },
    /**
     * Linearly interpolates two points (this and the other vector).
     *
     * @param {Vector2} vector Other vector.
     * @param {number} alpha Value for linear interpolation.
     * @returns {Vector2} This vector.
     */
    lerp: function lerp(vector, alpha)
    {
        this.m_x += (vector.m_x - this.m_x) * alpha;
        this.m_y += (vector.m_y - this.m_y) * alpha;
        return this;
    },
    /**
     * Sets this vector to maximum value of components of this and other vector.
     *
     * @param {Vector2} vector Vector with max values.
     * @returns {Vector2} This vector.
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

        return this;
    },
    /**
     * Sets this vector to minimum value of components of this and other vector.
     *
     * @param {Vector2} vector Vector with min values.
     * @returns {Vector2} This vector.
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

        return this;
    },
    /**
     * Multiplies this vector with other vector.
     *
     * @param {Vector2} vector Vector with which to multiply.
     * @returns {Vector2} This vector.
     */
    multiply: function multiply(vector)
    {
        this.m_x *= vector.m_x;
        this.m_y *= vector.m_y;
        return this;
    },
    /**
     * Multiplies this vector with a scalar.
     *
     * @param {number} scalar Scalar value.
     * @returns {Vector2} This vector.
     */
    multiplyScalar: function multiplyScalar(scalar)
    {
        this.m_x *= scalar;
        this.m_y *= scalar;
        return this;
    },
    /**
     * Multiplies two vectors and sets the result to this vector.
     *
     * @param {Vector2} vector1 First vector.
     * @param {Vector2} vector2 Second vector.
     * @returns {Vector2} This vector.
     */
    multiplyVectors: function multiplyVectors(vector1, vector2)
    {
        this.m_x = vector1.m_x * vector2.m_x;
        this.m_y = vector1.m_y * vector2.m_y;
        return this;
    },
    /**
     * Normalises the vector.
     * @returns {Vector2} This vector.
     */
    normalise: function normalise()
    {
        return this.divideScalar(this.length());
    },
    /**
     * Rounds the vector's X and Y values.
     * @returns {Vector2} This vector.
     */
    round: function round()
    {
        this.m_x = Math.round(this.m_x);
        this.m_y = Math.round(this.m_y);
        return this;
    },
    /**
     * Sets the X and Y components of this vector.
     *
     * @param {number} x Value of X component.
     * @param {number} y Value of Y component.
     * @returns {Vector2} This vector.
     */
    set: function set(x, y)
    {
        this.m_x = x;
        this.m_y = y;
        return this;
    },
    /**
     * Sets the length of this vector to a new value.
     * Length of this vector CANNOT BE 0.
     *
     * @param {number} length New length to set.
     * @returns {Vector2} This vector.
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
     * @param {Vector2} vector Vector to subtract.
     * @returns {Vector2} This vector.
     */
    subtract: function subtract(vector)
    {
        this.m_x -= vector.m_x;
        this.m_y -= vector.m_y;
        return this;
    },
    /**
     * Subtracts the values of two vectors components' and stores the result in this vector.
     *
     * @param {Vector2} vector1 First vector.
     * @param {Vector2} vector2 Second vector.
     * @returns {Vector2} This vector.
     */
    subtractVectors: function subtractVectors(vector1, vector2)
    {
        this.m_x = vector1.m_x - vector2.m_x;
        this.m_y = vector1.m_y - vector2.m_y;
        return this;
    }
};