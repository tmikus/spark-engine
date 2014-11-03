/**
 * Worker message responsible for requesting a resource.
 * @param {string} resourceName Name of the requested resource.
 * @constructor
 * @class
 */
function WorkerMessage_ResourceRequest(resourceName)
{
    this.m_resourceName = resourceName;
    this.m_type = WorkerMessage_ResourceRequest.s_type;
}

WorkerMessage_ResourceRequest.s_type = 0x122e965e;

WorkerMessage_ResourceRequest.prototype =
{
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