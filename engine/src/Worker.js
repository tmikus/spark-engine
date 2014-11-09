/**
 * Starts the game worker.
 * @param {SparkEngineWorker} worker Instance of the game worker to start.
 */
function RunGameWorker(worker)
{
    worker.initialise()
        .then(worker.vPostInitialise.bind(worker))
        .then(worker.startGameLoop.bind(worker))
        .then(function ()
        {
            self.postMessage(WorkerInitialisationStatus.Success);
        })
        .catch(function ()
        {
            self.postMessage(WorkerInitialisationStatus.Failure);
        });
}