describe("Core.BaseOptions class tests.", function ()
{
    it("Should be exposed in the exports of the engine.", function ()
    {
        expect(BaseOptions).not.toBeUndefined();
    });

    it("Should not throw exception when initialized without args.", function ()
    {
        function method()
        {
            new BaseOptions();
        }

        expect(method).not.toThrow();
    });

    it("Should not throw exception when initialized with empty options list.", function ()
    {
        function method()
        {
            new BaseOptions({});
        }

        expect(method).not.toThrow();
    });

    it("Should not throw exception when initialized with some options.", function ()
    {
        function method()
        {
            new BaseOptions(
                {
                    option1: "test value",
                    option2: 42,
                    option3: {}
                });
        }

        expect(method).not.toThrow();
    });

    it("Should set the options to specified values.", function ()
    {
        var values = {
            option1: "test value",
            option2: 42,
            option3: {}
        };

        var options = new BaseOptions(values);

        expect(options.option1).toBe(values.option1);
        expect(options.option2).toBe(values.option2);
        expect(options.option3).toBe(values.option3);
    });
});