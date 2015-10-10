var counter = require('../count.js');
var assert = require('assert');

describe('given the counter', function(){

	it('can count non empty lines in a multiline string', function(){
		var lines = counter.linesInString("line1\r\nline2\r\n\r\nline4");
		assert.equal(3, lines);
	});

});