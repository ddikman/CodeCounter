# CodeCounter
CodeCounter is a small application written to enable counting code in various projects.

The benefit of knowing how much code you've got may seem small but as all metrics it can provide an additional aspect in how you view your project.

For my sake, I meant to use it a gauge to compare relative project size. I had a gut feeling of some parts being larger than others and to that purpose I wanted to
graph the difference to provide insight about the actual facts.

# Usage
CodeCounter is meant to be installed globally and accessed as a command line tool.

``` shell
npm install git+https://github.com/ddikman/CodeCounter.git
codecounter -p C:\Code\CodeCounter\ -e node_modules -w *.js
```

# Arguments
For a full reference of the arguments to use, please refer to the help documentation:
``` shell
codecounter --help
```
