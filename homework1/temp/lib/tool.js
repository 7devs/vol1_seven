module.exports = {
    match: function(arr, func) {
        var result = [];
        for (var i = 0, l = arr.length; i < l; i++) {
            if (func(arr[i])) {
                result.push(arr[i]);
            }
        }
        return result;
    }
}
