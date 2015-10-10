var dir = require('node-dir');
var fs = require('fs');
var log = require('npmlog');
var logTag = "directories.js";

var directories = {};

 directories.exists = function(path){
	return fs.existsSync(path);
}

 directories.isFolder = function(path){
	return this.exists(path) && fs.statSync(path).isDirectory();
};

 directories.readFiles = function(folder, options){

	log.verbose(logTag, "Reading files in %s", folder);
	if(!options)
		options = {};
	else
		log.verbose(logTag, "Using options: %j", options);

	if(!this.isFolder(folder))
			throw "Argument is not a folder: " + folder;

	return new Promise(function(resolve, reject){

		var files = [];
		dir.readFiles(folder, options, function handleFiles(err, content, next){
			
			if(err)
				throw err;

			files.push(content);
			next();

		}, function addFileNames(err, filenames){

			if(err)
				reject(err);

			log.verbose(logTag, "Found %s files in %s", files.length, folder);

			for(var i = 0; i < files.length; ++i)
				files[i] = { name: filenames[i], contents: files[i] };

			resolve(files);

		});

	}.bind(this));

};

directories.readFolders = function(folder, options){

	if(!options)
		options = {};

	return new Promise(function(resolve, reject){

		dir.subdirs(folder, options, function(err, folders){
			if(err)
				reject(err);
			else
				resolve(folders)
		});

	});

};

module.exports = directories;