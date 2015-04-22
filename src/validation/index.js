var t          = require( '../tools' )
  , reduce     = t.reduce
  , getOrNull  = t.getOrNull;



/**
 * Provides validation for GeneratedForm.
 * Can be configured by `conf` arguments:
 * @param {Object} conf - settings of validation. 
 * @param {Object[]} conf.validators - array of custom validators.
 */
module.exports = function ( conf ) {
    conf = conf || {};
    var VALIDATORS = t.merge( require( './validators' ), 
                              conf.validators );


    VALIDATORS.or  = composite( t.or, false );
    VALIDATORS.and = composite( t.and, true );
    
    /**
     * Build composite validator, which 
     * combines result of all nested validators 
     * by `comb` function.
     *
     * @param {Function} comp - `and`, `or`, etc.
     * @param {Object} zero - intital value of composite
     *                        validator result. 
     * @returns {Function)
     */
    function composite ( comb, zero ) {
        return function ( conf, value, fieldMeta ) {
            var validators = conf.value;
            return reduce(function ( acc, v ) {
                var f = VALIDATORS[ v.rule ];
                checkRuleExistence( f, v.rule );
                return comb( acc, f( v, value, fieldMeta ) );
            }, zero, validators ); 
        };
    }


    /**
     * Validates field's value against of validation rule.
     * Returs sublist of validateion rules that was not sutisfied 
     * by value.
     * @param {Object} ruleInfo - validation rules.
     * @param {Object} value - value to validate.
     * @param {Object} fieldMeta - for some validation rules 
     * field meta is required.
     * @returns {Object}
     */
    function checkByRule ( ruleInfo, value, fieldMeta ) {
        var rule    = ruleInfo.rule
          , isValid = VALIDATORS[ rule ];

        checkRuleExistence( isValid, rule );
        return isValid( ruleInfo, value, fieldMeta ) ? null : ruleInfo;
    }

    
    function checkRuleExistence ( validate, rule ) {
        if ( !validate ) 
            throw new Error( 'Valdiation rule does not exist: ' + rule );
    }

    /**
     * Validates field's value against list of validation rules.
     * Returs sublist of validation rules that was not sutisfied 
     * by value.
     * @param {Object[]} rules - list of validation rules.
     * @param {Object} value - value to validate.
     * @returns {Object[]}
     */
    function checkByAll ( rules, value, fieldMeta ) {
        return (rules || [])
            .map(function ( rule ) { 
                return checkByRule( rule, value, fieldMeta );
            })
            .filter(function ( el ) { return null !== el; });
    }


    /**
     * Calculates field's validity by it's meta and value.
     * @param {Object} fieldMeta - metadata of one field 
     * in FormGenerator format.
     * @param {Object} value - { %fieldID%: %fieldValue% }
     * @return {Object[]} - [ %failed_validators% ]
     */
    function validateField ( fldID, fieldMeta, value ) {
        var res  = {}
          , errs = checkByAll( fieldMeta.validators, value, fieldMeta );
        res[ fldID ] = errs.length ? errs : null;
        return res;
    }
    

    /**
     * Calculates validity of the array of fields.
     * @param {Object[]} fldsMeta - array of metadata.
     * @param {Object[]} fldsValue - map with fields value.
     * @returns {Object} - { 
     *     %fieldID%: [ %failed_validators% ],
     *     ...
     * }
     */
    function validateFields ( fldsMeta, fldsValue ) {
        return reduce(function ( acc, fldMeta, fldID ) {
            var value  = getOrNull( fldsValue, fldID )
              , errors = validateField( fldID, fldMeta, value );
            return t.merge( acc, errors );
        }, {}, fldsMeta );
    }

    
    /**
     * Calculates form's validity by it's meta and value.
     * Wraps `validateFields` and filters array of fields
     * before validation.
     * @param {Object} formMeta - metadata in GeneratedForm format.
     * @param {Object} formValue - data in GeneratedForm format.
     * @returns {Object} - { 
     *     %fieldID%: [ %failed_validators% ],
     *     ...
     * }
     */
    function validateForm ( formMeta, formValue ) {
        var fields    = getOrNull( formMeta, 'fields' )
          , validable = reduce(function ( acc, fld, fldID ) {
                var noValidate = !t.isDefined( fld.validators ) 
                                 || fld.isHidden
                                 || fld.isReadOnly

                  , fldMeta  = {};

                if ( noValidate ) return acc;
                else {
                    fldMeta[ fldID ] = fld;
                    return t.merge( acc, fldMeta );
                }
            }, {}, fields );

        return validateFields( validable, formValue );
    }

    
    /**
     * Accepts result of `validateForm` and returns true
     * if `formErrors` contains only null-values.
     * @param {Object} formErrors - { 
     *     %fieldID%: [ %failed_validators% ],
     *     ...
     * }
     * @returns {Boolean}
     */
    function isFormValid ( formErrors ) {
        return t.reduce(function ( acc, v, k ) {
            return acc && !(v && v.length);
        }, true, formErrors );
    }


    return {
        validateField: validateField,
        validateForm:  validateForm,
        isFormValid:   isFormValid
    };
};
