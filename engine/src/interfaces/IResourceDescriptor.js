/**
 * Defines the interface for resource descriptor.
 * This is how it is stored in the resource file definition.
 * @interface
 */
function IResourceDescriptor()
{
}

IResourceDescriptor.prototype =
{
    /**
     * Path to the resource file.
     * @type {string}
     */
    path: null,
    /**
     * Type of the resource.
     * @type {string}
     */
    type: null
};