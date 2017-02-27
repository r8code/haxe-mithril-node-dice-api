package components;

import mithril.M;
import components.Header;
import components.RollList;
import components.RollController;

class App implements Mithril
{   
    var header:Header = new Header();
    var rollList:RollList = new RollList();
    var rollController:RollController = new RollController();

    public function new() {
         
    }

    public function view() [
        m('.header', {}, header.view()),
        m('div', {"class": "row"}, [
          m('div', {"class": "col s12 m12 l6"}, 
            m('.roll-list', {}, rollList.view())
          ),
          m('div', {"class": "col s12 m12 l6"}, 
            m('.roll-controller', {}, rollController.view())
          )
        ])
    ];
}