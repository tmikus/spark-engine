/**
 * Class containing information about device.
 * @constructor
 * @class
 */
function DeviceInfo()
{
}

DeviceInfo.prototype =
{
    /**
     * Information about the browser.
     * @type {BrowserInfo}
     */
    m_browser: null,
    /**
     * Information about the device OS.
     * @type {OsInfo}
     */
    m_os: null,
    /**
     * Initialises device info class.
     */
    initialise: function initialise()
    {
        this.m_browser = new BrowserInfo();
        this.m_browser.initialise();

        this.m_os = new OsInfo();
        this.m_os.initialise();
    }
};

/**
 * Gets device information class.
 *
 * @returns {DeviceInfo} Device info.
 */
DeviceInfo.get = function Device_get()
{
    if (!DeviceInfo.s_device)
    {
        DeviceInfo.s_device = new DeviceInfo();
        DeviceInfo.s_device.initialise();
    }

    return DeviceInfo.s_device;
};