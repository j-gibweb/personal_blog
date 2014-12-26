var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

module.exports = function(app) {
  
  app.post('/uploads', function(req, res) {
    
    var s3 = new AWS.S3({params: {Bucket: 'gibweb'}});
    var image = require('fs').createReadStream(req.files.file.path);
    
    // I want to put s3 files into folders that correlate to the posts they are in
    // var endpoint =  req.session.passport.user +'/' + req.files.file.originalname
    var endpoint = req.files.file.originalname
    var params = {
      Key: endpoint, 
      Body: image, 
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    }
    
    s3.createBucket(function() {
      s3.upload(params, function() {});
    });

    // delete file from uploads directory after sending to s3
    fs.unlink(req.files.file.path);

    var url = "<img src='//s3-us-west-2.amazonaws.com/gibweb/" + endpoint + "' class='img-responsive' />" 
    res.send(url)
    // res.send(req.session)
  });

  app.delete('/uploads/:id', function(req, res) {
    var s3 = new AWS.S3({
      params: {
        Bucket: 'gibweb'
      }
    });

    var key = req.params.id
    s3.deleteObject({Key: key}, function(err, data) {
      console.log(err, data)
    });
  });
    
}


// s3.listObjects(function(err, data) {
//   if (err) {
//     res.send(err)  
//   } else {
//     res.send(data.Contents)
//   }  
// })