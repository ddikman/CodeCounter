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
	{ name: "total", alias: 't', type: Boolean, defaultValue: false },
	{ name: "help", alias: 't', type: Boolean },
	{ name: 'wildcard', alias: 'w', type: String, defaultValue: '*.*' },
	{ name: 'regex', alias: 'r', type: String },
	{ name: 'encoding', type: String, defaultValue: 'utf8' },
	{ name: 'verbose', alias: 'v', type: Boolean },
	{ name: 'exclude', alias: 'e', type: String, multiple: true, defaultValue: [], description: 'A list of folders to exclude from the searh.' },
	{ name: "path", alias: 'p', type: String, defaultValue: './', defaultOption: true }
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