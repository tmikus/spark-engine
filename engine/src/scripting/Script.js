/**
 * Class responsible for running scripts.
 *
 * @param {string} content A content of the script.
 * @constructor
 * @class
 */
function Script(content)
{
    this.m_content = content;
    this.m_context = {};
}

Script.prototype =
{
    /**
     * Content of the script.
     * @type {string}
     */
    m_content: null,
    /**
     * This context of the script.
     * @type {*}
     */
    m_context: null,
    /**
     * Executable version of the script.
     * @type {Function}
     */
    m_executable: null,
    /**
     * Has the script been run at least one time?
     * @type {boolean}
     */
    m_wasRun: false,
    /**
     * Destroys the instance of the script.
     */
    destroy: function destroy()
    {
        delete this.m_executable;
    },
    /**
     * Gets the script exports object.
     * It can be anything.
     * @returns {*}
     */
    getExports: function getExports()
    {
        return this.m_context.exports;
    },
    /**
     * Initialises the script by compiling the contents of it.
     */
    initialise: function initialise()
    {
        this.m_executable = (new Function(this.m_content)).bind(this.m_context);
    },
    /**
     * Runs the script.
     */
    run: function run()
    {
        this.m_wasRun = true;
        this.m_executable();
    },
    /**
     * Runs the script but just once.
     * If you call this more than one time nothing will happen.
     */
    runOnce: function runOnce()
    {
        if (this.m_wasRun)
            return;

        this.run();
    }
};