/**
 * Worker message responsible for starting loading the game.
 * @constructor
 * @class
 * @implements IWorkerMessage
 */
function WorkerMessage_LoadGame()
{
    this.m_type = WorkerMessage_LoadGame.s_type;
}

WorkerMessage_LoadGame.s_type = 0xab018120;

WorkerMessage_LoadGame.prototype =
{
    /**
     * Type of the message.
     * @type {number}
     */
    m_type: null
};