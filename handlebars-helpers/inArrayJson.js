//
// {{#inArrayJson}} handlebars helper
// {{#inArrayJson [{"foo":"bar"}] "bar"}} //true
// {{#inArrayJson [{"foo":"bar"}] "foo"}} //true
// {{#inArrayJson [{"foo":"bar"}] "boo"}} //false

module.exports.register = function(Handlebars, options) {
    options = options || {};
    Handlebars.registerHelper('inArrayJson', function(arr, attr, options) {
        if (JSON.stringify(arr).indexOf(attr) > 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
};