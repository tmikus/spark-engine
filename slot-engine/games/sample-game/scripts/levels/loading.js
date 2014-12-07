/**
 * Class responsible for logo show animation.
 *
 * @param {Actor} gameLogo Game logo actor.
 * @constructor
 * @class
 */
function ShowLogoProcess(gameLogo)
{
    Process.apply(this, arguments);

    this.m_gameLogo = gameLogo;
}

ShowLogoProcess.prototype = Class.extend(Process,
{
    /**
     * Game logo actor.
     * @type {Actor}
     */
    m_gameLogo: null,
    /**
     * Target position for logo.
     * @type {THREE.Vector3}
     */
    m_targetPosition: null,
    /**
     * Called when the process was initialized.
     * @protected
     * @virtual
     */
    _vOnInit: function _vOnInit()
    {
        Process.prototype._vOnInit.apply(this, arguments);

        this.m_originalYPosition = this.m_gameLogo.m_transform.m_localPosition.y;
        this.m_targetPosition = new THREE.Vector3(0, 50, 0);
    },
    /**
     * Called when the process was requested to update.
     *
     * @param {GameTime} gameTime Time of the game at the time of updating.
     * @protected
     * @virtual
     */
    _vOnUpdate: function _vOnUpdate(gameTime)
    {
        var gameLogo = this.m_gameLogo;
        var localPosition = gameLogo.m_transform.m_localPosition;

        localPosition.lerp(this.m_targetPosition, 0.02);

        gameLogo.m_renderer.m_opacity = Math.abs((localPosition.y - this.m_originalYPosition) / this.m_targetPosition.y);

        if (gameLogo.m_renderer.m_opacity > 0.96)
        {
            gameLogo.m_renderer.m_opacity = 1;
            this.succeed();
        }
    }
});

/**
 * Script responsible for moving ball
 *
 * @param {Actor} actor Instance of the actor.
 * @constructor
 * @class
 * @extends BaseActorScript
 */
function LoadingScreenScript(actor)
{
    BaseActorScript.apply(this, arguments);
}

LoadingScreenScript.prototype = Class.extend(BaseActorScript,
{

    m_gameLogo: null,
    /**
     * Called every time game requests the logic to be updated.
     *
     * @param {GameTime} gameTime Time of the game.
     */
    vOnUpdate: function vOnUpdate(gameTime)
    {
        if (!this.m_gameLogo)
        {
            this.m_gameLogo = this.getActorsByType("GameLogo")[0];

            var delayProcess = new DelayProcess(0.5);
            delayProcess.attachChild(new ShowLogoProcess(this.m_gameLogo));
            this.m_actor.m_game.m_gameLogic.m_processManager.attachProcess(delayProcess);
        }
    },
    /**
     * Called after the script was initialised.
     */
    vPostInitialise: function vPostInitialise()
    {

    }
});

this.exports = LoadingScreenScript;