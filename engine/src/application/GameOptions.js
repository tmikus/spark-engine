/**
 * Game options object.
 *
 * @param {SparkEngineApp} game Instance of the game to which those options are bound.
 * @param {*} [options] Options defaults.
 * @constructor
 * @class
 * @extends BaseOptions
 */
function GameOptions(game, options)
{
    BaseOptions.apply(this, [options]);

    this.m_game = game;
}

GameOptions.prototype = Class.extend(BaseOptions,
{
    /**
     * Should the renderer always use the 2D context?
     * @type {boolean}
     */
    m_forceCanvas2DContext: false,
    /**
     * Instance of the game to which those options are bound.
     * @type {SparkEngineApp}
     */
    m_game: null,
    /**
     * Language of the game used at the moment.
     * @type {string}
     */
    m_language: null,
    /**
     * Name of the level player is currently playing in.
     * @type {string}
     */
    m_levelName: null,
    /**
     * Called when the options have been loaded from the server.
     *
     * @param {*} options Options object.
     * @private
     */
    _onOptionsLoaded: function _onOptionsLoaded(options)
    {
        this.m_forceCanvas2DContext = options.forceCanvas2DContext;
        this.m_language = options.language;
    },
    /**
     * Tries to load option from the local storage.
     *
     * @param {string} optionName Name of the option to load.
     * @private
     */
    _tryLoadingFromLocalStorage: function _tryLoadingFromLocalStorage(optionName)
    {
        var value = localStorage.getItem(optionName);
        if (value !== undefined && value !== null)
        {
            this["m_" + optionName] = value;
        }
    },
    /**
     * Loads the game options from the browser's local storage.
     *
     * @return {boolean} True if loaded; otherwise false.
     */
    loadFromLocalStorage: function loadFromLocalStorage()
    {
        SE_INFO("Loading game options from the local storage.");
        this._tryLoadingFromLocalStorage("forceCanvas2DContext");
        this._tryLoadingFromLocalStorage("language");
        return true;
    },
    /**
     * Loads the game options from the server.
     *
     * @param {string} resourceName Name of the game options resource file.
     * @returns {Promise} Promise of the loading of options.
     */
    loadFromServer: function loadFromServer(resourceName)
    {
        SE_INFO("Loading game options from the server.");
        return this.m_game.m_resourceManager.getResource(resourceName)
            .then(this._onOptionsLoaded.bind(this));
    }
});