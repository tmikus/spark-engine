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
     * @type {{ initialTransform: THREE.Matrix4, overrides: *, resourceName: string }[]}
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
            var initialTransform = null;

            // Does the actor has defined initial transform?
            if (levelActor.initialTransform)
            {
                // Verify if the transform matrix is in correct format.
                if (!(levelActor.initialTransform instanceof Array)
                    || levelActor.initialTransform.length != 16)
                {
                    const transformIncorrectErrorMessage = "Could not deserialize the level. Actor's transform matrix is invalid!";
                    SE_ERROR(transformIncorrectErrorMessage);
                    throw transformIncorrectErrorMessage;
                }

                // The code below creates a transform matrix and sets the values to values from
                // actor's configuration.
                initialTransform = new THREE.Matrix4();
                initialTransform.set.apply(initialTransform, levelActor.initialTransform);
            }

            this.m_staticActors[actorIndex] =
            {
                initialTransform: initialTransform,
                overrides: levelActor.overrides,
                resourceName: levelActor.resourceName
            };
        }
    }
};