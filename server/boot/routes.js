var themes = require(__dirname + '../../themes/themes');
var contentService = require( '../services/content.service');
const chalk = require('chalk');
const log = console.log;

var admin = require(__dirname + '/admin');
const helmet = require('helmet')

module.exports = function (app) {
  var router = app.loopback.Router();

  let page = '';
  let adminPage = '';

  (async () => {
    // page = await themes.getTheme();
    // page = this.contentService.getPage('5cdb5cc2f744441df910f43f', null);
    // console.log('asunc page ==>', page);
  })();

  (async () => {
    //TODO fix admin path for prod mode
    // adminPage = await admin.loadAdmin();
    // console.log('asunc page ==>', page);
  })();

  // app.use(express.static(__dirname + '/public' ));

//home page
  router.get('/', async function (req, res) {
    this.page = await contentService.getPage('5cdf78fe3a2cf6a3c5ff7fea', null);
    // console.log('page55', this.page);
    let url = req.url;
    // console.log('url get', url);
    res.send(this.page);
  });



  // router.get('*', async function (req, res) {
  //   // this.page = await contentService.getPage('5cdb5cc2f744441df910f43f', null);
  //   // console.log('page55', this.page);
  //   let url = req.url;
  //   console.log('url get', url);
  //   res.send(url);
  // });

  // router.get('/admin*', function (req, res) {
  //   res.send(adminPage);
  // });

  router.get('/admin', function (req, res) {
    res.send(adminPage);
  });

  router.get('/admin/content-types', function (req, res) {
    res.send(adminPage);
  });

  app.get('*', async function(req, res, next) {
    if (req.url === '/' || req.url === '/explorer' || req.url.startsWith('/api')
    || req.url.endsWith('.css') || req.url.endsWith('.js')) {
      // log(chalk.blue(req.url));
      return next();
    }

    this.page = await contentService.getContentByUrl(req.url, 'page');

    res.send(this.page);

  });
  // app.use('/admin', function(req, res, next) {
  //   console.log('admin route', req.url);
  //   res.send(adminPage);
  // });

  // app.use(/\/((?!admin).)*/, function(){
  //   return "ok";
  // });

  // app.get('*', function(req, res){
  //   res.send(adminPage);
  // });

// Allow from a specific host.
// Sets "X-Frame-Options: ALLOW-FROM http://example.com".
app.use(helmet.frameguard({
  action: 'allow-from',
  domain: 'http://localhost:4200'
}))

// app.use(helmet.frameguard({ action: 'sameorigin' }))


// app.use(helmet.frameguard({ action: 'allow' }))


// app.use(helmet.frameguard({ action: 'sameorigin' }))


  app.use(router);

};  