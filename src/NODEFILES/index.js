const http = require('http');
const url = require('url');
const StringDecoder =require('string_decoder').StringDecoder;
const server =http.createServer(function(req,res)
{
    // Handling URL, Query here
    const parsedUrl=url.parse(req.url,true);
    const path=parsedUrl.pathname;
    const queryString=parsedUrl.query;

    // Parsing Headers
    // console.dir(queryString);
    // console.dir(req.headers);

    // Parsing Payloads
    const decoder = new StringDecoder('utf-8');
    var buffer='';
    req.on('data',function(data){
        buffer+=decoder.write(data);
    });
    req.on('end',function(){
        buffer+=decoder.end();
        res.end(
            `You are at path ${path}
            Method used : ${req.method},
            Payload : ${buffer}
            `);
    })
    console.log('Buffer'+buffer)
});

server.listen(3000,()=> console.log("Listening on port 3000"));