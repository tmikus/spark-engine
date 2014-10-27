describe("Events.EventService class tests.", function ()
{
    it("EventService must not be undefined.", function ()
    {
        expect(EventService).not.toBeUndefined();
    });

    describe("Constructor tests.", function ()
    {
        it("Should not throw when calling.", function ()
        {
            function callConstructor()
            {
                new EventService();
            }

            expect(callConstructor).not.toThrow();
        });

        it("Should create a correct number of event queues.", function ()
        {
            var eventService = new EventService();
            expect(eventService.m_eventQueues.length).toEqual(EVENT_QUEUES_NUMBER);
        });
    });

    describe("EventService.abortEvent method tests.", function ()
    {
        var callbackObj;
        var eventService;

        beforeEach(function ()
        {
            eventService = new EventService();
            callbackObj = jasmine.createSpyObj('callbackObj', ['onEvent']);

            eventService.addEventListener(EventData_Test.s_type, callbackObj.onEvent);
        });

        var dataSets =
        [
            {
                numberOfEventsToAdd: 0,
                expectedEventsAfterRemoval: 0,
                removeAll: false
            },
            {
                numberOfEventsToAdd: 0,
                expectedEventsAfterRemoval: 0,
                removeAll: true
            },
            {
                numberOfEventsToAdd: 1,
                expectedEventsAfterRemoval: 0,
                removeAll: false
            },
            {
                numberOfEventsToAdd: 1,
                expectedEventsAfterRemoval: 0,
                removeAll: true
            },
            {
                numberOfEventsToAdd: 2,
                expectedEventsAfterRemoval: 1,
                removeAll: false
            },
            {
                numberOfEventsToAdd: 2,
                expectedEventsAfterRemoval: 0,
                removeAll: true
            }
        ];

        for (var dataSetIndex = 0; dataSetIndex < dataSets.length; dataSetIndex++)
        {
            var testData = dataSets[dataSetIndex];
            it("Should not throw when calling a method with {0} events and removing all is {1}"
                .format( testData.numberOfEventsToAdd,  testData.removeAll), function (testData)
            {
                function callMethod()
                {
                    eventService.abortEvent(EventData_Test.s_type, testData.removeAll);
                }

                for (var index = 0; index < testData.numberOfEventsToAdd; index++)
                {
                    eventService.queueEvent(new EventData_Test());
                }

                expect(callMethod).not.toThrow();
            }.bind(this, testData));

            it("Should have in queue {0} after aborting {1} from {2} possible events.".format(
                testData.expectedEventsAfterRemoval,
                testData.removeAll ? "all" : "one",
                testData.expectedEventsAfterRemoval),
                function (testData)
            {
                for (var index = 0; index < testData.numberOfEventsToAdd; index++)
                {
                    eventService.queueEvent(new EventData_Test());
                }

                eventService.abortEvent(EventData_Test.s_type, testData.removeAll);
                expect(eventService.m_eventQueues[eventService.m_activeQueueNumber].length).toEqual(testData.expectedEventsAfterRemoval);
            }.bind(this, testData));
        }
    });

    describe("EventService.addEventListener method tests.", function ()
    {
        var callbackObj;
        var eventService;

        beforeEach(function ()
        {
            eventService = new EventService();
            callbackObj = jasmine.createSpyObj('callbackObj', ['onEvent']);
        });

        it("Should not throw when adding event listener for the first time.", function ()
        {
            function callMethod()
            {
                eventService.addEventListener(EventData_Test.s_type, callbackObj.onEvent);
            }

            expect(callMethod).not.toThrow();
        });

        it("Should not throw when adding same event listener for the second time.", function ()
        {
            function callMethod()
            {
                eventService.addEventListener(EventData_Test.s_type, callbackObj.onEvent);
            }

            eventService.addEventListener(EventData_Test.s_type, callbackObj.onEvent);
            expect(callMethod).not.toThrow();
        });

        it("Should not throw when adding other event listener.", function ()
        {
            function callMethod()
            {
                eventService.addEventListener(EventData_Test.s_type, callbackObj.onEvent);
            }

            eventService.addEventListener(EventData_Test.s_type, function () { });
            expect(callMethod).not.toThrow();
        });

        it("Should return true when adding event for the first time.", function ()
        {
            var result = eventService.addEventListener(EventData_Test.s_type, callbackObj.onEvent);

            expect(result).toBeTruthy();
        });

        it("Should return false when adding event for the second time.", function ()
        {
            eventService.addEventListener(EventData_Test.s_type, callbackObj.onEvent);
            var result = eventService.addEventListener(EventData_Test.s_type, callbackObj.onEvent);

            expect(result).toBeFalsy();
        });

        it("Should return true when adding other event.", function ()
        {
            eventService.addEventListener(EventData_Test.s_type, function () { });
            var result = eventService.addEventListener(EventData_Test.s_type, callbackObj.onEvent);

            expect(result).toBeTruthy();
        });
    });

    describe("EventService.createEvent method tests.", function ()
    {
        var eventService;

        beforeEach(function ()
        {
            eventService = new EventService();
        });

        it("Should not throw when calling without event registered.", function ()
        {
            function callMethod()
            {
                eventService.createEvent(EventData_Test.s_type);
            }

            expect(callMethod).not.toThrow();
        });

        it("Should not throw when calling with event registered.", function ()
        {
            function callMethod()
            {
                eventService.createEvent(EventData_Test.s_type);
            }

            eventService.registerEvent(EventData_Test.s_type, EventData_Test);
            expect(callMethod).not.toThrow();
        });

        it("Should return null without event registered.", function ()
        {
            var result = eventService.createEvent(EventData_Test.s_type);

            expect(result).toBeNull();
        });

        it("Should return instance of event with event registered.", function ()
        {
            eventService.registerEvent(EventData_Test.s_type, EventData_Test);
            var result = eventService.createEvent(EventData_Test.s_type);
            expect(result).not.toBeNull();
            expect(result instanceof EventData_Test).toBeTruthy();
        });
    });

    describe("EventService.deserializeEvent method tests.", function ()
    {
        var eventService;
        var vDeserialize = EventData_Test.prototype.vDeserialize;

        beforeEach(function ()
        {
            eventService = new EventService();
            eventService.registerEvent(EventData_Test.s_type, EventData_Test);

            EventData_Test.prototype.vDeserialize = jasmine.createSpy("vDeserialize");
        });

        afterEach(function ()
        {
            EventData_Test.prototype.vDeserialize = vDeserialize;
        });

        it("Should not throw when calling for unknown event.", function ()
        {
            function callMethod()
            {
                eventService.deserializeEvent({ type: 0x00000001, data: {}});
            }

            expect(callMethod).not.toThrow();
        });

        it("Should not throw when calling for known event.", function ()
        {
            function callMethod()
            {
                eventService.deserializeEvent({ type: EventData_Test.s_type, data: {}});
            }

            expect(callMethod).not.toThrow();
        });

        it("Should return null when calling for unknown event.", function ()
        {
            var result = eventService.deserializeEvent({ type: 0x00000001, data: {}});

            expect(result).toBeNull();
        });

        it("Should return event object when calling for known event.", function ()
        {
            var result = eventService.deserializeEvent({ type: EventData_Test.s_type, data: {}});

            expect(result).not.toBeNull();
            expect(result instanceof EventData_Test).toBeTruthy();
        });

        it("Should call vDeserialize when calling for known event.", function ()
        {
            var dataObject = {};
            eventService.deserializeEvent({ type: EventData_Test.s_type, data: dataObject});

            expect(EventData_Test.prototype.vDeserialize).toHaveBeenCalledWith(dataObject);
        });
    });

    describe("EventService.registerEvent method tests.", function ()
    {
        var eventService;

        beforeEach(function ()
        {
            eventService = new EventService();
        });

        it("Should not throw when calling for the first time for one event.", function ()
        {
            function callMethod()
            {
                eventService.registerEvent(EventData_Test.s_type, EventData_Test);
            }

            expect(callMethod).not.toThrow();
        });

        it("Should not throw when calling for the second time for one event.", function ()
        {
            function callMethod()
            {
                eventService.registerEvent(EventData_Test.s_type, EventData_Test);
            }

            callMethod();
            expect(callMethod).not.toThrow();
        });

        it("Should add the event to constructors list.", function ()
        {
            eventService.registerEvent(EventData_Test.s_type, EventData_Test);
            expect(eventService.m_eventConstructors[EventData_Test.s_type]).toBe(EventData_Test);
        });
    });
});