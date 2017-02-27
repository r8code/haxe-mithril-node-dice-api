import js.npm.express.Middleware;
import js.npm.express.Request;
import js.npm.express.Response;
import js.npm.express.BodyParser;
import js.npm.express.Static;
import utils.Routes;

class Server {
  static function main(){
    var port = 3000;
    var app = new js.npm.Express();

    // Serialization middleware.
    app.use(BodyParser.json({ limit: '5mb', type: 'application/json' }));
    
    // Serve static files.
    app.use(new Static('build/client'));

    // CORS
    app.all('*', function(req:Request, res:Response, next:MiddlewareNext) {
        var origin = req.get('origin'); 
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
        next();
    });

    // CRUD routes.
    Routes.route(app);

    // Start server.
    app.listen(port);
    trace('Now listening on port ${port}.');
  }
}
