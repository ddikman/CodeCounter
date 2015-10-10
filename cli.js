var Wildcard = require('./wildcard');
var dirs = require('./directories');
var options = require("./options")
var log = require('npmlog');
var counter = require('./count.js');
var logTag = "counter.js";

if(options.displayHelp){
	
	console.log(options.usage);
	options.errors.forEach(function(err){ 
		console.log(warning); 
	});
	process.exit(1);
}

var searchOptions = {
	encoding: arguments.encoding
};

if(options.regex)
	searchOptions.match = options.regex;
else if(options.wildcard)
	searchOptions.match = new Wildcard(options.wildcard).toRegex();

if(options.exclude)
	searchOptions.excludeDir = options.exclude;

if(options.verbose)
	log.level = 'verbose';
else
	log.level = 'info';

log.verbose(logTag, "Working in folder: %s", options.path);
log.verbose(logTag, "Matching files and folders with: %j", searchOptions);

var countLinesOfFilesInFolder = function(folder, options) {

	return new Promise(function(resolve, reject){

		dirs.readFiles(folder, options)
			.then(function(files){

				try{

					log.verbose(logTag, "Found a total of %s files in %s", files.length, folder);
					var result = {
						files: [],
						totalLines: 0
					};
					files.forEach(function(file){
						var linesInFile = counter.linesInString(file.contents);
						result.files.push({ path: file.name, lines: linesInFile });
						result.totalLines += linesInFile;
						log.verbose(logTag, 'Lines in %s: %s', file.name, linesInFile);
					}.bind(this));

					resolve(result);
				}
				catch(e)
				{
					reject(e);
				}

			}.bind(this), reject);
	}.bind(this));

};

countLinesOfFilesInFolder(options.path, searchOptions)
	.then(function(result){
		log.info(logTag, "Total lines: %s", result.totalLines);
		console.log(JSON.stringify(result, null, 2));
		process.exit(0);
	}, function(err){
		if(err.stack)
			console.log(err.stack);
		else
			console.log(err);

		process.exit(1);
	});
