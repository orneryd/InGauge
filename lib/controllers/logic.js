
exports.resultsByStudent = function(resultsArray){
    var students = {};
    if (!resultsArray ) {
        return students;
    }
    resultsArray.results.forEach(function(item){
        if (!students[item.student]) {
            students[item.student] = [];
        }
        students[item.student].push(item);
    });
    return students;
};