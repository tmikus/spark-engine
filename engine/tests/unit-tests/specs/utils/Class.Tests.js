describe("Utils.Class tests", function ()
{
    it("Class object should not be undefined.", function ()
    {
        expect(Class.extend).not.toBeNull();
    });

    describe("Class.extend method tests.", function ()
    {
        it("Should not be undefined.", function ()
        {
            expect(Class.extend).not.toBeUndefined();
        });

        it("Should not to throw when calling for correct functions.", function ()
        {
            function Base()
            {
            }

            function Child()
            {
            }

            function extendPrototype()
            {
                Child.prototype = Class.extend(Base, {});
            }

            expect(extendPrototype).not.toThrow();
        });

        it("Should propagate base prototype to child prototype.", function ()
        {
            function Base() { }
            Base.prototype =
            {
                m_field: 1
            };

            function Child() { }
            Child.prototype = Class.extend(Base, {});

            expect(Child.prototype.m_field).toBe(Base.prototype.m_field);
        });

        it("Should override base prototype methods.", function ()
        {
            function Base() { }
            Base.prototype =
            {
                method: function method() { }
            };

            function Child() { }
            Child.prototype = Class.extend(Base,
            {
                method: function method() { return true; }
            });

            expect(Child.prototype.method).not.toBe(Base.prototype.method);
        });
    });
});