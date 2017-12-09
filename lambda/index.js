/* const exec = require('child_process').exec;

exports.handler = function(event, context) {
    const child = exec('./ruby_wrapper ' + "'" +  JSON.stringify(event) + "'", (result) => {
        // Resolve with result of process
        context.done(result);
    });

    // Log process stdout and stderr
    child.stdout.on('data', console.log);
    child.stderr.on('data', console.error);
}
  */


var spawn = require('child_process').spawn;

var invokeRubyApp = "./ruby_wrapper";

exports.handler = function(event, context, callback) {
    console.log("Starting process: " + invokeRubyApp);
    var child = spawn(invokeRubyApp, [JSON.stringify(event, null, 2), JSON.stringify(context, null, 2)]);

    child.stdout.on('data', function (data) { console.log("stdout:\n"+data);callback(null, data); });
    child.stderr.on('data', function (data) { console.log("stderr:\n"+data); });

    child.on('close', function (code) {
        if(code === 0) {
            //context.succeed("Process completed: " + invokeRubyApp);
        } else {
            context.fail("Process \"" + invokeRubyApp + "\" exited with code: " + code);
        }
    });
}


