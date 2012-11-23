//-----------------------------------------
// base
//-----------------------------------------
function base() {
    var name = "base";
};
base.prototype.doWork = function () {
    return "base Work";
};

exports.base = base;

//-----------------------------------------
// derived
//-----------------------------------------
function derived() {
    base.call(this);

    var name = "derived";
};
derived.prototype = base;
derived.prototype.constructor = derived;

exports.derived = derived;