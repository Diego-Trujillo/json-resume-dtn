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
    console.log(schema[lang])
    res.render('resume.ejs', { schema: schema[lang], languages: { current: lang, available: languagesAvailable } });
  }
});

// =========================================== PORTFOLIO =======================================

// =========================================== EXPORT ===========================================
module.exports = router;

// =========================================== UTILITY ===========================================