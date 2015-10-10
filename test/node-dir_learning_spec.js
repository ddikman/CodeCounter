var Promise = require('promise');
var dirs = require('node-dir');

describe('when using node-dir', function(){

	it('can exclude directory names', function(done){

		// If this test fails it will run for a fair few seconds so to get us a proper
		// error message instead of a timeout we'll need this
		this.timeout(10000);

		new Promise(function(resolve, reject){

			var filesEnumerated = [];

			dirs.readFiles('./', { excludeDir: ['node_modules'] }, function(err, fileContent, next){

				if(err)
					reject(err);
				else
					next();

			}, function(err, fileNames){

				if(err)
				{
					reject(err);
					return;
				}

				var inExcludedFolder = fileNames.filter(function(f) { return f.indexOf('node_modules') >= 0; });
				if(inExcludedFolder.length > 0)
					reject("Files in folder not excluded: " + inExcludedFolder[0]);
				else
					resolve();

			})

		})
		.then(done, done);

	})


});