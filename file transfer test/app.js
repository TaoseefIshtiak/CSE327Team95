const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
 


app.get('/', function(req, res) {
    res.render("home.ejs");   
});
 
app.post("/uploadfile", function(req, res){
	
});


app.listen(3000, function(){
	console.log('Server started on port 3000')
});