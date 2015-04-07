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


    VALIDATORS[ 'or' ] = function ( conf, value, fieldMeta ) {
        var validators = conf.value;
        return reduce(function ( acc, v ) {
            var f = VALIDATORS[ v.rule ];
            return acc || f( v, value, fieldMeta );
        }, false, validators ); 
    };
    
    VALIDATORS[ 'and' ] = function ( conf, value, fieldMeta ) {
        var validators = conf.value;
        return reduce(function ( acc, v ) {
            var f = VALIDATORS[ v.rule ];
            return acc && f( v, value, fieldMeta );
        }, true, validators ); 
    };


    /**
     * Validates field's value against of validation rule.
     * Returs sublist of validateion rules that was not sutisfied 
     * by value.
     * @param {Object} ruleInfo - validation rules.
     * @param {Object} value - value to validate.
     * @param {Object} fieldMeta - for some validation rules 
     * field meta is required.
     * @return {Object}
     */
    function checkByRule ( ruleInfo, value, fieldMeta ) {
        var rule    = ruleInfo.rule
          , isValid = VALIDATORS[ rule ];
        return isValid( ruleInfo, value, fieldMeta ) ? null : ruleInfo;
    }


    /**
     * Validates field's value against list of validation rules.
     * Returs sublist of validation rules that was not sutisfied 
     * by value.
     * @param {Object[]} rules - list of validation rules.
     * @param {Object} value - value to validate.
     * @return {Object[]}
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
     * @return {Object} - { 
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
     * @return {Object} - { 
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
     * @return {Boolean}
     */
    function isFormValid ( formErrors ) {
        if ( !_.isPlainObject(formErrors) ) return true;
        var getNotNulls = _.compose( _.compact, _.values );
        return getNotNulls( formErrors ).length === 0;
    }


    return {
        validateField: validateField,
        validateForm:  validateForm,
        isFormValid:   isFormValid
    };
};
