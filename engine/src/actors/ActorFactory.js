/**
 * Creates instance of the actors factory.
 * This factory can be used to create new actors and their components.
 *
 * @param {SparkEngineApp} game Instance of the game.
 * @constructor
 * @class
 */
function ActorFactory(game)
{
    this.m_componentFactory = new ActorComponentFactory();
    this.m_game = game;
}

ActorFactory.prototype =
{
    /**
     * Factory for the actor's components.
     * @type {ActorComponentFactory}
     */
    m_componentFactory: null,
    /**
     * Instance of the game to which this factory belongs.
     * @type {SparkEngineApp}
     */
    m_game: null,
    /**
     * ID of the last created actor.
     * @type {number}
     */
    m_lastActorId: INVALID_ACTOR_ID,
    /**
     * Creates the actor based on the resource file.
     *
     * @param {string} actorResourceName Name of the actor resource.
     * @param {*} overrides Overrides for the actor.
     * @param {THREE.Matrix4} initialTransform Initial transform of the actor.
     * @param {number} serverActorId ID of the actor returned from the server.
     * @param {{components: []}} data Actor resource file data.
     * @returns {Promise} Promise of creation of actor.
     * @private
     */
    _createActorFromResource: function _createActorFromResource(actorResourceName, overrides, initialTransform, serverActorId, data)
    {
        // Create the actor.
        var actor = new Actor(this.m_game, serverActorId || ++this.m_lastActorId);

        // Initialise the actor.
        if (!actor.initialise(data))
        {
            SE_ERROR("Initialisation of the actor has failed! Resource file: " + actorResourceName);
            return null;
        }

        // Are there components?
        var components = data.components;
        var componentPromises = [];
        if (components)
        {
            // Iterate over them and create components.
            var componentsLength = components.length;
            for (var componentIndex = 0; componentIndex < componentsLength; componentIndex++)
            {
                // Create the component.
                var componentPromise = this._createComponent(actor, components[componentIndex]);

                // Setup integration with initialization and actor.
                componentPromise
                    .then(function (component)
                    {
                        // Add the component to the actor.
                        actor.addComponent(component);
                    })
                    ["catch"](function ()
                    {
                        SE_ERROR("Initialisation of the actor component has failed. Actor resource: " + actorResourceName);
                    });

                componentPromises.push(componentPromise);
            }
        }

        // Create initialization promise
        var actorPromise = Promise.all(componentPromises)
            .then(function ()
            {
                if (actor.m_transform)
                    return;

                var transformComponentDefinition =
                {
                    type: "TransformComponent",
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1]
                };

                return this._createComponent(actor, transformComponentDefinition)
                    .then(function (component)
                    {
                        actor.addComponent(component);
                    })
                    ["catch"](function ()
                    {
                        SE_ERROR("Initialisation of the actor component has failed. Actor resource: " + actorResourceName);
                    });
            }.bind(this))
            ["catch"](function ()
            {
                SE_ERROR("Initialization of actor has failed.");
                actor.destroy();
            });

        // Are there any overrides for the actor?
        if (overrides)
        {
            actorPromise = actorPromise.then(this.modifyActor.bind(this, actor, overrides));
        }

        // TODO: Setting initial transform of the actor.

        // Trigger post initialise
        return actorPromise.then(function ()
        {
            actor.postInitialise();
            return actor;
        });
    },
    /**
     * Creates a new component based on the specified component data.
     *
     * @param {Actor} actor Actor to which this component will be added.
     * @param {*} componentData Component data.
     * @returns {Promise} Actor component creation promise
     */
    _createComponent: function _createComponent(actor, componentData)
    {
        var component = null;

        return new Promise(function (resolve, reject)
            {
                // Get and validate the type of the component
                var componentName = componentData.type;
                if (!componentName)
                {
                    SE_ERROR("Could not create component: type is missing.");
                    reject();
                }

                SE_INFO("Creating component with type: " + componentName);

                // Getting ID of the component.
                var componentId = ActorComponent.GetIdFromName(componentName);

                // Creating instance of the component based on the ID.
                component = this.m_componentFactory.createById(componentId);

                // has the component been created?
                if (component)
                {
                    component.m_owner = actor;
                    resolve(component);
                }
                else
                {
                    SE_ERROR("Could not create instance of the component with name: " + componentName);
                    reject();
                }
            }.bind(this))
            .then(function ()
            {
                return component.vInitialise(componentData);
            })
            .then(function ()
            {
                return component;
            });
    },
    /**
     * Creates a new actor from specified actor resource file.
     * Optionally it also overrides some fields of the actor.
     *
     * @param {string} actorResourceName Name of the actor resource.
     * @param {*} [overrides] Overrides for the actor.
     * @param {THREE.Matrix4} [initialTransform] Initial transform of the actor.
     * @param {number} [serverActorId] ID of the actor returned from the server.
     * @returns {Promise} Actor creation promise.
     */
    createActor: function createActor(actorResourceName, overrides, initialTransform, serverActorId)
    {
        return this.m_game.m_resourceManager.getResource(actorResourceName)
            .then(this._createActorFromResource.bind(this, actorResourceName, overrides, initialTransform, serverActorId));
    },
    /**
     * Modifies actor with specified overrides.
     *
     * @param {Actor} actor Instance of the actor.
     * @param {[]} overrides Overrides for the actor.
     * @returns {Promise} Promise of actor's modification.
     */
    modifyActor: function modifyActor(actor, overrides)
    {
        var promises = [];

        // Iterating over list of components to override.
        for (var overrideIndex = 0; overrideIndex < overrides.length; overrideIndex++)
        {
            var componentData = overrides[overrideIndex];

            // Get and validate the type of the component
            var componentName = componentData.type;
            if (!componentName)
            {
                SE_ERROR("Could not modify component: type is missing.");
                return null;
            }

            // Finding component by name.
            var component = actor.getComponentByName(componentName);

            // Checking component.
            if (component)
            {
                // Initializing the component.
                promises.push(component.vInitialise(componentData)
                        .then(component.vOnChanged.bind(component))
                        ["catch"](function ()
                        {
                            SE_ERROR("Initialization of the component has failed.");
                        })
                );
            }
            else
            {
                promises.push(
                    this._createComponent(actor, componentData)
                        .then(function (component)
                        {
                            actor.addComponent(component);
                        })
                        ["catch"](function ()
                        {
                            SE_ERROR("Initialization of the component has failed.");
                        })
                );
            }
        }

        return Promise.all(promises);
    }
};