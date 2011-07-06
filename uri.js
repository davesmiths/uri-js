// URI.js  16
// Creates a URI object with functions URI.parse and URI.stringify
// http://github.com/davesmith/
// By Dave Smith: http://www.dave-smith.info/

// Use URI if it exists or create the URI object.
var URI = URI || {};

// Use URI.parse if it exists or create URI.parse.
URI.parse = URI.parse || function(uri, undefined) {
    
    // Create o, the object to return.
    var o = {readonly: {source: uri, params: []}, params: {}}, // Return the source URI.
        colon = ':', // Save a few chars by defining colon.
        slash = '/', // Save a few chars by defining slash.
        a = uri.indexOf(colon), // a = index of the first colon to help get the scheme. a is reused later as a temporary store.
        b = uri.indexOf(slash); // b = index of the first slash to help get the scheme.
    
    // Remove white space.
    uri = uri.replace(/^\s+|\s+$/g, '');
    
    // Get the scheme:
    // 1. Checks if there is a colon present.
    // 2. If present, checks if a slash is absent or if a slash is present whether the colon appears before the first slash.
    // 3. Split URI at colons.
    // 4. Scheme is string before the first colon.
    // 5. URI is string after the first colon.
    if (a !== -1 && (b === -1 || a < b)) {
        uri = uri.split(colon); // uri = [scheme, rest of URI, ...]
        o.scheme = uri.shift(); // scheme = scheme, uri = [rest of URI, ...]
        uri = uri.join(colon); // uri = rest of URI
    }
    
    if (o.scheme === undefined || 'http,https,ftp'.split(o.scheme, 2)[1]) {
        
        // Get the hash:
        // 1. Split URI at #s.
        // 2. URI is string before the first #.
        // 3. Hash is string after the first #.
        if (uri.indexOf('#') !== -1) {
            a = uri.split('#'); // a = [rest of URI, hash, ...]
            uri = a.shift(); // uri = [rest of URI], a = [hash, ...]
            o.hash = a.join('#') || '';
        }
        
        // Get the parameters:
        // 1. Split URI at ?s.
        // 2. URI is string before first ?.
        // 3. If there is a string after ?. Split at & and then = to map a params array.
        if (uri.indexOf('?') !== -1) {
            a = uri.split('?'); // a = [rest of URI, query, ...]
            uri = a.shift(); // uri = rest of URI, a = [query, ...]
            a = a.join('?').split('&');
            o.readonly.params = a.map(function(v, k) {
                v = v.split('=');
                k = v.shift().replace(/^amp;/, '');
                v = v.join('=');
                o.params[k] = v;
                return {key: k, value: v};
            });
        }
        
        // Check if URI is protocol relative.
        if (uri.substr(0, 2) === slash + slash) {
            
            // Remove the two slashes and split at slashes.
            uri = (uri.substr(2)).split(slash); // uri = [user:pass@www.asdad.com:8080, segment, ...]
            
            // Take the first item and split at @.
            a = uri.shift().split('@'); // a = [user:pass, www.asdad.com:8080], uri = [segment, ...]
            
            // Take the last item and split at colon.
            b = a.pop().split(colon); // b = [www.asdad.com, 8080], a = [user:pass]
            a = a.join('@').split(colon); // a = [user, pass]
            
            // Get User.
            o.user = a.shift() || undefined; // user = user, a = [pass]
            
            // Get Pass.
            o.pass = a.join(colon) || undefined; // pass = a = pass
            
            // Get Host.
            o.host = b.shift(); // host = www.asdad.com, b = [8080]
            
            // Get Port.
            o.port = b.join(colon) || undefined; // port = b = 8080
            
            // Make URI a string again.
            uri = slash + uri.join(slash); // uri = path
        }
    }
    
    // Get Path.
    o.path = uri || undefined;
    
    // Return Object.
    return o;
};

// Use URI.stringify if it exists or create URI.stringify.
URI.stringify = URI.stringify || function(o, undefined) {
    var uri = (o.scheme) ? o.scheme + ':' : '', params = '';
    if (o.host) {
        uri += '//';
    }
    if (o.user) {
        uri +=  o.user;
        if (o.pass) {
            uri += ':' + o.pass;
        }
        uri += '@';
    }
    uri += o.host || '';
    if (o.port) {
        uri += ':' + o.port;
    }
    uri += o.path || '';
    if (o.params) {
        for (var i in o.params) {
            if (o.params.hasOwnProperty(i)) {
                params += i + ((o.params[i]) ? '=' + o.params[i] : '') + '&';
            }
        }
        if (params) {
            uri += '?' + params.slice(0, -1);
        }
    }
    if (o.hash !== undefined) {
        uri += '#' + o.hash;
    }
    return uri;
};
