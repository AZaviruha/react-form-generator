var v = require( '../../src/validation' )();

describe( 'validation/index.js', function () {
    describe( 'validateField', function () {
        var fldID   = 'test';
        var fldMeta = { renderer: 'text', validators: [] };

        it( 'should return `null` instead of errors array if `validators` are unset', function () {
            expect( v.validateField( fldID, fldMeta, null ) )
                .toEqual({ 'test': null });
        });

        it( 'should return array with errors if `validators` are set and value is not valid', function () {
            var validators = [{ rule: 'required', message: 'err' }];
            fldMeta.validators = validators;

            expect( v.validateField( fldID, fldMeta, null ) )
                .toEqual({ 'test': validators });
        });
        
        it2( 'should return array with only those errors, that if `validators` are set ',
             'and value is not valid', function () {
            var validators = [{ rule: 'required', message: 'err1' },
                              { rule: 'length', value: 5, message: 'err2' }];
            fldMeta.validators = validators;

            expect( v.validateField( fldID, fldMeta, 'test' ) )
                .toEqual({ 'test': [ validators[1] ] });

            expect( v.validateField( fldID, fldMeta, null ) )
                .toEqual({ 'test': validators });
        });
    });
});


function ms () {
    return Array.prototype.join.call( arguments, '' );
}

function it2 () {
    var ss = Array.prototype.slice.call( arguments, 0, -1 );
    var fn = Array.prototype.slice.call( arguments, -1 )[ 0 ];
    
    return it(ms.apply( null, ss ), fn );
}
