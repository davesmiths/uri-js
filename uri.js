// URI.js 10
// http://github.com/davesmith/
var URI = {};
URI.parse = function(uri, undefined) {
    var i, o = {source: uri};

    o.hash = uri.replace(/^\s+|\s+$/g, '').split('#');
    uri = o.hash.shift();
    o.hash = o.hash.join('#') || undefined;
        
    o.query = uri.split('?');
    uri = o.query.shift();
    if ((o.query = o.query.join('?') || undefined)) {
        o.params = o.query.split('&').map(function(v) {
            v = v.split('=');
            return {key: v.shift().replace(/^amp;/, ''), value: v.join('=')};
        });
    }
    
    // path//, /path//, //www.esas.com/path// http://asdasd.com//
    uri = uri.split('://');
    if (uri.length > 1) {
        o.protocol = uri.shift() || undefined;
        uri = '//' + uri.join('://');
    }
    else {
        uri = uri.join('://');
    }
    // path//, /path//,  //asdasd.com//path
    if (uri.charAt(0) === '/' && uri.charAt(1) === '/') { // Protocol relative
        uri = (uri.substr(2)).split('/'); // uri = [asdad.com, path]
        o.password = uri.shift().split('@'); //o.pass = [user:pass, www.asdad.com:8080]
        
        o.port = o.password.pop().split(':');
        o.password = o.password.join('@').split(':');
        
        o.user = o.password.shift() || undefined;
        o.password = o.password.join(':') || undefined;
        
        o.domain = o.port.shift();
        o.port = o.port.join(':') || undefined;
        
        uri = '/' + uri.join('/');
    }
    o.path = uri || undefined;
    return o;
};

URI.stringify = function(o) {
    var uri = (o.protocol) ? o.protocol + ':' : '';
    uri += (o.domain) ? '//' : '';
    uri += (o.user) ? (o.user || '') + ((o.password) ? ':' + o.password : '') + '@' : '';
    uri += o.domain || '';
    uri += (o.port) ? ':' + o.port : '';
    uri += o.path || '';
    uri += (o.query) ? '?' + o.params.map(function(v) {
        return (v.key) ? v.key + ((v.value) ? '=' + v.value : '') : '';
    }).join('&') : '';
    uri += (o.hash) ? '#' + o.hash : '';
    return uri;
};
