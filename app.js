var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var fs=require('fs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/home',function(req,res){
	res.render('home.ejs');
})
app.get('/shiftingHome',function(req,res){
	res.render('shiftingHome.ejs');
})
app.get('/anotherHome',function(req,res){
	res.render('anotherHome.ejs');
})

app.get('/workpage/:id', function(req,res){
	if(req.params.id=='shadesOfGray'){
		var worksheet={
			title:'Bob Ross',
			body:fs.readFileSync('public/textFiles/bobRoss.txt').toString(),	
		}
		res.render('workpage.ejs',{worksheet:worksheet});
	}else if(req.params.id=='foxInSocks'){
		var worksheet={
			title:'Fox In Socks',
			body:fs.readFileSync('public/textFiles/foxInSocks.txt').toString(),
		}
		res.render('workpage.ejs',{worksheet:worksheet});
	}else if(req.params.id=='alexJonesDreams'){
		var worksheet={
			title:'Alex Jones',
			body:fs.readFileSync('public/textFiles/alexJonesDreams.txt').toString(),
		}
		res.render('workpage.ejs',{worksheet:worksheet});
	}else if(req.params.id=='tonaldDrump'){
		var worksheet={
			title:'Tonald Drump',
			body:fs.readFileSync('public/textFiles/trumpAxios.txt').toString(),
		}
		res.render('workpage.ejs',{worksheet:worksheet});
	}
	
})





app.listen(99,function(req,res){
	console.log('Listen');
})