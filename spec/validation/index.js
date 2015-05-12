var v = require( '../../src/validation' )();

describe( 'validation/index.js', function () {
    describe( 'validateField', function () {
        var fldID   = 'test';
        var fldMeta = { renderer: 'text', validators: [] };

        it2( 'should return `null` instead of errors array if ',
            '`validators` are unset', function () {
            expect( v.validateField( fldID, fldMeta, null ) )
                .toEqual({ 'test': null });
        });

        it2( 'should return array with errors if `validators` ', 
             'are set and value is not valid', function () {
            var validators = [{ rule: 'required', message: 'err' }];
            fldMeta.validators = validators;

            expect( v.validateField( fldID, fldMeta, null ) )
                .toEqual({ 'test': validators });
        });
        
        it2( 'should return array with errors only ',
             'from failed validators', function () {
            var validators = [{ rule: 'required', message: 'err1' },
                              { rule: 'length', value: 5, message: 'err2' }];
            fldMeta.validators = validators;

            expect( v.validateField( fldID, fldMeta, 'test' ) )
                .toEqual({ 'test': [ validators[1] ] });

            expect( v.validateField( fldID, fldMeta, null ) )
                .toEqual({ 'test': validators });
        });
    });
    
    
    describe( 'validateForm', function () {
        var formMeta = {
            fields: { 
                field1: { renderer: 'text', validators: [] }
            }
        };

        var fldMeta = formMeta.fields.field1;


        it2( 'should return `null` instead of errors array if ',
            '`validators` are unset', function () {
            expect( v.validateForm( formMeta, null ) )
                .toEqual({ 'field1': null });

            expect( v.validateForm( formMeta, { field1: '42' } ) )
                .toEqual({ 'field1': null });
        });

        it2( 'should return array with errors if `validators` ', 
             'are set and value is not valid', function () {
            var validators = [{ rule: 'required', message: 'err' }];
            fldMeta.validators = validators;

            expect( v.validateForm( formMeta, null ) )
                .toEqual({ 'field1': validators });
        });
        
        it2( 'should return array with errors only ',
             'from failed validators', function () {
            var validators = [{ rule: 'required', message: 'err1' },
                              { rule: 'length', value: 5, message: 'err2' }];
            fldMeta.validators = validators;

            expect( v.validateForm( formMeta, { field1: '42' } ) )
                .toEqual({ 'field1': [ validators[1] ] });

            expect( v.validateForm( formMeta, { field1: null } ) )
                .toEqual({ 'field1': validators });
        });
    });
    

    
    describe( 'isFormValid', function () {
        it( 'should return `true` if array of errors is null', function () {
            expect( v.isFormValid(null) ).toEqual( true );
        });
        
        it( 'should return `true` if array of errors is empty', function () {
            expect( v.isFormValid({}) ).toEqual( true );
        });

        it2( 'should return `true` if array of errors ', 
             'contains only empty keys', function () {
            expect( v.isFormValid({ test: [] }) ).toEqual( true );
        });

        it2( 'should return `false` if array of errors ', 
             'contains non-empty keys', function () {
            expect( v.isFormValid({ test: [1] }) ).toEqual( false );
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
