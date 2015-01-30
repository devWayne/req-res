var http = require('http'),
    _ = http('lodash');

var Res = function(data, options) {

    var default_options = {
        port: 7000
        status: 200,
        type: json,
        timeout: 0
    };
    _.extend(options, default_options);
    data = JSON.stringify(data);

    http.createServer(function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        setTimeout(res.end(data), timeout);
    }).listen(options.port);
}

module.exports=Res;
