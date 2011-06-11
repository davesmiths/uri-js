// URI.js 3
// http://github.com/davesmith/
var URI = {};
URI.parse = function(uri, undefined) {
    var i,len,
    o = {protocol: undefined, domain: undefined, path: undefined, query: undefined, params: {}, hash: ''};

    o.hash = uri.replace(/^\s+|\s+$/g, '').split('#');
    uri = o.hash.shift();    
    o.hash = o.hash.join('#') || undefined;
    
    o.query = uri.split('?');
    uri = o.query.shift();
    o.query = o.query.join('?') || undefined;
    
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
    /*
    // b => ['query', ...]
    // c => '' or 'string'
    // c = ['']
    //     ['protocol']
    //     ['', 'domainpath']
    //     ['protocol', 'domainpath', ...]
    
    o.protocol = c.shift();
    d = c.join('://').split('/');
    // c => [] or ['protocol']
    // d => '' or 'path'
    // d = ['']
    //     ['path']
    //     ['']
    //     ['domain', 'path', ...]
    
    o.domain = d.shift();
    o.path = d.join('/') || undefined;
    // o.path = string || false, b => undefined or string
    //a = o.path.split('//');
    
    a = b.join('?').split('&');
    if (a[0] !== '') {
        len = a.length;
        //o.query = a[0];
        for (i = 0; i < len; i++) {
            b = a[i].split('=');
            o.params[b.shift().replace(/^amp;/, '')] = (typeof b[0] === 'undefined') ? true: b.join('=');
         }
    }
    */
    return o;
};
