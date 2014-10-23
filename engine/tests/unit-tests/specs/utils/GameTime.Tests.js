describe("Utils.GameTime tests", function ()
{
    const baseMockResult = 10000;

    var gameTime = null;
    var mockResult = baseMockResult;
    var mockNow = function ()
    {
        return mockResult;
    };
    var originalNow = performance.now;

    beforeEach(function ()
    {
        mockResult = baseMockResult;
        performance.now = mockNow;
        gameTime = new GameTime();
    });

    afterEach(function ()
    {
        performance.now = originalNow;
    });

    it("GameTime should not be undefined.", function ()
    {
        expect(window.GameTime).not.toBeUndefined();
    });

    describe("GameTime constructor tests.", function ()
    {
        it("Should not throw exception when calling.", function ()
        {
            function callMethod()
            {
                new GameTime();
            }

            expect(callMethod).not.toThrow();
        });

        it("Should 'm_lastFrameSystemTime' to the time at object's creation.", function ()
        {
            mockResult = 3;

            var testTime = new GameTime();
            expect(testTime.m_lastFrameSystemTime).toEqual(mockResult);
        });
    });

    describe("GameTime.resetTimeSinceLevelLoad method tests.", function ()
    {
        it("Should not throw exception when calling.", function ()
        {
            function callMethod()
            {
                gameTime.resetTimeSinceLevelLoad();
            }

            expect(callMethod).not.toThrow();
        });

        it("Should reset the time when calling.", function ()
        {
            gameTime.m_timeSinceLevelLoad = 123;

            gameTime.resetTimeSinceLevelLoad();

            expect(gameTime.m_timeSinceLevelLoad).toBe(0);
        });
    });

    describe("GameTime.update method tests.", function ()
    {
        it("Should not throw exception when calling.", function ()
        {
            function callMethod()
            {
                gameTime.update();
            }

            expect(callMethod).not.toThrow();
        });

        it("Should update 'm_unscaledDeltaTime' by correct amount of time.", function ()
        {
            var testDeltaTime = 100;
            mockResult += testDeltaTime;
            gameTime.update();

            // Dividing by 1000 because we want seconds!
            expect(gameTime.m_unscaledDeltaTime).toEqual(testDeltaTime / 1000);
        });

        it("Should update 'm_unscaledTimeSinceStartup' by correct amount of time.", function ()
        {
            var testDeltaTime = 100;
            mockResult += testDeltaTime;
            gameTime.update();

            mockResult += testDeltaTime;
            gameTime.update();

            // Dividing by 1000 because we want seconds!
            expect(gameTime.m_unscaledTimeSinceStartup).toEqual((testDeltaTime * 2) / 1000);
        });

        it("Should update 'm_deltaTime' by correct amount of time.", function ()
        {
            var testDeltaTime = 100;
            var testTimeScale = 2;
            mockResult += testDeltaTime;

            gameTime.m_timeScale = testTimeScale;
            gameTime.update();

            expect(gameTime.m_deltaTime).toEqual((testDeltaTime * testTimeScale) / 1000)
        });

        it("Should update 'm_timeSinceStartup' by correct amount of time.", function ()
        {
            var testDeltaTime = 100;
            var testTimeScale = 2;
            mockResult += testDeltaTime;

            gameTime.m_timeScale = testTimeScale;
            gameTime.update();

            mockResult += testDeltaTime;
            gameTime.update();

            // Dividing by 1000 because we want seconds!
            expect(gameTime.m_timeSinceStartup).toEqual(((testDeltaTime * 2) * testTimeScale) / 1000);
        });

        it("Should update 'm_timeSinceLevelLoad' by correct amount of time.", function ()
        {
            var testDeltaTime = 100;
            var testTimeScale = 2;
            mockResult += testDeltaTime;

            gameTime.m_timeScale = testTimeScale;
            gameTime.update();

            mockResult += testDeltaTime;
            gameTime.update();

            // Dividing by 1000 because we want seconds!
            expect(gameTime.m_timeSinceLevelLoad).toEqual(((testDeltaTime * 2) * testTimeScale) / 1000);
        });

        it("Should increase 'm_frameCount' each time calling 'update' method.", function ()
        {
            gameTime.update();
            gameTime.update();

            expect(gameTime.m_frameCount).toEqual(2);
        });

        it("Should NOT set 'm_deltaTime' to 0 if frame took 2 seconds to update.", function ()
        {
            mockResult += 2000;
            gameTime.update();

            expect(gameTime.m_deltaTime).not.toEqual(0);
        });

        it("Should set 'm_deltaTime' to 0 if frame took longer than 2 seconds to update.", function ()
        {
            mockResult += 2001;
            gameTime.update();

            expect(gameTime.m_deltaTime).toEqual(0);
        });

        it("Should NOT set 'm_unscaledDeltaTime' to 0 if frame took 2 seconds to update.", function ()
        {
            mockResult += 2000;
            gameTime.update();

            expect(gameTime.m_unscaledDeltaTime).not.toEqual(0);
        });

        it("Should set 'm_unscaledDeltaTime' to 0 if frame took longer than 2 seconds to update.", function ()
        {
            mockResult += 2001;
            gameTime.update();

            expect(gameTime.m_unscaledDeltaTime).toEqual(0);
        });
    });
});