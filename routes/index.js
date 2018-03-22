// =========================================== DEPENDENCIES ====================================
var express = require('express');
var router = express.Router();
var fs = require('fs');

// =========================================== CONFIG ==========================================
// ---- Read and store all available language structures
var languagesAvailable = JSON.parse(fs.readFileSync(__dirname + '/../schema/config.json', 'utf8')).languages;
var schema = {};

languagesAvailable.forEach(function(language){
  schema[language] = {
    pageElements: JSON.parse(fs.readFileSync(__dirname + '/../schema/page-elements/' + language + '.json', 'utf8')),
    portfolio: JSON.parse(fs.readFileSync(__dirname + '/../schema/portfolio/' + language + '.json', 'utf8')),
    resume: JSON.parse(fs.readFileSync(__dirname + '/../schema/resume/' + language + '.json', 'utf8'))
  }
});


// =========================================== INDEX ===========================================
router.get('/', function(req, res, next) {
  res.redirect('/resume/es');
});

// =========================================== RESUME ==========================================
router.get('/resume/:lang', function(req, res, next){
  var lang = req.params.lang;
  if(!languagesAvailable.includes(lang)){
    res.send('we dont have it goy.');
  }
  else{
    schema = {};
    fs.readFile((__dirname + '/../schema/page-elements/' + lang + '.json'), 'utf8', function(err, data){
      if (err) return res.json(err);
      schema.pageElements = JSON.parse(data);
      
      fs.readFile((__dirname + '/../schema/portfolio/' + lang + '.json'), 'utf8', function(err, data){
        if (err) return res.json(err);
        schema.portfolio = JSON.parse(data);
        
        fs.readFile((__dirname + '/../schema/resume/' + lang + '.json'), 'utf8', function(err, data){
          if(err) return res.json(err);
          schema.resume = JSON.parse(data);
          console.log(schema)
          res.render('resume.ejs', { schema, languages: { current: lang, available: languagesAvailable } });
        });
      });
    });
  }
});

// =========================================== PORTFOLIO =======================================

// =========================================== EXPORT ===========================================
module.exports = router;

// =========================================== UTILITY ===========================================
