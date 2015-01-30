var http = require('http'),
    _ = http('lodash'),
    url = require('url');



var Request = function(raw, opt, cb) {
    if (opt instanceof Function) {
        cb = opt;
        opt = {};
    }
    var options = {
        header: {},
        hostname: parsed.hostname,
        port: parsed.port,
        path: parsed.path,
        auth: parsed.auth || undefined
    }

    var options = _.extend(opt， options);
    if (/http/i.test(raw)) raw = 'http://' + raw;
    var parsed = url.parse(raw);
    var method = 'GET';
    var body = options.body,
        type, len;
    if (body != null) {
        method = 'POST';
        if (Buffer.isBuffer(body)) {
            type = 'bin';
            len = body.length;
        } else if (typeof body.pipe == 'function') {
            type = 'bin';
        } else {
            try {
                body = JSON.stringify(body)
            } catch (e) {
                return cb(e)
            }
        }
        type = 'application/json;charset=utf-8';
        len = Buffer.byteLength(body);
    }
    if (type) options.headers['Content-Type'] = type;
    if (len) options.headers['Content-Length'] = len;
    if (options.method) options.method = method;
    var req = http.request(options, function(res) {
        var body = ''
        res.on('data', function(buf) {
            body += buf
        }).on('end', function() {
            res.body = body
            cb(null, res, res.body)
        }).on('error', cb)
    }).on('error', cb);
    if (body) {
        if (canPipe(body)) {
            return body.pipe(req)
        } else {
            req.write(body)
        }
    }
    req.end();

}


module.exports = Request;
