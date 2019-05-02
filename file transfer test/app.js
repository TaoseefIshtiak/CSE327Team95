const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

var upload = multer({ dest: 'uploads/' });

app.get('/', function(req, res) {
    res.render("home.ejs");   
});
 
app.post("/uploadfile", upload.single('myFile'),function(req, res){
	if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.filename;
        console.log(filename);
	}
	else{
		console.log('Failed to upload!');
	}
});


app.listen(3000, function(){
	console.log('Server started on port 3000')
});