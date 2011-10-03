URI.js
------
__URI.js is a JavaScript URI parser. It has two functions URI.parse and URI.stringify__

Use URI.parse to parse a URI string and return a URI object. Use URI.stringify to unparse a URI object and return a URI string.

1 KB minified, 607 bytes gzipped.

__Status: Ready__

URI.js makes use of Array.map a JavaScript 1.6 feature, which is not native in all browsers.
One way to patch this is with Mozilla's Array.map polyfill: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/map (the code in the Compatibility section)


__URI.parse__

By example: URI.parse('http://user:pass@www.example.com:8080/path/to/file.html?ice=beam&cheese=toast&ice=cream#hash') returns:

``` js
{
    "readonly" {
        "source": "http://user:pass@www.example.com:8080/path/to/file.html?ice=beam&cheese=toast&ice=cream#hash",
        "params": [
            {
                "key": "ice",
                "value": "beam"
            },
            {
                "key": "cheese",
                "value": "toast"
            },
            {
                "key": "ice",
                "value": "cream"
            }
        ]
    },
    "scheme": "http",
    "hash": "hash",
    "params": {
        "ice": "cream",
        "cheese": "toast"
    },
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
    "readonly" {
        "source": "path/to/file.html?marmite=lemoncurd#yum",
        "params": [
            {
                "key": "marmite",
                "value": "lemoncurd"
            }
        ]
    },
    "params": {
        "marmite": "lemoncurd"
    },
    "hash": "yum",
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
    "readonly" {
        "source": "mailto:frank.drebin@policesquad.com"
    },
    "scheme": "mailto",
    "path": "frank.drebin@policesquad.com"
}
```

