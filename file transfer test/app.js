const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const app = express();
const path = require('path');
app.use(bodyParser.urlencoded({extended: true}));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
 
var upload = multer({ storage: storage })

app.get('/', function(req, res) {
    res.render("home.ejs");   
});
 
app.post("/uploadfile", upload.single('myFile'),function(req, res){
	if (req.file) {
        var filename = req.file.filename;
        console.log('Uploaded file '+filename);
	}
	else{
		console.log('Failed to upload!');
	}
});

app.get('/download/:file(*)',(req, res) => {
  var file = req.params.file;
  var fileLocation = path.join('./uploads',file);
  console.log(fileLocation);
  res.download(fileLocation, file); 
});

app.listen(3000, function(){
	console.log('Server started on port 3000')
});