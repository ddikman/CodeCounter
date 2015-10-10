
var counter = {
};

counter.linesInString = function(str){
	return (str.match(/^.*\S/gm) || []).length;
}

module.exports = counter;