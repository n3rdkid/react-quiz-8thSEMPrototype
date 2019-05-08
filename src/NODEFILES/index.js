const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config=require('./config')
const server = http.createServer(function (req, res) {
            // Handling URL, Query here
            const parsedUrl = url.parse(req.url, true);
            const path = parsedUrl.pathname;
            const queryString = parsedUrl.query;

            // Parsing Headers
            // console.dir(queryString);
            // console.dir(req.headers);

            // Parsing Payloads
            const decoder = new StringDecoder('utf-8');
            var buffer = '';
            req.on('data', function (data) {
                buffer += decoder.write(data);
            });
            req.on('end', function () {
                        buffer += decoder.end();
                        // Choosing handler
                        const choosenHandler = typeof (router[path]) !== 'undefined' ? router[path] : handlers.notFound;

                        const data = {
                            'path': path,
                            'method': req.method,
                            'queryString': queryString,
                            'headers': req.headers,
                            'payload': buffer
                        }
                        choosenHandler(data,function(statusCode,payload)
                        {
                            statusCode=typeof(statusCode)=='number'?statusCode:200;
                            payload=typeof(payload)=='object'?payload:{};
                            let responsePayload=JSON.stringify(payload);
                            res.setHeader('Content-Type','application/json')
                            res.writeHead(statusCode);
                            res.end(responsePayload);
                            console.log("Returning" + statusCode+ " and "+responsePayload);
                        })

    })
    const handlers={};
    handlers.sample=function(data,callback)
    {
        callback(406,{'name':'sample handler'})
    }
    handlers.ping=function(data,callback)
    {
        callback(200)
    }
    handlers.notFound=function(data,callback)
    {
        callback(404);
    }
    const router = {
        '/ping':handlers.ping,

    }
});

server.listen(config.port,()=> console.log(`We are on Listening on port : ${config.port} on ${config.envName} mode`));