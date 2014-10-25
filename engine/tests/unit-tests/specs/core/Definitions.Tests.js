describe("Core.Definitions tests.", function ()
{
    describe("empty function tests.", function ()
    {
        it("Should not be undefined.", function ()
        {
            expect(empty).not.toBeUndefined();
        });
    });

    describe("notImplemented function tests.", function ()
    {
        var log = Logger.log;

        beforeEach(function ()
        {
            Logger.log = jasmine.createSpy("log");
        });

        afterEach(function ()
        {
            Logger.log = log;
        });

        it("Should not be undefined.", function ()
        {
            expect(notImplemented).not.toBeUndefined();
        });

        it("Should throw not implemented when calling.", function ()
        {
            expect(notImplemented).toThrow();
        });

        it("Should log error to logger.", function ()
        {
            try
            {
                notImplemented();
            }
            catch (ex) { }

            expect(Logger.log).toHaveBeenCalled();
        });
    });

    describe("EVENT_QUEUES_NUMBER tests.", function ()
    {
        it("Should equal 2.", function ()
        {
            expect(EVENT_QUEUES_NUMBER).toEqual(2);
        });
    });

    describe("EVENT_INFINITE_UPDATE tests.", function ()
    {
        it("Should equal 0xFFFFFFF.", function ()
        {
            expect(EVENT_INFINITE_UPDATE).toEqual(0xFFFFFFF);
        });
    });
});