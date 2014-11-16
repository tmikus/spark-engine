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
     * Function for resolving promise of loading options from game.
     * @type {Promise}
     */
    m_loadOptionsFromGamePromiseResolve: null,
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
     * Deserializes game options from data object.
     *
     * @param {*} options Options data object.
     */
    deserialize: function deserialize(options)
    {
        this.m_forceCanvas2DContext = options.forceCanvas2DContext;
        this.m_language = options.language;
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
            .then(this.deserialize.bind(this));
    },
    /**
     * Serializes the game options to the transfer object.
     *
     * @returns {*} Game options.
     */
    serialize: function serialize()
    {
        return {
            forceCanvas2DContext: this.m_forceCanvas2DContext,
            language: this.m_language
        };
    }
});