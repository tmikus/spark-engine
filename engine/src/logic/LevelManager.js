/**
 * Manager of the game levels.
 *
 * @param {SparkEngineWorker} gameWorker Instance of the game worker.
 * @constructor
 * @class
 */
function LevelManager(gameWorker)
{
    this.m_gameWorker = gameWorker;
    this.m_levelResourceNames = [];
}

LevelManager.prototype =
{
    /**
     * Index of the current level.
     * @type {number}
     */
    m_currentLevelIndex: -1,
    /**
     * Game worker to which this level manager is added.
     * @type {SparkEngineWorker}
     */
    m_gameWorker: null,
    /**
     * Array of resource names for levels.
     * @type {string[]}
     */
    m_levelResourceNames: null,
    /**
     * Called when the levels configuration was loaded.
     *
     * @param {*} configuration Levels configuration.
     * @private
     */
    _onLevelsConfigurationLoaded: function _onLevelsConfigurationLoaded(configuration)
    {
        this.m_currentLevelIndex = configuration.startLevelIndex;
        this.m_levelResourceNames = configuration.levels;
    },
    /**
     * Called when the level was loaded.
     *
     * @param {*} levelConfiguration Level configuration loaded from the server.
     * @returns {Level} Instance of the level.
     * @private
     */
    _onLevelLoaded: function _onLevelLoaded(levelConfiguration)
    {
        try
        {
            SE_INFO("Trying to deserialize the level.");
            var level = new Level();
            level.deserialize(levelConfiguration);
            return level;
        }
        catch (ex)
        {
            SE_ERROR("Could not deserialize level.");
            throw ex;
        }
    },
    /**
     * Gets the name of current level.
     *
     * @returns {string}
     */
    getCurrentLevelName: function getCurrentLevelName()
    {
        return this.m_levelResourceNames[this.m_currentLevelIndex];
    },
    /**
     * Initialises the level manager.
     *
     * @returns {Promise} Promise of initialising the level manager.
     */
    initialise: function initialise()
    {
        return this.m_gameWorker.m_resourceManager.getResource(this.m_gameWorker.vGetLevelsConfigurationResourceName())
            .then(this._onLevelsConfigurationLoaded.bind(this));
    },
    /**
     * Loads level with specified name.
     *
     * @param {string} levelName Name of the level to load.
     * @returns {Promise} Promise of loading a level.
     */
    loadLevel: function loadLevel(levelName)
    {
        return this.m_gameWorker.m_resourceManager.getResource(levelName)
            .then(this._onLevelLoaded.bind(this));
    }
};