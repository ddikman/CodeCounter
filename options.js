var commandLineArgs = require('command-line-args');
var fs = require('fs');

var validate = function(args)
{
	if(!fs.existsSync(args.path))
		opt.errors.push("Supplied path does not exist: " + args.path);
	else if(!fs.statSync(args.path).isDirectory())
		opt.errors.push("Supplied path is not a valid directory: " + args.path);
};

var commandLineArgDefinition = commandLineArgs([
	{ name: "total", alias: 't', type: Boolean, defaultValue: false, description: 'If set the total line count of all files is summed and output.' },
	{ name: "help", alias: 't', type: Boolean, description: 'Displays this help message.' },
	{ name: 'wildcard', alias: 'w', type: String, defaultValue: '*.*', description: 'Wildcard expression to match files to include in the count with (only if regex is not used)' },
	{ name: 'regex', alias: 'r', type: String, description: 'A regular expression to match all filenames with, successful matches will be counted.' },
	{ name: 'encoding', type: String, defaultValue: 'utf8', description: 'Encoding to use when reading files, defaults to utf8.' },
	{ name: 'verbose', alias: 'v', type: Boolean, description: 'If set, prints log messages and formatted output.' },
	{ name: 'exclude', alias: 'e', type: String, multiple: true, defaultValue: [], description: 'A list of folders to exclude from the search.' },
	{ name: "path", alias: 'p', type: String, defaultValue: './', defaultOption: true, description: 'Relative or absolute path to a directory to count files under (recursive).' }
]);

var usage = commandLineArgDefinition.getUsage({
	title: "CodeCounter",
	description: "Counts the number of lines in files specified by the given filters.",
	footer: "Project home: [underline]{https://github.com/ddikman/codecounter}"
});

var options = commandLineArgDefinition.parse();

options.usage = usage;
options.errors = [];

validate(options);

options.displayHelp = options.help || options.errors.length > 0;

module.exports = options;