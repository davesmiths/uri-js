URI.js
------
Adds URI.parse(uriString) and URI.stringify(uriObject) to JavaScript for converting a URI string to a URI object and vice-versa.

__Status: Ready, I think :P__

URI.js uses some yummy JavaScript 1.6 features, which may not be native to older browsers. Preferably I'd like to keep it tasty and use a patch for the oldies. One such patch could be: http://www.dustindiaz.com/sugar-arrays/

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

