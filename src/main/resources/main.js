var mustache = require('/lib/xp/mustache');
var portalLib = require('/lib/xp/portal');

var renderServiceWorker = function() {

    var appUrl = portalLib.url({path:'/app/' + app.name}) + '/';

    return {
        headers: {
            'Service-Worker-Allowed': appUrl
        },
        contentType: 'application/javascript',
        body: mustache.render(resolve('/views/sw.js'), {
            appUrl: appUrl
        })
    }
};

exports.get = function (req) {

    var appUrl = portalLib.url({path:'/app/' + app.name}) + '/';

    if (req.path.endsWith('/sw.js')) {

        return renderServiceWorker();
    }

    return {
        body: mustache.render(resolve('views/index.html'), {
            appUrl: appUrl
        })
    }
};
