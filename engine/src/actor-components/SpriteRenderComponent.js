/**
 * Render component used for presenting actor on the screen as a sprite
 * @constructor
 * @class
 * @extends BaseRenderComponent
 */
function SpriteRenderComponent()
{
    BaseRenderComponent.apply(this);

    this.m_uvOffset = new THREE.Vector2(0, 0);
    this.m_uvScale = new THREE.Vector2(1, 1);
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
     * UV offset for the material.
     * @type {THREE.Vector2}
     */
    m_uvOffset: null,
    /**
     * UV scale for the material.
     * @type {THREE.Vector2}
     */
    m_uvScale: null,
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
        material.uvOffset = this.m_uvOffset;
        material.uvScale = this.m_uvScale;
        material.wireframe = this.m_wireframe;
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
        if (!data.textureName)
            return Promise.reject();

        this.m_textureName = data.textureName;

        if (data.uvOffset)
        {
            this.m_uvOffset = new THREE.Vector2(data.uvOffset[0], data.uvOffset[1]);
        }

        if (data.uvScale)
        {
            this.m_uvScale = new THREE.Vector2(data.uvScale[0], data.uvScale[1]);
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