/**
 * Logger for storing messages from the game engine.
 *
 * @class
 * @static
 */
var Logger = {
    /**
     * Destroys the logger.
     */
    destroy: function destroy()
    {
        // TODO: Some destroying magic can happen here
    },
    /**
     * Initializes the logger instance.
     */
    initialise: function initialise()
    {
        // TODO: Some magic can happen here
    },
    /**
     * Logs the message under following tag with specified message.
     *
     * @param {LoggerLevels|string} tag Tag of the message.
     * @param {string} message Message to log.
     */
    log: function log(tag, message)
    {
        switch (tag)
        {
            case LoggerLevels.Fatal:
                window.g_console && g_console.addLog("fatal", message);
                console.error("[!] FATAL: " + message);
                break;

            case LoggerLevels.Error:
                window.g_console && g_console.addLog("error", message);
                console.error(message);
                break;

            case LoggerLevels.Warning:
                window.g_console && g_console.addLog("warning", message);
                console.warn(message);
                break;

            case LoggerLevels.Info:
                window.g_console && g_console.addLog("info", message);
                console.info(message);
                break;

            default:
                window.g_console && g_console.addLog(tag, message);
                console.log(tag, message);
                break;
        }
    }
};

/**
 * Enumeration of level of logs.
 * @enum
 */
var LoggerLevels =
{
    Fatal: 1,
    Error: 2,
    Warning: 3,
    Info: 4
};

/**
 * Logs the fatal application error to the console.
 *
 * @param {string} message Message to log.
 * @param {*} [exception] Optional. Exception.
 */
function SE_FATAL(message, exception)
{
    if (exception)
    {
        Logger.log(LoggerLevels.Fatal, message + JSON.stringify(exception));
    }
    else
    {
        Logger.log(LoggerLevels.Fatal, message);
    }
}

/**
 * Logs the application error to the console.
 *
 * @param {string} message Message to log.
 * @param {*} [exception] Optional. Exception.
 */
function SE_ERROR(message, exception)
{
    if (exception)
    {
        Logger.log(LoggerLevels.Error, message + JSON.stringify(exception));
    }
    else
    {
        Logger.log(LoggerLevels.Error, message);
    }
}

/**
 * Logs the warning to the console.
 *
 * @param {string} message Message to log.
 */
function SE_WARNING(message)
{
    Logger.log(LoggerLevels.Warning, message);
}

/**
 * Logs the info to the console.
 *
 * @param {string} message Message to log.
 */
function SE_INFO(message)
{
    Logger.log(LoggerLevels.Info, message);
}

/**
 * Logs the custom information to the console.
 *
 * @param {string} tag Tag of the message.
 * @param {string} message Message to log.
 */
function SE_LOG(tag, message)
{
    Logger.log(tag, message);
}