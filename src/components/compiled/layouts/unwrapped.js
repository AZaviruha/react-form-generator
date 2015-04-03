module.exports = function ( React, tools ) {
    return React.createClass({
        render : function () {
            return this.props.children;
        }
    });
};
