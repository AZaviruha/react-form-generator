/** @jsx React.DOM */
// For PhantomJS. 
// See https://github.com/facebook/react/pull/347#issuecomment-24625365
require( 'es5-shim' );

var React      = require( 'react/addons' )
  , TestUtils  = React.addons.TestUtils
  , byTag      = TestUtils.findRenderedDOMComponentWithTag 
  , byTagAll   = TestUtils.scryRenderedDOMComponentsWithTag
  , byClass    = TestUtils.findRenderedDOMComponentWithClass 
  , byClassAll = TestUtils.scryRenderedDOMComponentsWithClass 
  , Simulate   = TestUtils.Simulate
  , tools      = require( '../../../src/tools/' );


function generateComponent ( Component, newConfig ) {
    var defaultConfig = {
        fieldID: 'testID',
        meta: {},
        css: '',
        value: null,
        errors: null,
        onChange: function () {},
        onEvent: function () {}
    };

    var config = tools.merge( defaultConfig, newConfig );

    return TestUtils.renderIntoDocument(
        <Component config={config} />
    );
}


module.exports = tools.merge({
    React       : React,
    findDOMNode : React.findDOMNode,
    byTag       : byTag,
    byTagAll    : byTagAll,
    byClass     : byClass,
    byClassAll  : byClassAll,
    Simulate    : Simulate,
    generateComponent : generateComponent
}, tools );
