/**
 * Class containing information about browser.
 * @constructor
 * @class
 */
function BrowserInfo()
{
    this.m_type = Browser.Unknown;
    this.m_version = new Version();
}

BrowserInfo.prototype =
{
    /**
     * Type of the browser.
     * @type {Browser}
     */
    m_type: null,
    /**
     * Version of the browser.
     * @type {Version}
     */
    m_version: null,
    /**
     * Initialises the browser information.
     */
    initialise: function initialise()
    {
        // TODO: Identifying type of the browser.
    }
};