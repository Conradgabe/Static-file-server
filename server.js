const http = require('http');
const fs = require('fs');
const os = require('os');
const { url } = require('inspector');

const host = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');

    let path = './pages'
    switch(req.url){
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
    };

    const urlPath = req.url;
    
    const osinfo = JSON.stringify({
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        numberofCPUS: os.cpus(),
        networkInterfaces: os.networkInterfaces(),
        uptime: os.uptime(),
    });

    if (urlPath === '/sys'){
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');

        fs.writeFile('osinfo.json', osinfo, (err) => {
            if(err){
                console.log(error);
            };
        });
        res.write('Your os have been saved successfully');
        res.end();
    };

    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.end(data);
        };
    });

});

server.listen(port, host, () => {
    console.log(`server running on ${host}:${port}`);
});