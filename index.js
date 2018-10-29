
// https://millermedeiros.github.io/mdoc/examples/node_api/doc/net.html#net.createServer
// telenet 127.0.0.1 8080

var net = require('net');
const fs = require('fs');

var server = net.createServer(function(socket) { //'connection' listener
    
    console.log('Server started: Waiting for client connection ...');
    console.log('Client connected:port,address: '+socket.remotePort,      socket.remoteAddress);

    console.log(socket);

    socket.on('data', function(data){
        var date = new Date();
        var today = date.getDate()+'_'+date.getMonth();
        fs.appendFile(today+'_log.txt', data, function (err) {
            if (err) throw err;
            console.log(data.toString())
            //console.log(data.toString('ascii'))
        });
    });

    socket.on('end', function() {
        console.log('server disconnected');
    });

    socket.write('Hello cliet, this is IPO Avaya Bridge Server.\r\n');
    socket.pipe(socket);
});

server.listen(8080, function() { //'listening' listener
  console.log('server bound');
});