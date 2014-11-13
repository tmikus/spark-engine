/**
 * Object containing helper methods for managing classes.
 * @class
 * @static
 */
var Class =
{
    /**
     * Extends 'baseClass' with 'childPrototype'.
     *
     * @param {Function} baseClass Base prototype.
     * @param {*} childPrototype Child prototype.
     * @returns {*} Extended prototype.
     */
    extend: function extend(baseClass, childPrototype)
    {
        var intermediatePrototype = Object.create(baseClass.prototype);
        var childPrototypeKeys = Object.keys(childPrototype);
        var childPrototypeKeysLength = childPrototypeKeys.length;

        for (var keyIndex = 0; keyIndex < childPrototypeKeysLength; keyIndex++)
        {
            var propertyName = childPrototypeKeys[keyIndex];
            intermediatePrototype[propertyName] = childPrototype[propertyName];
        }

        return intermediatePrototype;
    }
};