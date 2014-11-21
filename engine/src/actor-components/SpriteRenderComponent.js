/**
 * Render component used for presenting actor on the screen as a sprite
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function SpriteRenderComponent()
{
    BaseRenderComponent.apply(this);
}

SpriteRenderComponent.s_name = "SpriteRenderComponent";

SpriteRenderComponent.prototype = Class.extend(BaseRenderComponent,
{
    /**
     * Texture to use on the sprite.
     * @type {THREE.Texture}
     */
    m_texture: null,
    /**
     * Name of the texture resource.
     * @type {string}
     */
    m_textureName: null,
    /**
     * Should the sphere be rendered using wireframe?
     * @type {boolean}
     */
    m_wireframe: false,
    /**
     * Called when the texture was loaded.
     *
     * @param {THREE.Texture} texture Loaded texture.
     * @private
     */
    _onTextureLoaded: function _onTextureLoaded(texture)
    {
        this.m_texture = texture;
    },
    /**
     * Creates the scene object for the render component.
     *
     * @returns {THREE.Object3D}
     * @protected
     */
    _vCreateSceneObject: function _vCreateSceneObject()
    {
        var material = new THREE.SpriteMaterial({ map: this.m_texture, color: this.m_colour });
        return new THREE.Sprite(material);
    },
    /**
     * Delegates the initialization to the child class.
     *
     * @param {*} data Data of the component.
     * @returns {Promise} Promise of initialization of component.
     * @protected
     */
    _vDelegateInitialise: function _vDelegateInitialise(data)
    {
        if (data.textureName)
        {
            this.m_textureName = data.textureName;
        }
        else
        {
            return Promise.reject();
        }

        if (data.wireframe)
        {
            this.m_wireframe = data.wireframe;
        }

        return this.m_owner.m_game.m_resourceManager.getResource(this.m_textureName)
            .then(this._onTextureLoaded.bind(this));
    },
    /**
     * Gets the name of the component.
     *
     * @returns {string} Name of the component.
     */
    vGetName: function vGetName()
    {
        return SpriteRenderComponent.s_name;
    }
});