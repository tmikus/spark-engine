/**
 * Class defining a 3x3 matrix.
 * @constructor
 * @class
 */
function Matrix3()
{
    this.m_elements = new Float32Array([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ]);
}

Matrix3.prototype =
{
    /**
     * Array of matrix elements.
     * @type {Float32Array}
     */
    m_elements: null,
    /**
     * Clones this array.
     *
     * @returns {Matrix3} Clone of this array.
     */
    clone: function clone()
    {
        return new THREE.Matrix3().set(this.m_elements);
    },
    /**
     * Copes the matrix to this matrix.
     *
     * @param {Matrix3} matrix Matrix to copy.
     * @returns {Matrix3} This matrix.
     */
    copy: function copy(matrix)
    {
        matrix.m_elements.set(matrix.m_elements);
    },
    /**
     * Gets the determinant of the matrix.
     *
     * @returns {number} Determinant of the matrix.
     */
    determinant: function determinant()
    {
        var me = this.m_elements;

        var e11 = me[0];
        var e12 = me[1];
        var e13 = me[2];
        var e21 = me[3];
        var e22 = me[4];
        var e23 = me[5];
        var e31 = me[6];
        var e32 = me[7];
        var e33 = me[8];

        return (e11 * e22 * e33) + (e12 * e23 * e31) + (e13 * e21 * e32) - (e13 * e22 * e31) - (e12 * e21 * e33) - (e11 * e23 * e32);
    },
    /**
     * Sets this matrix as identity matrix.
     *
     * @returns {Matrix3} Identity matrix.
     */
    identity: function identity()
    {
        return this.set(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
    },
    /**
     * Inverses the matrix.
     *
     * @returns {Matrix3} This matrix.
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
     * Multiplies this array by a scalar value.
     *
     * @param {number} scalar Scalar value to multiply with.
     * @returns {Matrix3} This matrix.
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

        return this;
    },
    /**
     * Gets the normal matrix.
     * @returns {Matrix3} This matrix.
     */
    normalMatrix: function normalMatrix()
    {
        return this.inverse().transpose();
    },
    /**
     * Sets the content of the matrix to specified values.
     *
     * @param {number} e11 Element [0][0]
     * @param {number} e12 Element [0][1]
     * @param {number} e13 Element [0][2]
     * @param {number} e21 Element [1][0]
     * @param {number} e22 Element [1][1]
     * @param {number} e23 Element [1][2]
     * @param {number} e31 Element [2][0]
     * @param {number} e32 Element [2][1]
     * @param {number} e33 Element [2][2]
     * @returns {Matrix3} This matrix.
     */
    set: function set(e11, e12, e13, e21, e22, e23, e31, e32, e33)
    {
        var me = this.m_elements;

        me[0] = e11;
        me[1] = e12;
        me[2] = e13;

        me[3] = e21;
        me[4] = e22;
        me[5] = e23;

        me[6] = e31;
        me[7] = e32;
        me[8] = e33;

        return this;
    },
    /**
     * Transposes this matrix.
     * @returns {Matrix3} This matrix.
     */
    transpose: function transpose()
    {
        var temp;
        var me = this.m_elements;

        temp = me[1];
        me[1] = me[3];
        me[3] = temp;

        temp = me[2];
        me[2] = me[6];
        me[6] = temp;

        temp = me[5];
        me[5] = me[7];
        me[7] = temp;

        return this;
    }
};