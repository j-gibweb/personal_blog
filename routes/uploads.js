var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

module.exports = function(app) {
  app.post('/uploads', function(req, res) {
    
    var s3 = new AWS.S3({params: {Bucket: 'gibweb'}});
    var image = require('fs').createReadStream(req.files.file.path);
    var params = {
      Key: req.files.file.originalname, 
      Body: image, 
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    }

    s3.createBucket(function() {
      s3.upload(params, function() {});
    });

    fs.unlink(req.files.file.path);

    // s3.listObjects(function(err, data) {
    //   if (err) {
    //     res.send(err)  
    //   } else {
    //     res.send(data.Contents)
    //   }  
    // })

    var url = "<img src='//s3-us-west-2.amazonaws.com/gibweb/" + req.files.file.originalname + "' class='img-responsive' />" 
    res.send(url)
  });
}