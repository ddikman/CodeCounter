var dir = require('../directories.js');

describe('with directories', function(){

	it('can exclude given directories', function(done){

		dir.readFiles("./", { excludeDir: ['node_modules'] })
			.then(function(files){
				
				var inModulesFolder = files.filter(function(f) { return f.name.indexOf('node_modules') >= 0 });
				if(inModulesFolder.length > 0)
					throw "Got folders which should've been excluded: " + inModulesFolder[0].name;

				done();
			}, done);
	
	})

});