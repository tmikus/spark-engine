/**
 * Interface for the worker message.
 * Every worker message must implement it.
 * @interface
 */
function IWorkerMessage()
{
}

IWorkerMessage.prototype =
{
    /**
     * Type of the message.
     * @type {number}
     */
    m_type: null
};