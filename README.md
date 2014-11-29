uri.js
===
__A URI/URL parser with two functions parse and stringify__

Demo
---
http://www.dave-smith.info/GitHub/uri-js/demo/

uri.parse
---

__Parses a string and returns a object__

``` js
uriJS = window['github.com/davesmiths/uri-js'],

output = uriJS.parse('http://user:pass@www.example.com:8080/path/to/file.html?ice=beam&cheese=toast&ice=cream#hash');

output === {
    "scheme": "http",
    "user": "user",
    "pass": "pass",
    "host": "www.example.com",
    "port": "8080",
    "path": "/path/to/file.html",
    "params": {
        "ice": "cream",
        "cheese": "toast"
    },
    "hash": "hash",
    "readonly": {
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
    }
}
```

and

``` js
output = uriJS.parse('path/to/file.html?marmite=lemoncurd#yum');
output === {
    "path": "path/to/file.html",
    "params": {
        "marmite": "lemoncurd"
    },
    "hash": "yum",
    "readonly": {
        "source": "path/to/file.html?marmite=lemoncurd#yum",
        "params": [
            {
                "key": "marmite",
                "value": "lemoncurd"
            }
        ]
    }
}
```

uri.stringify
---
__Takes an object and returns a URI string__

``` js
output = uriJS.stringify({
    "path": "path/to/file.html",
    "hash": "yum"
});
output === "path/to/file.html#yum";
```

Detail
---

uri.js defaults to the [URI Generic Syntax](http://en.wikipedia.org/wiki/URI_scheme#Generic_syntax) we're all familiar with: http(s)://, ftp://, .../path/file.html?query#hash. Schemes outside this are handled as follows:

``` js
output = uriJS.parse('mailto:frank.drebin@policesquad.com');
output === {
    "scheme": "mailto",
    "path": "frank.drebin@policesquad.com",
    "readonly": {
        "source": "mailto:frank.drebin@policesquad.com"
    }
}
```

Browser Compatibility
---
To support IE 8 and less a [polyfill for Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Polyfill) will be needed. Array.map is otherwise [well supported](http://kangax.github.io/compat-table/es5/#Array.prototype.map).
