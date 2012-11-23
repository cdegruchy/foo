function accumulator(initialValue, specifiedLimit) {
    this.value = initialValue;
    this.limit = specifiedLimit;
    this.add = function (valueToAdd) {
        this.value = this.value + valueToAdd;
    };
    this.atLimit = function () {
        return this.value > this.limit;
    };
};

accumulator.prototype.test = function () {
    return 'it is tested';
};

accumulator.prototype.__defineGetter__("val", function () { return this.value / 2; });
 
exports.accumulatorX = accumulator;
