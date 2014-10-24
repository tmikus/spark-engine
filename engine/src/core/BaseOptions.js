/**
 * Base options class.
 *
 * @param {*} options Options to assign to this class.
 * @constructor
 * @class
 * @abstract
 */
function BaseOptions(options)
{
    this._setOptions(options);
}

BaseOptions.prototype =
{
    /**
     * Sets the value of options to this class.
     *
     * @param {*} options Options to set.
     * @private
     */
    _setOptions: function _setOptions(options)
    {
        if (!options)
        {
            return;
        }

        // Fill in the options
        for (var optionName in options)
        {
            // Skip the options which are not existing
            if (options.hasOwnProperty(optionName))
            {
                this[optionName] = options[optionName];
            }
        }
    }
};