var g = require( './general' );

/**
 * Calculates form's (default) value by it's meta.
 * @param {Object} formMeta - metadata in FormGenerator format.
 * @return {Object} - {
 *    %fieldID%: %fieldValue%,
 *    ...
 * }
 */
function evalDefaults ( formMeta ) {
    var fields = g.getOrDefault( formMeta, 'fields', {} );
    
    return g.reduce(function ( acc, fldMeta, fldID ) {
        acc[ fldID ] = g.getOrNull( fldMeta, 'defaultValue' );
        return acc;
    }, {}, fields );
}



module.exports = {
    evalDefaults: evalDefaults
};
