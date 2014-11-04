/**
 * Worker message responsible receiving a resource.
 * @param {string} resourceName Name of the
 * @param {*} data Resource data.
 * @constructor
 * @class
 * @implements IWorkerMessage
 */
function WorkerMessage_ResourceResponse(resourceName, data)
{
    this.m_data = data;
    this.m_resourceName = resourceName;
    this.m_type = WorkerMessage_ResourceResponse.s_type;
}

WorkerMessage_ResourceResponse.s_type = 0xcadbfd8d;

WorkerMessage_ResourceResponse.prototype =
{
    /**
     * Data of the resource.
     * @type {*}
     */
    m_data: null,
    /**
     * Name of the resource.
     * @type {string}
     */
    m_resourceName: null,
    /**
     * Type of the message.
     * @type {number}
     */
    m_type: null
};