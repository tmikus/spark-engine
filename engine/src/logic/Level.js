/**
 * Class containing information about a level.
 * @constructor
 * @class
 */
function Level()
{
    this.m_scripts =
    {
        preLoad: null,
        postLoad: null
    };
    this.m_staticActors = [];
}

Level.prototype =
{
    /**
     * Name of the level.
     * @type {string}
     */
    m_name: null,
    /**
     * Object containing scripts to run at specific stages of the level.
     * @type {{ preLoad: string, postLoad: string }}
     */
    m_scripts: null,
    /**
     * Array of static actors to add to the level.
     * @type {{ overrides: *, resourceName: string }[]}
     */
    m_staticActors: null,
    /**
     * Deserializes level information.
     * @param level Level object.
     */
    deserialize: function deserialize(level)
    {
        this.m_name = level.name;
        this.m_scripts.postLoad = level.scripts.postLoad;
        this.m_scripts.preLoad = level.scripts.preLoad;

        this.m_staticActors = new Array(level.staticActors.length);
        for (var actorIndex = 0; actorIndex < level.staticActors.length; actorIndex++)
        {
            var levelActor = level.staticActors[actorIndex];
            this.m_staticActors[actorIndex] =
            {
                overrides: levelActor.overrides,
                resourceName: levelActor.resourceName
            };
        }
    }
};