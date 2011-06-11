URI.js
------
Adds URI.parse(uriString) and URI.stringify(uriObject) to JavaScript for converting a URI string to a URI object and vice-versa.

__Status: Ready, I think :P__

URI.parse
---------

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

and URI.parse('path/to/file.html?marmite=lemoncurd#yum

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

URI.stringify
-------------

By example:

``` js
var o = {
    "hash": "yum",
    "path": "path/to/file.html"
}
var output = URI.stringify(o); // Gives "path/to/file.html#yum"
```


