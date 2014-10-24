/**
 * Runs the specified instance of the game.
 *
 * @param {SparkEngineApp} application Instance of the application to run.
 */
function RunGame(application)
{
    application.initialise()
        .then(application._vPostInitialise.bind(application))
        .then(application.startGameLoop.bind(application));
}