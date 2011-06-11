// URI.js 1
// http://github.com/davesmith/
var URI = {};
URI.parse = function(uri, undefined) {
    var i,len,
    o = {params: {}, query: undefined, protocol: undefined, domain: undefined},
    a = uri.split('#'), // a = [''] or ['string'] or ['string', 'hashstring', ...]
    b = a.shift().split('?'); // a => [] or ['hashstring', ...]. b = [''] or ['string'] or ['string', 'querystring', ...]
    o.hash = a.join('#') || undefined; // hash = hashstring...#string... || false
    o.path = b.shift() || undefined; // path = string || false
    //a = o.path.split('//');
    //o.protocol = a[0] || false;
                                    
    a = b.join('?').split('&');
    if (a[0] !== '') {
        len = a.length;
        o.query = a[0];
        for (i = 0; i < len; i++) {
            b = a[i].split('=');
            o.params[b.shift().replace(/^amp;/, '')] = (typeof b[0] === 'undefined') ? true: b.join('=');
         }
    }
    return o;
};
