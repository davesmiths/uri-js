// URI.js 2
// http://github.com/davesmith/
var URI = {};
URI.parse = function(uri, undefined) {
    var i,len,
    o = {params: {}, query: undefined, protocol: undefined, domain: undefined, hash: ''};
/*
    w = '';
    w2 = '#';
    w3 = 'a#';
    w4 = '#a';
    w5 = 'a#a';
    w6 = 'azxczxczxc';
    html = '';
    html += w.split('#') + "\n";
    html += w2.split('#') + "\n";
    html += w3.split('#') + "\n";
    html += w4.split('#') + "\n";
    html += w5.split('#') + "\n";
    html += w6.split('#') + "\n";
    $('body').append('<pre>'+html+'</pre>');
  */  
// Array.split examples
// '' => [''];
// '#' => ['','']
// 'a#' => ['a','']
// '#b'  => ['','b']
// 'a#b' => ['a','b']

    o.hash = uri.replace(/^\s+|\s+$/g, '').split('#');
    uri = o.hash.shift();    
    o.hash = o.hash.join('#') || undefined;
    
    o.query = uri.split('?');
    uri = o.query.shift();
    o.query = o.query.join('?') || undefined;
    
    if (!(!uri || uri.charAt(0) === '.' || (uri.charAt(0) === '/' && uri.charAt(1) !== '/'))) {
        // path//, /path//, //www.esas.com/path// http://asdasd.com//
        if (uri.charAt(0) === '/' && uri.charAt(1) === '/') { // Protocol relative
            uri = uri.split('//')[1];
            uri = uri.split('/');
            o.domain = uri.shift();
            uri = uri.join('/');
        }
        else {// path//, /path//, http://asdasd.com//
            uri = uri.split('://');
            o.protocol = uri.shift();
            uri = uri.join('://');
            
            uri = uri.split('/');
            o.domain = uri.shift();
            uri = uri.join('/');
        }
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
