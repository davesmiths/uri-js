// URI.js  18
// Creates a URI object with functions URI.parse and URI.stringify
// http://github.com/davesmith/

// URL-spaced to prevent conflits with other code.
window['github.com/davesmith/uri-js'] = {

    // Use URI.parse if it exists or create URI.parse.
    parse: function(uri, undefined) {

        // Create o, the object to return.
        var source = uri,
            readOnlyParams = [],
            params = {},
            hash,
            scheme,
            user,
            pass,
            host,
            port,
            path,
            colon = ':', // Save a few chars by defining colon.
            slash = '/', // Save a few chars by defining slash.
            indexOf = 'indexOf', // Saves a few chars when minifying yet the code remains readable.
            split = 'split',
            shift = 'shift',
            join = 'join',
            a = uri[indexOf](colon), // a = index of the first colon to help get the scheme. a is reused later as a temporary store.
            b = uri[indexOf](slash), // b = index of the first slash to help get the scheme.
            c = uri[indexOf]('?'), // c = index of the first question mark to help get the scheme.
            d = uri[indexOf]('#'); // d = index of the first hash mark.

        // Remove white space.
        uri = uri.replace(/^\s+|\s+$/g, '');

        // Get the scheme:
        // 1. Checks if there is a colon present.
        // 2. If present, checks if a slash is absent or if a slash is present whether the colon appears before the first slash.
        // 3. and checks if a question mark is absent or if a question mark is present whether the colon appears before the first question mark.
        // 3. Split URI at colons.
        // 4. Scheme is string before the first colon.
        // 5. URI is string after the first colon.
        if (a !== -1 && (b === -1 || a < b) && (c === -1 || a < c)) {
            uri = uri[split](colon); // uri = [scheme, rest of URI, ...]
            scheme = uri[shift](); // scheme = scheme, uri = [rest of URI, ...]
            uri = uri[join](colon); // uri = rest of URI
        }

        if (scheme === undefined || 'http,https,ftp'[split](scheme, 2)[1]) {

            // Get the hash:
            // 1. Split URI at #s.
            // 2. URI is string before the first #.
            // 3. Hash is string after the first #.
            if (d !== -1) {
                a = uri[split]('#'); // a = [rest of URI, hash, ...]
                uri = a[shift](); // uri = [rest of URI], a = [hash, ...]
                hash = a[join]('#') || '';
            }

            // Get the parameters:
            // 1. Split URI at ?s and only if before the first hash if there is one.
            // 2. URI is string before first ?.
            // 3. If there is a string after ?. Split at & and then = to map a params array.
            if (c !== -1 && (d === -1 || c < d)) {
                a = uri[split]('?'); // a = [rest of URI, query, ...]
                uri = a[shift](); // uri = rest of URI, a = [query, ...]
                a = a[join]('?')[split]('&');
                readOnlyParams = a.map(function(v, k) {
                    v = v[split]('=');
                    k = v[shift]().replace(/^amp;/, '');
                    v = v[join]('=');
                    params[k] = v;
                    return {key: k, value: v};
                });
            }

            // Check if URI is protocol relative.
            if (uri.substr(0, 2) === slash + slash) {

                // Remove the two slashes and split at slashes.
                uri = (uri.substr(2))[split](slash); // uri = [user:pass@www.asdad.com:8080, segment, ...]

                // Take the first item and split at @.
                a = uri[shift]()[split]('@'); // a = [user:pass, www.asdad.com:8080], uri = [segment, ...]

                // Take the last item and split at colon.
                b = a.pop()[split](colon); // b = [www.asdad.com, 8080], a = [user:pass]
                a = a[join]('@')[split](colon); // a = [user, pass]

                // Get User.
                user = a[shift]() || undefined; // user = user, a = [pass]

                // Get Pass.
                pass = a[join](colon) || undefined; // pass = a = pass

                // Get Host.
                host = b[shift](); // host = www.asdad.com, b = [8080]

                // Get Port.
                port = b[join](colon) || undefined; // port = b = 8080

                // Make URI a string again.
                uri = slash + uri[join](slash); // uri = path
            }
        }

        // Get Path.
        path = uri || undefined;

        // Return Object.
        return {readonly: {source: source, params: readOnlyParams}, params: params, hash: hash, scheme: scheme, user: user, pass: pass, host: host, port: port, path: path};
    },

    // Use URI.stringify if it exists or create URI.stringify.
    stringify: function(o, undefined) {
        var scheme = o.scheme,
            paramsB = '',
            params = o.params,
            host = o.host,
            user = o.user,
            pass = o.pass,
            port = o.port,
            hash = o.hash,
            uri = (scheme) ? scheme + ':' : '',
            i;
        if (host) {
            uri += '//';
        }
        if (user) {
            uri +=  user;
            if (pass) {
                uri += ':' + pass;
            }
            uri += '@';
        }
        uri += host || '';
        if (port) {
            uri += ':' + port;
        }
        uri += o.path || '';
        if (params) {
            for (i in params) {
                if (params.hasOwnProperty(i)) {
                    paramsB += i + ((params[i]) ? '=' + params[i] : '') + '&';
                }
            }
            if (paramsB) {
                uri += '?' + paramsB.slice(0, -1);
            }
        }
        if (hash !== undefined) {
            uri += '#' + hash;
        }
        return uri;
    }
};
