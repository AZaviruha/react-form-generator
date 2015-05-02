var v = require( '../../src/validation' )();

describe( 'validation/index.js', function () {
    describe( 'validateField', function () {
        var fldID   = 'test';
        var fldMeta = { renderer: 'text', validators: [] };

        it( 'should return `null` instead of errors array if `validators` are unset', function () {
            expect( v.validateField( fldID, fldMeta, null ) )
                .toEqual({ 'test': null });
        });

        it( 'should return error array if `validators` are set and value is not valid', function () {
            var validators = [{ rule: 'required', message: 'err' }];
            fldMeta.validators = validators;
            expect( v.validateField( fldID, fldMeta, null ) )
                .toEqual({ 'test': validators });
        });
    });
});
