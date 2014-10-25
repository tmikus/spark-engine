//
// Main entrance of the worker.
// This is the place where the worker starts its work.
//
var worker = new SparkEngineWorker();
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