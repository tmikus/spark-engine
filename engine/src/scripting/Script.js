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
        this.m_executable();
    }
};