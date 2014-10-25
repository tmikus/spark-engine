describe("Debugging.Log class tests.", function ()
{
    it("Logger object must not be undefined.", function ()
    {
        expect(Logger).not.toBeUndefined();
    });

    describe("Logger.destroy method tests.", function ()
    {
        it("Should not throw exception when calling.", function ()
        {
            function callMethod()
            {
                Logger.destroy();
            }

            expect(callMethod).not.toThrow();
        });
    });

    describe("Logger.initialise method tests.", function ()
    {
        it("Should not throw exception when calling.", function ()
        {
            function callMethod()
            {
                Logger.initialise();
            }

            expect(callMethod).not.toThrow();
        });
    });

    describe("Logger.log method tests.", function ()
    {
        var error = console.error;
        var warn = console.warn;
        var info = console.info;
        var log = console.log;

        beforeEach(function ()
        {
            console.error = jasmine.createSpy("error");
            console.warn = jasmine.createSpy("warn");
            console.info = jasmine.createSpy("info");
            console.log = jasmine.createSpy("log");
        });

        afterEach(function ()
        {
            console.error = error;
            console.warn = warn;
            console.info = info;
            console.log = log;
        });

        it("Should not throw exception when calling.", function ()
        {
            function callMethod()
            {
                Logger.log(LoggerLevels.Info, "Test for failing");
            }

            expect(callMethod).not.toThrow();
        });

        it("Should fire 'fatal' method from console when logging 'error'.", function ()
        {
            var testData = "Test for logging.";
            Logger.log(LoggerLevels.Fatal, "Test for logging.");
            expect(console.error).toHaveBeenCalledWith("[!] FATAL: " + testData);
        });

        it("Should fire 'error' method from console when logging 'Error'.", function ()
        {
            var testData = "Test for logging.";
            Logger.log(LoggerLevels.Error, testData);
            expect(console.error).toHaveBeenCalledWith(testData);
        });

        it("Should fire 'warn' method from console when logging 'Warning'.", function ()
        {
            var testData = "Test for logging.";
            Logger.log(LoggerLevels.Warning, testData);
            expect(console.warn).toHaveBeenCalledWith(testData);
        });

        it("Should fire 'info' method from console when logging 'Info'.", function ()
        {
            var testData = "Test for logging.";
            Logger.log(LoggerLevels.Info, testData);
            expect(console.info).toHaveBeenCalledWith(testData);
        });

        it("Should fire 'log' method from console when logging custom message.", function ()
        {
            var testTag = "Test tag";
            var testData = "Test for logging.";
            Logger.log(testTag, testData);
            expect(console.log).toHaveBeenCalledWith(testTag, testData);
        });
    });

    describe("SE_FATAL function tests.", function ()
    {
        it("Should not throw exception when calling without the exception arg.", function ()
        {
            function callFunction()
            {
                SE_FATAL("Test error message.");
            }

            expect(callFunction).not.toThrow();
        });

        it("Should not throw exception when calling with the exception arg.", function ()
        {
            function callFunction()
            {
                try
                {
                    throw "some exception";
                }
                catch (ex)
                {
                    SE_FATAL("Test error message.", ex);
                }
            }

            expect(callFunction).not.toThrow();
        });

        var log = Logger.log;

        beforeEach(function ()
        {
            Logger.log = jasmine.createSpy("log");
        });

        afterEach(function ()
        {
            Logger.log = log;
        });

        it("Should call 'Logger.log' method.", function ()
        {
            var testMessage = "Test message.";
            SE_FATAL(testMessage);
            expect(Logger.log).toHaveBeenCalledWith(LoggerLevels.Fatal, testMessage);
        });
    });

    describe("SE_ERROR function tests.", function ()
    {
        it("Should not throw exception when calling without the exception arg.", function ()
        {
            function callFunction()
            {
                SE_ERROR("Test message.");
            }

            expect(callFunction).not.toThrow();
        });

        it("Should not throw exception when calling with the exception arg.", function ()
        {
            function callFunction()
            {
                try
                {
                    throw "some exception";
                }
                catch (ex)
                {
                    SE_ERROR("Test message.", ex);
                }
            }

            expect(callFunction).not.toThrow();
        });

        var log = Logger.log;

        beforeEach(function ()
        {
            Logger.log = jasmine.createSpy("log");
        });

        afterEach(function ()
        {
            Logger.log = log;
        });

        it("Should call 'Logger.log' method.", function ()
        {
            var testMessage = "Test message.";
            SE_ERROR(testMessage);
            expect(Logger.log).toHaveBeenCalledWith(LoggerLevels.Error, testMessage);
        });
    });

    describe("SE_ERROR function tests.", function ()
    {
        it("Should not throw exception when calling.", function ()
        {
            function callFunction()
            {
                SE_WARNING("Test message.");
            }

            expect(callFunction).not.toThrow();
        });

        var log = Logger.log;

        beforeEach(function ()
        {
            Logger.log = jasmine.createSpy("log");
        });

        afterEach(function ()
        {
            Logger.log = log;
        });

        it("Should call 'Logger.log' method.", function ()
        {
            var testMessage = "Test message.";
            SE_WARNING(testMessage);
            expect(Logger.log).toHaveBeenCalledWith(LoggerLevels.Warning, testMessage);
        });
    });

    describe("SE_INFO function tests.", function ()
    {
        it("Should not throw exception when calling.", function ()
        {
            function callFunction()
            {
                SE_INFO("Test message.");
            }

            expect(callFunction).not.toThrow();
        });

        var log = Logger.log;

        beforeEach(function ()
        {
            Logger.log = jasmine.createSpy("log");
        });

        afterEach(function ()
        {
            Logger.log = log;
        });

        it("Should call 'Logger.log' method.", function ()
        {
            var testMessage = "Test message.";
            SE_INFO(testMessage);
            expect(Logger.log).toHaveBeenCalledWith(LoggerLevels.Info, testMessage);
        });
    });

    describe("SE_LOG function tests.", function ()
    {
        it("Should not throw exception when calling.", function ()
        {
            function callFunction()
            {
                SE_LOG("Test tag.", "Test message.");
            }

            expect(callFunction).not.toThrow();
        });

        var log = Logger.log;

        beforeEach(function ()
        {
            Logger.log = jasmine.createSpy("log");
        });

        afterEach(function ()
        {
            Logger.log = log;
        });

        it("Should call 'Logger.log' method.", function ()
        {
            var testTag = "Test tag";
            var testMessage = "Test message.";
            SE_LOG(testTag, testMessage);
            expect(Logger.log).toHaveBeenCalledWith(testTag, testMessage);
        });
    });
});