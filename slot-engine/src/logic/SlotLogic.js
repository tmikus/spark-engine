/**
 * Game logic for slot game.
 *
 * @param {SlotApp} game Instance of the game.
 * @constructor
 * @class
 * @extends BaseGameLogic
 */
function SlotLogic(game)
{
    BaseGameLogic.apply(this, arguments);
}

SlotLogic.prototype = Class.extend(BaseGameLogic,
{
    /**
     * Changes the state of the game logic.
     *
     * @param {BaseGameState|number} state State to which switch.
     */
    vChangeState: function vChangeState(state)
    {
        BaseGameLogic.prototype.vChangeState.apply(this, arguments);

        switch (state)
        {
            case BaseGameState.WaitingForPlayers:
                if (this.m_expectedLocalPlayers != 1)
                {
                    var errorMessage = "Expected only 1 local player but game requires: " + this.m_expectedLocalPlayers;
                    SE_ERROR(errorMessage);
                    throw errorMessage;
                }

                // Creating local player views.
                // For now game supports only one local player but in future - who knows :)
                for (var localPlayerIndex = 0; localPlayerIndex < this.m_expectedLocalPlayers; localPlayerIndex++)
                {
                    this.vAddView(new SlotHumanView(this));
                }

                // TODO: Return here if we are just joining remote game (m_proxy == true)

                // Creating remote player views.
                for (var remotePlayerIndex = 0; remotePlayerIndex < this.m_expectedRemotePlayers; remotePlayerIndex++)
                {
                    // TODO: Create view for remote player
                }

                // Creating AI player views.
                for (var aiPlayerIndex = 0; aiPlayerIndex < this.m_expectedAiPlayers; aiPlayerIndex++)
                {
                    // TODO: Create view for AI player
                }
                break;
            case BaseGameState.SpawningPlayerActors:
                // TODO: Return here when we are a client connecting to a server

                // TODO: Spawning local player actor
                // TODO: Spawning network player actor
                // TODO: Spawning AI player actor
                break;

        }
    },
    /**
     * Called when the game is being loaded.
     * Developers can perform additional loading here.
     *
     * @param {Level} level Instance of the level.
     * @returns {Promise} Promise of loading of the game.
     */
    vLoadGameDelegate: function vLoadGameDelegate(level)
    {

    }
});