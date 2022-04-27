const http = require('http');

const server = http.createServer(function (req, res) {   

    //handle incomming requests here..

});

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 