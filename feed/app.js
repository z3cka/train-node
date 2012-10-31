var flatiron = require('flatiron'),
    path = require('path'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);
app.use(require('./plugins/feed.js'), {});

app.startPolling();

app.router.get('/', function () {
  this.res.json(app.getItems());
});

app.start(app.config.get('port'));
