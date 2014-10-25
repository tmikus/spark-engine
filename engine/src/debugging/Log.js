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
                console.error("[!] FATAL: " + message);
                break;

            case LoggerLevels.Error:
                console.error(message);
                break;

            case LoggerLevels.Warning:
                console.warn(message);
                break;

            case LoggerLevels.Info:
                console.info(message);
                break;

            default:
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