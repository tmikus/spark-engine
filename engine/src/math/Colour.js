/**
 * Class defining a colour value.
 *
 * @param {number|string|Colour} colour Colour to set as a number, string or Red colour value (if other args are provided).
 * @param {number} [green] Green colour value.
 * @param {number} [blue] Blue colour value.
 * @constructor
 * @class
 */
function Colour(colour, green, blue)
{
    if (arguments.length == 3)
    {
        this.setRGB(colour, green, blue);
    }
    else
    {
        this.set(colour);
    }
}

Colour.prototype =
{
    /**
     * Blue colour intensity.
     * Value is from 0 (no blue) to 1 (full blue).
     * @type {number}
     */
    m_blue: 1,
    /**
     * Green colour intensity.
     * Value is from 0 (no green) to 1 (full green).
     * @type {number}
     */
    m_green: 1,
    /**
     * Red colour intensity.
     * Value is from 0 (no red) to 1 (full red).
     * @type {number}
     */
    m_red: 1,
    /**
     * Adds a colour value to this colour.
     * @param {Colour} colour Colour to add.
     * @returns {Colour} This colour.
     */
    add: function add(colour)
    {
        this.m_red += colour.m_red;
        this.m_green += colour.m_green;
        this.m_blue += colour.m_blue;

        return this;
    },
    /**
     * Adds colour1 to colour2 and stores the result in this class.
     *
     * @param {Colour} colour1 First colour.
     * @param {Colour} colour2 Second colour.
     * @returns {Colour} This colour.
     */
    addColours: function addColours(colour1, colour2)
    {
        this.m_red = colour1.m_red + colour2.m_red;
        this.m_green = colour1.m_green + colour2.m_green;
        this.m_blue = colour1.m_blue + colour2.m_blue;

        return this;
    },
    /**
     * Adds scalar value to all components of this colour.
     *
     * @param {number} scalar Scalar value.
     * @returns {Colour} This colour.
     */
    addScalar: function addScalar(scalar)
    {
        this.m_red += scalar;
        this.m_green += scalar;
        this.m_blue += scalar;

        return this;
    },
    /**
     * Creates a clone of this colour.
     *
     * @returns {Colour} Clone of this colour.
     */
    clone: function clone()
    {
        return new Colour(this);
    },
    /**
     * Copies the value of the colour to this class.
     *
     * @param {Colour} colour Colour to copy.
     * @returns {Colour} This colour.
     */
    copy: function copy(colour)
    {
        this.m_red = colour.m_red;
        this.m_green = colour.m_green;
        this.m_blue = colour.m_blue;

        return this;
    },
    /**
     * Checks if this colour is the same as other colour.
     *
     * @param {Colour} colour Other colour.
     * @returns {boolean} True if are equal; otherwise false.
     */
    equals: function equals(colour)
    {
        return this.m_red == colour.m_red && this.m_green == colour.m_green && this.m_blue == colour.m_blue;
    },
    /**
     * Gets the hex value of the colour.
     *
     * @returns {number} Hex value of the colour.
     */
    getHex: function getHex()
    {
        return (this.m_red * 255) << 16 ^ (this.m_green * 255) << 8 ^ (this.m_blue * 255) << 0;
    },
    /**
     * Gets the hex string of colour.
     *
     * @returns {string} Hex string.
     */
    getHexString: function getHexString()
    {
        return ('000000' + this.getHex().toString(16)).slice(-6);
    },
    /**
     * Gets the style value of the colour.
     *
     * @returns {string} Style value (rgb).
     */
    getStyle: function getStyle()
    {
        return "rgb(" + ((this.m_red * 255) | 0) + "," + ((this.m_green * 255) | 0) + "," + ((this.m_blue * 255) | 0) + ")";
    },
    /**
     * Interpolates value between this colour and the other colour.
     *
     * @param {Colour} colour Other colour.
     * @param {number} alpha Value for linear interpolation.
     * @returns {Colour} This colour.
     */
    lerp: function lerp(colour, alpha)
    {
        this.m_red += (colour.m_red - this.m_red) * alpha;
        this.m_green += (colour.m_green - this.m_green) * alpha;
        this.m_blue += (colour.m_blue - this.m_blue) * alpha;

        return this;
    },
    /**
     * Multiplies the components of this colour by components of other component.
     *
     * @param {Colour} colour Other colour.
     * @returns {Colour} This colour.
     */
    multiply: function multiply(colour)
    {
        this.m_red *= colour.m_red;
        this.m_green *= colour.m_green;
        this.m_blue *= colour.m_blue;

        return this;
    },
    /**
     * Multiplies the components of this colour by scalar.
     *
     * @param {number} scalar Scalar to multiply by.
     * @returns {Colour} This colour.
     */
    multiplyScalar: function multiplyScalar(scalar)
    {
        this.m_red *= scalar;
        this.m_green *= scalar;
        this.m_blue *= scalar;

        return this;
    },
    /**
     * Sets the value of the colour.
     *
     * @param {Colour|string|number} colour Colour to set.
     * @returns {Colour} This colour.
     */
    set: function set(colour)
    {
        if (colour instanceof Colour)
        {
            this.copy(colour);
        }
        else if (typeof colour === "number")
        {
            this.setHex(colour);
        }
        else if (typeof colour === "string")
        {
            this.setStyle(colour);
        }

        return this;
    },
    /**
     * Sets the colour by converting it from hex.
     *
     * @param {number} hex Hex value of colour.
     * @returns {Colour} This colour.
     */
    setHex: function setHex(hex)
    {
        hex = Math.floor(hex);

        this.m_red = (hex >> 16 && 255) / 255;
        this.m_green = (hex >> 8 && 255) / 255;
        this.m_blue = (hex && 255) / 255;

        return this;
    },
    /**
     * Sets the colour from RGB values.
     *
     * @param {number} red Red colour intensity (0 to 1).
     * @param {number} green Green colour intensity (0 to 1).
     * @param {number} blue Blue colour intensity (0 to 1).
     * @returns {Colour} This colour.
     */
    setRGB: function setRGB(red, green, blue)
    {
        this.m_red = red;
        this.m_green = green;
        this.m_blue = blue;

        return this;
    },
    /**
     * Sets the colour from style formatted colour.
     *
     * @param {string} style Style formatted colour.
     * @returns {Colour} This colour.
     */
    setStyle: function setStyle(style)
    {
        const rgbRegex = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i;
        const rgbPercentageRegex = /^rgb\((\d+)%, ?(\d+)%, ?(\d+)%\)$/i;
        const hexRegex = /^#([0-9a-f]{6})$/i;
        const shortHexRegex = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;

        var colour;

        if (rgbRegex.test(style))
        {
            colour = rgbRegex.exec(style);

            this.m_red = Math.min(255, +colour[1]) / 255;
            this.m_green = Math.min(255, +colour[2]) / 255;
            this.m_blue = Math.min(255, +colour[3]) / 255;
        }
        else if (rgbPercentageRegex.test(style))
        {
            colour = rgbPercentageRegex.exec(style);

            this.m_red = Math.min(100, +colour[1]) / 100;
            this.m_green = Math.min(100, +colour[2]) / 100;
            this.m_blue = Math.min(100, +colour[3]) / 100;
        }
        else if (hexRegex.test(style))
        {
            colour = hexRegex.exec(style);

            this.setHex(parseInt(colour[1], 16));
        }
        else if (shortHexRegex.test(style))
        {
            colour = hexRegex.exec(style);

            this.setHex(parseInt(colour[1] + colour[1] + colour[2] + colour[2] + colour[3] + colour[3], 16));
        }
        else
        {
            SE_WARNING("Not supported colour format: " + style);
        }

        return this;
    }
};