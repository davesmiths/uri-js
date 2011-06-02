banana_split = function(uri) {
    var b,i,len,
    o = {params: {}, query: false},
    a = uri.split('#');
    b = a.shift().split('?');
    o.hash = a.join('#') || false;
    o.path = b.shift() || false;
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
