const express = require('express');
const app = express();
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){
    var form = new formidable.IncomingForm();
    
    form.multiples = true;
    
    form.uploadDir = path.join(__dirname, 'uploads');
    
    form.on('file', function(field, file){
        fs.rename(file.path, path.join(form.uploadDir, file.name));    
    });
    
    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);
       
});

const server = app.listen(3000, function(){
    console.log('Server listening on port 3000');
});