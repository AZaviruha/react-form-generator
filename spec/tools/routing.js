var r = require( '../../src/tools/routing' );

describe( 'tools/routing.js', function () {
    describe( 'buildRouter', function () {
        it( 'should throw exception, if called without arguments', function () {
            var f = function () { r.buildRouter(); };
            expect( f ).toThrow();
        });

        it( 'should throw exception, if called with odd number of arguments', function () {
            var f = function () { r.buildRouter( 1, 2, 3 ); };
            expect( f ).toThrow();
        });

        it( 'should return function', function () {
            expect( r.buildRouter( 1, 2 ) ).not.toThrow();
        });
        

        it( 'should call handlers for simple string route', function () {
            var handlers = {
                f1: function () {},
                f2: function () {},
                f3: function () {}
            };

            spyOn( handlers, 'f1');
            spyOn( handlers, 'f2');
            spyOn( handlers, 'f3');

            var route = r.buildRouter(
                'a',     [ handlers.f1 ],
                'a.b',   [ handlers.f2 ],
                'a.b.c', [ handlers.f3 ]
            );
            
            route( 'a' );
            expect( handlers.f1 ).toHaveBeenCalled();

            route( 'a.b' );
            expect( handlers.f2 ).toHaveBeenCalled();

            route( 'a.b.c' );
            expect( handlers.f3 ).toHaveBeenCalled();
        });
        

        it( 'should call handlers for regexp route', function () {
            var handlers = {
                f1: function () {},
                f2: function () {}
            };

            spyOn( handlers, 'f1');
            spyOn( handlers, 'f2');

            var route = r.buildRouter(
                /^field-(\d)+$/,              [ handlers.f1 ],
                /^group-(\d)+\|field-(\d)+$/, [ handlers.f2 ]
            );
            
            route( 'field-1' );
            expect( handlers.f1 ).toHaveBeenCalled();
            route( 'field-6' );
            expect( handlers.f1 ).toHaveBeenCalled();

            route( 'group-1|field-1' );
            expect( handlers.f2 ).toHaveBeenCalled();
        });
        

        it( 'should call handlers with specified arguments', function () {
            var handlers = {
                f1: function () {},
                f2: function () {}
            };

            spyOn( handlers, 'f1' );
            spyOn( handlers, 'f2' );

            var route = r.buildRouter(
                'a.b.c',                      [ handlers.f1 ],
                /^group-(\d)+\|field-(\d)+$/, [ handlers.f2 ]
            );
            
            route( 'a.b.c', 1, 2, 3 );
            expect( handlers.f1 ).toHaveBeenCalledWith( 1, 2, 3 );

            route( 'group-1|field-1', 3, 2, 1 );
            expect( handlers.f2 ).toHaveBeenCalledWith( 3, 2, 1 );
        });
        

        it( 'should call all handlers of matched route', function () {
            var handlers = {
                f1: function () {},
                f2: function () {},
                f3: function () {},
                f4: function () {}
            };

            spyOn( handlers, 'f1' );
            spyOn( handlers, 'f2' );
            spyOn( handlers, 'f3' );
            spyOn( handlers, 'f4' );

            var route = r.buildRouter(
                'a.b.c',                      [ handlers.f1, handlers.f2 ],
                /^group-(\d)+\|field-(\d)+$/, [ handlers.f3, handlers.f4 ]
            );
            
            route( 'a.b.c', 1, 2, 3 );
            expect( handlers.f1 ).toHaveBeenCalledWith( 1, 2, 3 );
            expect( handlers.f2 ).toHaveBeenCalledWith( 1, 2, 3 );

            route( 'group-1|field-1', 3, 2, 1 );
            expect( handlers.f3 ).toHaveBeenCalledWith( 3, 2, 1 );
            expect( handlers.f4 ).toHaveBeenCalledWith( 3, 2, 1 );
        });
    });
});
