import mithril.M;
import components.App;

class Client implements Mithril
{
    var app:App = new App();
    
    public function new() {
    }

    public function view() [
      m('.client', {}, app.view())
    ];

    static function main() {
      M.mount(js.Browser.document.body, new Client());
    }
}