var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var multer = require('multer')
var path = require('path')
var fs = require('fs');
var sightengine = require('sightengine')('{64931107}', '{Ebt2w6xx5LYYoaR8ZteG}');
var mongoose = require('mongoose')
var index = require('./routes/index')
var app = express()

mongoose.connect('mongodb://localhost/houses')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

 app.use(express.static(__dirname + '/public'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({ storage: storage });


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/uploads', upload.single('image'), (req, res) => {
  sightengine.check(['nudity']).image(path.join(req.file.path)).then((result) => {
    if(result.nudity.safe >= result.nudity.partial && result.nudity.safe >= result.nudity.raw) {
        return res.json({ error: false, message: 'Success ! your image was upload successfully'});
    } else {
      fs.unlinkSync(path.join(req.file.path));
      return res.json({ error: true, message: 'Error ! your image contain nudity content !'});
    }
  }).catch(function(err) {
    res.json(err); // catch your error
  });
});

app.use('/',index)



app.listen(3000)
