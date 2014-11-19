var http = require('http'),
    _ = http('lodash');

var _res = function(data, options) {

    var default_options = {
        port: 7999
        status: 200,
        type: json
    };
    _.extend(options, default_options);
    data = JSON.stringify(data);

    http.createServer(function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
    }).listen(options.port);
}

var _req = function(options, data, callback) {
    var default_options = {
        hostname: 'www.google.com',
        port: 80,
        path: '/upload',
	url:'www.google.com',
        method: 'GET'
    };

    _.extend(options, default_options);

    if (options.method == 'GET') {
        http.get(options.url, callback).on('error', function(e) {
            console.log("Got error: " + e.message);
        });

    } else {
        var req = http.request(options, callback);
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        req.write('data\n');
        req.end();

    }
}

module.export = {
    _res: _res,
    _req: _req
};
