module.exports = function(express, app, savedir, onupload){

	var o = {}; o.log = function(){}
	
	var fs =require('fs');
	try{fs.mkdirSync(savedir)} catch(e){}
	
    app.use(express.bodyParser({uploadDir: savedir}));
	
	app.all('/upl', function(r,s){
		s.send('<form method="post" enctype="multipart/form-data" action="/doupl"><input type="file" name="myfile"><input type="submit"></form><br>or  curl -F filedata=@localfile.jpg localhost:85/doupl');
	})
	app.post('/doupl', function(r,s){
			o.log('Getting file upload', r.files);
			
			fs.readFile(r.files.myfile.path, function (err, data) {
				fs.writeFile(savedir+'/'+r.files.myfile.filename, data, function (err) {
					 fs.unlink(r.files.myfile.path);
					 onupload(r,s, r.files.myfile);
				})
			})
	})
	
	return o;

}