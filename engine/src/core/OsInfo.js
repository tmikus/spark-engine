/**
 * Class containing information about OS of the device.
 * @constructor
 * @class
 */
function OsInfo()
{
    this.m_type = Os.Unknown;
    this.m_version = new Version();
}

OsInfo.prototype =
{
    /**
     * Type of the operating system
     * @type {Os}
     */
    m_type: null,
    /**
     * Version of the OS.
     * @type {Version}
     */
    m_version: null,
    /**
     * Initialises the OS information.
     */
    initialise: function initialise()
    {
        var userAgent = navigator.userAgent;
        var iOsRegex = /\((iPad|iPhone|iPod);.*? OS (\d+)(?:_(\d+))?(?:_(\d+))?(?:_(\d+))? like.*?\)/i;
        var androidRegex = /\(.*?(Android) (\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\.(\d+))?;.*?\)/;
        var windowsPhoneRegex = /\(.*?(Windows Phone(?: OS)?) (\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\.(\d+))?;.*/i;

        var info;

        if (iOsRegex.test(userAgent))
        {
            info = iOsRegex.exec(userAgent);
            this.m_type = Os.iOs;
            this.m_version = new Version(+info[2], +info[3], +info[4], +info[5]);
        }
        else if (androidRegex.test(userAgent))
        {
            info = androidRegex.exec(userAgent);
            this.m_type = Os.Android;
            this.m_version = new Version(+info[2], +info[3], +info[4], +info[5]);
        }
        else if (windowsPhoneRegex.test(userAgent))
        {
            info = windowsPhoneRegex.exec(userAgent);
            this.m_type = Os.WindowsPhone;
            this.m_version = new Version(+info[2], +info[3], +info[4], +info[5]);
        }
    }
};