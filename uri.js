// URI.js 6
// http://github.com/davesmith/
var URI = {};
URI.parse = function(uri, undefined) {
    var i,len,a,b,
    o = {};

    o.hash = uri.replace(/^\s+|\s+$/g, '').split('#');
    uri = o.hash.shift();    
    o.hash = o.hash.join('#') || undefined;
        
    o.query = uri.split('?');
    uri = o.query.shift();
    if ((o.query = o.query.join('?') || undefined)) {
        o.params = o.query.split('&').map(function(v) {
            if (v !== '') {
                v = v.split('=');
                b = {}[v.shift().replace(/^amp;/, '')] = (typeof v[0] === 'undefined') ? true: v.join('=');
            }
            return b || false;
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
        uri = (uri.substr(2)).split('/');
        o.domain = uri.shift() || undefined;
        uri = '/' + uri.join('/');
    }
    o.path = uri || undefined;
    
    return o;
};
