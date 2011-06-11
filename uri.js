// URI.js 4
// http://github.com/davesmith/
var URI = {};
URI.parse = function(uri, undefined) {
    var i,len,a,b,
    o = {protocol: undefined, domain: undefined, path: undefined, query: undefined, params: undefined, hash: ''};

    o.hash = uri.replace(/^\s+|\s+$/g, '').split('#');
    uri = o.hash.shift();    
    o.hash = o.hash.join('#') || undefined;
    
    o.query = uri.split('?');
    uri = o.query.shift();
    o.query = o.query.join('?') || undefined;
    if (o.query) {
        a = o.query.split('&');
        if (a[0] !== '') {
            o.params = {};
            len = a.length;
            for (i = 0; i < len; i++) {
                b = a[i].split('=');
                o.params[b.shift().replace(/^amp;/, '')] = (typeof b[0] === 'undefined') ? true: b.join('=');
             }
        }
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
    o.path = uri;
    
    return o;
};
