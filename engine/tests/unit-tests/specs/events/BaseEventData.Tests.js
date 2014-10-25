describe("Events.BaseEventData class tests.", function ()
{
    it("BaseEventData class must not be undefined.", function ()
    {
        expect(BaseEventData).not.toBeUndefined();
    });

    describe("Constructor tests.", function ()
    {
        it("Should not throw when calling with timestamp.", function ()
        {
            function callConstructor()
            {
                new BaseEventData(21312);
            }

            expect(callConstructor).not.toThrow();
        });

        it("Should not throw when calling without timestamp.", function ()
        {
            function callConstructor()
            {
                new BaseEventData();
            }

            expect(callConstructor).not.toThrow();
        });

        it("Should set timestamp to value when calling with timestamp.", function ()
        {
            var value = 123;
            var eventData = new BaseEventData(value);

            expect(eventData.m_timeStamp).toEqual(value);
        });

        it("Should set timestamp to 0 when calling without timestamp.", function ()
        {
            var eventData = new BaseEventData();

            expect(eventData.m_timeStamp).toEqual(0);
        });
    });
});