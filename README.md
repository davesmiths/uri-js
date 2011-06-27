URI.js
------
Adds URI.parse and URI.stringify to JavaScript. Use URI.parse to parse a URI string and return a URI object. Use URI.stringify to unparse a URI object and return a URI string.

__Status: Ready, I think :P__

URI.js makes use of Array.map a yummy JavaScript 1.6 feature, which is not native in all browsers.
One way to patch this is with Mozilla's Array.map polyfill: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/map (the code in the Compatibility section)


__URI.parse__

By example: URI.parse('http://user:pass@www.example.com:8080/path/to/file.html?ice=cream&cheese=toast#hash') returns:

``` js
{
    "source": "http://user:pass@www.example.com:8080/path/to/file.html?ice=cream&cheese=toast#hash",
    "scheme": "http",
    "hash": "hash",
    "params": [
        {
            "key": "ice",
            "value": "cream"
        },
        {
            "key": "cheese",
            "value": "toast"
        }
    ],
    "user": "user",
    "pass": "pass",
    "host": "www.example.com",
    "port": "8080",
    "path": "/path/to/file.html"
}
```

and URI.parse('path/to/file.html?marmite=lemoncurd#yum returns

``` js
{
    "source": "path/to/file.html?marmite=lemoncurd#yum",
    "hash": "yum",
    "params": [
        {
            "key": "marmite",
            "value": "lemoncurd"
        }
    ],
    "path": "path/to/file.html"
}
```

__URI.stringify__

By example:

``` js
var o = {
    "hash": "yum",
    "path": "path/to/file.html"
}
var output = URI.stringify(o); // output = "path/to/file.html#yum"
```

__Detail__

URI.js defaults to the URI Generic Syntax that we're all familiar with, 
like http://blah.. or ../path/file.html etc. Schemes that are not
http, https or ftp are handled as follows, by example: mailto:frank.drebin@policesquad.com 
returns

``` js
{
    "source": "mailto:frank.drebin@policesquad.com",
    "scheme": "mailto",
    "path": "frank.drebin@policesquad.com"
}
```

