// Generated by Haxe 3.4.0
(function () { "use strict";
var mithril_Mithril = function() { };
mithril_Mithril.__name__ = true;
var Client = function() {
	this.app = new components_App();
};
Client.__name__ = true;
Client.__interfaces__ = [mithril_Mithril];
Client.main = function() {
	m.mount(window.document.body,new Client());
};
Client.prototype = {
	view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = this.app.view();
		return [m.m(".client",{ },tmp)];
	}
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var components_App = function() {
	this.rollController = new components_RollController();
	this.rollList = new components_RollList();
	this.header = new components_Header();
};
components_App.__name__ = true;
components_App.__interfaces__ = [mithril_Mithril];
components_App.prototype = {
	view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = this.header.view();
		var tmp1 = m.m(".header",{ },tmp);
		var tmp2 = this.rollList.view();
		var tmp3 = m.m(".roll-list",{ },tmp2);
		var tmp4 = m.m("div",{ "class" : "col s12 m12 l6"},tmp3);
		var tmp5 = this.rollController.view();
		var tmp6 = m.m(".roll-controller",{ },tmp5);
		var tmp7 = m.m("div",{ "class" : "col s12 m12 l6"},tmp6);
		return [tmp1,m.m("div",{ "class" : "row"},[tmp4,tmp7])];
	}
};
var components_Header = function() {
};
components_Header.__name__ = true;
components_Header.__interfaces__ = [mithril_Mithril];
components_Header.prototype = {
	view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = m.m("img",{ src : "../assets/dice-header-icon.png"});
		return [m.m("ul",{ "class" : "center-align"},tmp),m.m("h3",{ "class" : "center-align"},"Dice API - Troy Edwards")];
	}
};
var components_RollController = function() {
	this.literalValue = new controllers_LiteralValue();
	this.explosiveRoll = new controllers_ExplosiveRoll();
	this.keepHighestRolls = new controllers_KeepHighestRolls();
	this.dropLowestRolls = new controllers_DropLowestRolls();
	this.diceRoll = new controllers_DiceRoll();
	this.oneDieRoll = new controllers_OneDieRoll();
};
components_RollController.__name__ = true;
components_RollController.__interfaces__ = [mithril_Mithril];
components_RollController.prototype = {
	getRollType: function() {
		var rollType = this.oneDieRoll.view();
		var rollType1 = m.m("h1",{ "class" : "center-align"},rollType);
		var _g = models_RollType.rollType;
		switch(_g) {
		case "DICE_ROLL":
			var rollType2 = this.diceRoll.view();
			rollType1 = m.m("h1",{ "class" : "center-align"},rollType2);
			break;
		case "DROP_LOWEST_ROLLS":
			var rollType3 = this.dropLowestRolls.view();
			rollType1 = m.m("h1",{ "class" : "center-align"},rollType3);
			break;
		case "EXPLOSIVE_ROLL":
			var rollType4 = this.explosiveRoll.view();
			rollType1 = m.m("h1",{ "class" : "center-align"},rollType4);
			break;
		case "KEEP_HIGHEST_ROLLS":
			var rollType5 = this.keepHighestRolls.view();
			rollType1 = m.m("h1",{ "class" : "center-align"},rollType5);
			break;
		case "LITERAL_VALUE":
			var rollType6 = this.literalValue.view();
			rollType1 = m.m("h1",{ "class" : "center-align"},rollType6);
			break;
		case "ONE_DIE_ROLL":
			var rollType7 = this.oneDieRoll.view();
			rollType1 = m.m("h1",{ "class" : "center-align"},rollType7);
			break;
		}
		return rollType1;
	}
	,view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = this.getRollType();
		return [m.m("div",{ "class" : ""},tmp)];
	}
};
var components_RollList = function() {
};
components_RollList.__name__ = true;
components_RollList.__interfaces__ = [mithril_Mithril];
components_RollList.prototype = {
	sendRequest: function(rollType) {
		models_RollType.rollType = rollType;
		console.log(models_RollType.rollType);
		m.request({ url : "http://localhost:3000/roll"}).then(function(data) {
			console.log(data);
		});
	}
	,view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = m.m("h6",{ "class" : "center-align", style : { marginLeft : "50px"}},"Pick Dice Roll Type");
		var f = $bind(this,this.sendRequest);
		var tmp1 = function() {
			f("ONE_DIE_ROLL");
		};
		var tmp2 = m.m("i",{ "class" : "material-icons circle", style : { marginTop : "10px"}},"casino");
		var tmp3 = m.m("h3",{ "class" : "title flow-text", style : { fontSize : "20px"}},"One Die Roll");
		var tmp4 = m.m("li",{ "class" : "collection-item avatar waves-effect center-align", onclick : tmp1},[tmp2,tmp3]);
		var f1 = $bind(this,this.sendRequest);
		var tmp5 = function() {
			f1("DICE_ROLL");
		};
		var tmp6 = m.m("i",{ "class" : "material-icons circle", style : { marginTop : "10px"}},"casino");
		var tmp7 = m.m("h3",{ "class" : "title flow-text", style : { fontSize : "20px"}},"Dice Roll");
		var tmp8 = m.m("li",{ "class" : "collection-item avatar waves-effect center-align", onclick : tmp5},[tmp6,tmp7]);
		var f2 = $bind(this,this.sendRequest);
		var tmp9 = function() {
			f2("DROP_LOWEST_ROLLS");
		};
		var tmp10 = m.m("i",{ "class" : "material-icons circle", style : { marginTop : "10px"}},"casino");
		var tmp11 = m.m("h3",{ "class" : "title flow-text", style : { fontSize : "20px"}},"Drop Lowest Rolls");
		var tmp12 = m.m("li",{ "class" : "collection-item avatar waves-effect center-align", onclick : tmp9},[tmp10,tmp11]);
		var f3 = $bind(this,this.sendRequest);
		var tmp13 = function() {
			f3("KEEP_HIGHEST_ROLLS");
		};
		var tmp14 = m.m("i",{ "class" : "material-icons circle", style : { marginTop : "10px"}},"casino");
		var tmp15 = m.m("h3",{ "class" : "title flow-text", style : { fontSize : "20px"}},"Keep Highest Rolls");
		var tmp16 = m.m("li",{ "class" : "collection-item avatar waves-effect center-align", onclick : tmp13},[tmp14,tmp15]);
		var f4 = $bind(this,this.sendRequest);
		var tmp17 = function() {
			f4("EXPLOSIVE_ROLL");
		};
		var tmp18 = m.m("i",{ "class" : "material-icons circle", style : { marginTop : "10px"}},"casino");
		var tmp19 = m.m("h3",{ "class" : "title flow-text", style : { fontSize : "20px"}},"Explosive Roll");
		var tmp20 = m.m("li",{ "class" : "collection-item avatar waves-effect center-align", onclick : tmp17},[tmp18,tmp19]);
		var f5 = $bind(this,this.sendRequest);
		var tmp21 = function() {
			f5("LITERAL_VALUE");
		};
		var tmp22 = m.m("i",{ "class" : "material-icons circle", style : { marginTop : "10px"}},"casino");
		var tmp23 = m.m("h3",{ "class" : "title flow-text", style : { fontSize : "20px"}},"Literal Value");
		var tmp24 = m.m("li",{ "class" : "collection-item avatar waves-effect center-align", onclick : tmp21},[tmp22,tmp23]);
		var tmp25 = m.m("ul",{ "class" : "collection"},[tmp,tmp4,tmp8,tmp12,tmp16,tmp20,tmp24]);
		var tmp26 = m.m("div",{ "class" : "card-content"},tmp25);
		return [m.m("div",{ "class" : "card"},tmp26)];
	}
};
var controllers_DiceRoll = function() {
	this.reqData = [];
	this.initialLoad = false;
	this.reqLoaded = false;
	this.reqValue = "";
	this.rollValue = "";
};
controllers_DiceRoll.__name__ = true;
controllers_DiceRoll.__interfaces__ = [mithril_Mithril];
controllers_DiceRoll.prototype = {
	rollDice: function() {
		var _gthis = this;
		this.reqLoaded = false;
		this.initialLoad = true;
		m.request({ method : "POST", url : "http://localhost:3000/roll", data : { type : "DICE_ROLL", payload : { "rollValue" : this.rollValue}}, withCredentials : false}).then(function(res) {
			_gthis.reqLoaded = true;
			_gthis.reqData = res;
			console.log(res);
		})["catch"](function(res1) {
			_gthis.reqLoaded = false;
			_gthis.initialLoad = false;
			js_Browser.alert("Request to server has failed - " + res1);
		});
	}
	,renderDiceImages: function() {
		var diceArray = [m.m("h4",{ },"Total: " + Std.string(this.reqData.rollTotal))];
		var _g1 = 0;
		var _g = this.reqData.diceGroup.length;
		while(_g1 < _g) {
			var i = _g1++;
			var die = this.reqData.diceGroup[i];
			var tmp = m.m("img",{ src : "../assets/dice-" + die.rollValue + ".png"});
			var tmp1 = m.m("p",{ },"Die Value: " + die.rollValue);
			diceArray.push(m.m("div",{ style : { display : "inline-block", padding : "20px"}},[tmp,tmp1]));
		}
		return diceArray;
	}
	,renderDice: function() {
		if(this.reqLoaded == false && this.initialLoad == true) {
			var tmp = m.m("div",{ "class" : "circle"});
			var tmp1 = m.m("div",{ "class" : "circle-clipper left"},tmp);
			var tmp2 = m.m("div",{ "class" : "circle"});
			var tmp3 = m.m("div",{ "class" : "gap-patch"},tmp2);
			var tmp4 = m.m("div",{ "class" : "circle"});
			var tmp5 = m.m("div",{ "class" : "circle-clipper right"},tmp4);
			var tmp6 = m.m("div",{ "class" : "spinner-layer spinner-green-only"},[tmp1,tmp3,tmp5]);
			return [m.m("div",{ "class" : "preloader-wrapper small active", style : { margin : "30px"}},tmp6)];
		} else if(this.reqLoaded == true && this.initialLoad == true) {
			var tmp7 = this.renderDiceImages();
			return [m.m("div",{ style : { paddingBottom : "30px"}},tmp7)];
		} else {
			return [m.m("div",{ "class" : "", style : { paddingBottom : "30px"}},"Choose a dice expression.")];
		}
	}
	,view: function() {
		var _gthis = this;
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = m.m("h3",{ "class" : ""},"Dice Roll");
		var tmp1 = m.m("h6",{ "class" : ""},"Roll Multiple Dice (Accepted Values [1-∞]d[1-8]) - Example '10d4'");
		var tmp2 = m.m("a",{ "class" : "waves-effect btn-flat", onclick : $bind(this,this.rollDice)},"Click To Roll Dice");
		var tmp3 = m.m("input",{ placeholder : "N​d​X​", oninput : function(e) {
			_gthis.rollValue = e.target.value;
		}, value : this.rollValue});
		var tmp4 = m.m("div",{ "class" : "input-field"},[tmp3]);
		var tmp5 = this.renderDice();
		var tmp6 = m.m("div",{ },tmp5);
		return [m.m("div",{ "class" : "card center-align"},[tmp,tmp1,tmp2,tmp4,tmp6])];
	}
};
var controllers_DropLowestRolls = function() {
	this.reqData = [];
	this.initialLoad = false;
	this.reqLoaded = false;
	this.reqValue = "";
	this.rollValue = "";
};
controllers_DropLowestRolls.__name__ = true;
controllers_DropLowestRolls.__interfaces__ = [mithril_Mithril];
controllers_DropLowestRolls.prototype = {
	rollDice: function() {
		var _gthis = this;
		this.reqLoaded = false;
		this.initialLoad = true;
		m.request({ method : "POST", url : "http://localhost:3000/roll", data : { type : "DROP_LOWEST_ROLLS", payload : { "rollValue" : this.rollValue}}, withCredentials : false}).then(function(res) {
			_gthis.reqLoaded = true;
			_gthis.reqData = res;
			console.log(res);
		})["catch"](function(res1) {
			_gthis.reqLoaded = false;
			_gthis.initialLoad = false;
			js_Browser.alert("Request to server has failed - " + res1);
		});
	}
	,renderDiceImages: function() {
		var diceArray = [m.m("h4",{ },"Total: " + Std.string(this.reqData.rollTotal))];
		var _g1 = 0;
		var _g = this.reqData.diceGroup.length;
		while(_g1 < _g) {
			var i = _g1++;
			var die = this.reqData.diceGroup[i];
			var tmp = m.m("img",{ src : "../assets/dice-" + die + ".png"});
			var tmp1 = m.m("p",{ },"Die Value: " + die);
			diceArray.push(m.m("div",{ style : { display : "inline-block", padding : "20px"}},[tmp,tmp1]));
		}
		return diceArray;
	}
	,renderDice: function() {
		if(this.reqLoaded == false && this.initialLoad == true) {
			var tmp = m.m("div",{ "class" : "circle"});
			var tmp1 = m.m("div",{ "class" : "circle-clipper left"},tmp);
			var tmp2 = m.m("div",{ "class" : "circle"});
			var tmp3 = m.m("div",{ "class" : "gap-patch"},tmp2);
			var tmp4 = m.m("div",{ "class" : "circle"});
			var tmp5 = m.m("div",{ "class" : "circle-clipper right"},tmp4);
			var tmp6 = m.m("div",{ "class" : "spinner-layer spinner-green-only"},[tmp1,tmp3,tmp5]);
			return [m.m("div",{ "class" : "preloader-wrapper small active", style : { margin : "30px"}},tmp6)];
		} else if(this.reqLoaded == true && this.initialLoad == true) {
			var tmp7 = this.renderDiceImages();
			return [m.m("div",{ style : { paddingBottom : "30px"}},tmp7)];
		} else {
			return [m.m("div",{ "class" : "", style : { paddingBottom : "30px"}},"Choose a dice expression.")];
		}
	}
	,view: function() {
		var _gthis = this;
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = m.m("h3",{ "class" : ""},"Drop Lowest Rolls");
		var tmp1 = m.m("h6",{ "class" : ""},"Drop the lowest rolls (Accepted Values [1-∞]d[1-8]d[1-8]) - Example '10d4d2'");
		var tmp2 = m.m("a",{ "class" : "waves-effect btn-flat", onclick : $bind(this,this.rollDice)},"Click To Roll Dice");
		var tmp3 = m.m("input",{ placeholder : "N​dX​dD​", oninput : function(e) {
			_gthis.rollValue = e.target.value;
		}, value : this.rollValue});
		var tmp4 = m.m("div",{ "class" : "input-field"},[tmp3]);
		var tmp5 = this.renderDice();
		var tmp6 = m.m("div",{ },tmp5);
		return [m.m("div",{ "class" : "card center-align"},[tmp,tmp1,tmp2,tmp4,tmp6])];
	}
};
var controllers_ExplosiveRoll = function() {
	this.reqData = [];
	this.initialLoad = false;
	this.reqLoaded = false;
	this.reqValue = "";
	this.rollValue = "";
};
controllers_ExplosiveRoll.__name__ = true;
controllers_ExplosiveRoll.__interfaces__ = [mithril_Mithril];
controllers_ExplosiveRoll.prototype = {
	rollDice: function() {
		var _gthis = this;
		this.reqLoaded = false;
		this.initialLoad = true;
		m.request({ method : "POST", url : "http://localhost:3000/roll", data : { type : "EXPLOSIVE_ROLL", payload : { "rollValue" : this.rollValue}}, withCredentials : false}).then(function(res) {
			_gthis.reqLoaded = true;
			_gthis.reqData = res;
			console.log(res);
		})["catch"](function(res1) {
			_gthis.reqLoaded = false;
			_gthis.initialLoad = false;
			js_Browser.alert("Request to server has failed - " + res1);
		});
	}
	,renderDiceImages: function() {
		var diceArray = [m.m("h4",{ },"Total: " + Std.string(this.reqData.rollTotal)),m.m("h4",{ },"Total: " + Std.string(this.reqData.exploded))];
		var _g1 = 0;
		var _g = this.reqData.diceGroup.length;
		while(_g1 < _g) {
			var i = _g1++;
			var die = this.reqData.diceGroup[i];
			var tmp = m.m("img",{ src : "../assets/dice-" + die + ".png"});
			var tmp1 = m.m("p",{ },"Die Value: " + die);
			diceArray.push(m.m("div",{ style : { display : "inline-block", padding : "20px"}},[tmp,tmp1]));
		}
		return diceArray;
	}
	,renderDice: function() {
		if(this.reqLoaded == false && this.initialLoad == true) {
			var tmp = m.m("div",{ "class" : "circle"});
			var tmp1 = m.m("div",{ "class" : "circle-clipper left"},tmp);
			var tmp2 = m.m("div",{ "class" : "circle"});
			var tmp3 = m.m("div",{ "class" : "gap-patch"},tmp2);
			var tmp4 = m.m("div",{ "class" : "circle"});
			var tmp5 = m.m("div",{ "class" : "circle-clipper right"},tmp4);
			var tmp6 = m.m("div",{ "class" : "spinner-layer spinner-green-only"},[tmp1,tmp3,tmp5]);
			return [m.m("div",{ "class" : "preloader-wrapper small active", style : { margin : "30px"}},tmp6)];
		} else if(this.reqLoaded == true && this.initialLoad == true) {
			var tmp7 = this.renderDiceImages();
			return [m.m("div",{ style : { paddingBottom : "30px"}},tmp7)];
		} else {
			return [m.m("div",{ "class" : "", style : { paddingBottom : "30px"}},"Choose a dice expression.")];
		}
	}
	,view: function() {
		var _gthis = this;
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = m.m("h3",{ "class" : ""},"Explosive Roll");
		var tmp1 = m.m("h6",{ "class" : ""},"For each value that is equal or greater than E​ roll again until no values\r\n          need to be re-rolled. (Accepted Values [1-∞]d[1-8]x[1-8]) - Example '10d8x5'");
		var tmp2 = m.m("a",{ "class" : "waves-effect btn-flat", onclick : $bind(this,this.rollDice)},"Click To Roll Dice");
		var tmp3 = m.m("input",{ placeholder : "N​dX​xE", oninput : function(e) {
			_gthis.rollValue = e.target.value;
		}, value : this.rollValue});
		var tmp4 = m.m("div",{ "class" : "input-field"},[tmp3]);
		var tmp5 = this.renderDice();
		var tmp6 = m.m("div",{ },tmp5);
		return [m.m("div",{ "class" : "card center-align"},[tmp,tmp1,tmp2,tmp4,tmp6])];
	}
};
var controllers_KeepHighestRolls = function() {
	this.reqData = [];
	this.initialLoad = false;
	this.reqLoaded = false;
	this.reqValue = "";
	this.rollValue = "";
};
controllers_KeepHighestRolls.__name__ = true;
controllers_KeepHighestRolls.__interfaces__ = [mithril_Mithril];
controllers_KeepHighestRolls.prototype = {
	rollDice: function() {
		var _gthis = this;
		this.reqLoaded = false;
		this.initialLoad = true;
		m.request({ method : "POST", url : "http://localhost:3000/roll", data : { type : "KEEP_HIGHEST_ROLLS", payload : { "rollValue" : this.rollValue}}, withCredentials : false}).then(function(res) {
			_gthis.reqLoaded = true;
			_gthis.reqData = res;
			console.log(res);
		})["catch"](function(res1) {
			_gthis.reqLoaded = false;
			_gthis.initialLoad = false;
			js_Browser.alert("Request to server has failed - " + res1);
		});
	}
	,renderDiceImages: function() {
		var diceArray = [m.m("h4",{ },"Total: " + Std.string(this.reqData.rollTotal))];
		var _g1 = 0;
		var _g = this.reqData.diceGroup.length;
		while(_g1 < _g) {
			var i = _g1++;
			var die = this.reqData.diceGroup[i];
			var tmp = m.m("img",{ src : "../assets/dice-" + die + ".png"});
			var tmp1 = m.m("p",{ },"Die Value: " + die);
			diceArray.push(m.m("div",{ style : { display : "inline-block", padding : "20px"}},[tmp,tmp1]));
		}
		return diceArray;
	}
	,renderDice: function() {
		if(this.reqLoaded == false && this.initialLoad == true) {
			var tmp = m.m("div",{ "class" : "circle"});
			var tmp1 = m.m("div",{ "class" : "circle-clipper left"},tmp);
			var tmp2 = m.m("div",{ "class" : "circle"});
			var tmp3 = m.m("div",{ "class" : "gap-patch"},tmp2);
			var tmp4 = m.m("div",{ "class" : "circle"});
			var tmp5 = m.m("div",{ "class" : "circle-clipper right"},tmp4);
			var tmp6 = m.m("div",{ "class" : "spinner-layer spinner-green-only"},[tmp1,tmp3,tmp5]);
			return [m.m("div",{ "class" : "preloader-wrapper small active", style : { margin : "30px"}},tmp6)];
		} else if(this.reqLoaded == true && this.initialLoad == true) {
			var tmp7 = this.renderDiceImages();
			return [m.m("div",{ style : { paddingBottom : "30px"}},tmp7)];
		} else {
			return [m.m("div",{ "class" : "", style : { paddingBottom : "30px"}},"Choose a dice expression.")];
		}
	}
	,view: function() {
		var _gthis = this;
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = m.m("h3",{ "class" : ""},"Keep Highest Rolls");
		var tmp1 = m.m("h6",{ "class" : ""},"Keep the highest rolls (Accepted Values [1-∞]d[1-8]k[1-8] - Example '10d6k4'");
		var tmp2 = m.m("a",{ "class" : "waves-effect btn-flat", onclick : $bind(this,this.rollDice)},"Click To Roll Dice");
		var tmp3 = m.m("input",{ placeholder : "N​dX​dD​", oninput : function(e) {
			_gthis.rollValue = e.target.value;
		}, value : this.rollValue});
		var tmp4 = m.m("div",{ "class" : "input-field"},[tmp3]);
		var tmp5 = this.renderDice();
		var tmp6 = m.m("div",{ },tmp5);
		return [m.m("div",{ "class" : "card center-align"},[tmp,tmp1,tmp2,tmp4,tmp6])];
	}
};
var controllers_LiteralValue = function() {
	this.reqData = [];
	this.initialLoad = false;
	this.reqLoaded = false;
	this.reqValue = "";
	this.rollValue = "";
};
controllers_LiteralValue.__name__ = true;
controllers_LiteralValue.__interfaces__ = [mithril_Mithril];
controllers_LiteralValue.prototype = {
	rollDice: function() {
		var _gthis = this;
		this.reqLoaded = false;
		this.initialLoad = true;
		m.request({ method : "POST", url : "http://localhost:3000/roll", data : { type : "LITERAL_VALUE", payload : { "rollValue" : this.rollValue}}, withCredentials : false}).then(function(res) {
			_gthis.reqLoaded = true;
			_gthis.reqData = res;
			console.log(res);
		})["catch"](function(res1) {
			_gthis.reqLoaded = false;
			_gthis.initialLoad = false;
			js_Browser.alert("Request to server has failed - " + res1);
		});
	}
	,renderDiceImages: function() {
		var tmp = m.m("img",{ src : "../assets/dice-" + Std.string(this.reqData.rollValue) + ".png"});
		var tmp1 = m.m("p",{ },"Die Value: " + Std.string(this.reqData.rollValue));
		return [m.m("div",{ style : { display : "inline-block", padding : "20px"}},[tmp,tmp1])];
	}
	,renderDice: function() {
		if(this.reqLoaded == false && this.initialLoad == true) {
			var tmp = m.m("div",{ "class" : "circle"});
			var tmp1 = m.m("div",{ "class" : "circle-clipper left"},tmp);
			var tmp2 = m.m("div",{ "class" : "circle"});
			var tmp3 = m.m("div",{ "class" : "gap-patch"},tmp2);
			var tmp4 = m.m("div",{ "class" : "circle"});
			var tmp5 = m.m("div",{ "class" : "circle-clipper right"},tmp4);
			var tmp6 = m.m("div",{ "class" : "spinner-layer spinner-green-only"},[tmp1,tmp3,tmp5]);
			return [m.m("div",{ "class" : "preloader-wrapper small active", style : { margin : "30px"}},tmp6)];
		} else if(this.reqLoaded == true && this.initialLoad == true) {
			var tmp7 = this.renderDiceImages();
			return [m.m("div",{ style : { paddingBottom : "30px"}},tmp7)];
		} else {
			return [m.m("div",{ "class" : "", style : { paddingBottom : "30px"}},"Choose a dice expression.")];
		}
	}
	,view: function() {
		var _gthis = this;
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = m.m("h3",{ "class" : ""},"Literal Value");
		var tmp1 = m.m("h6",{ "class" : ""},"Where X​ is any positive number, eg: 2 (result is always 2). (Accepted Values [1-8]) - Example '6'");
		var tmp2 = m.m("a",{ "class" : "waves-effect btn-flat", onclick : $bind(this,this.rollDice)},"Click To Roll Dice");
		var tmp3 = m.m("input",{ placeholder : "X", oninput : function(e) {
			_gthis.rollValue = e.target.value;
		}, value : this.rollValue});
		var tmp4 = m.m("div",{ "class" : "input-field"},[tmp3]);
		var tmp5 = this.renderDice();
		var tmp6 = m.m("div",{ },tmp5);
		return [m.m("div",{ "class" : "card center-align"},[tmp,tmp1,tmp2,tmp4,tmp6])];
	}
};
var controllers_OneDieRoll = function() {
	this.reqData = [];
	this.initialLoad = false;
	this.reqLoaded = false;
	this.reqValue = "";
	this.rollValue = "";
};
controllers_OneDieRoll.__name__ = true;
controllers_OneDieRoll.__interfaces__ = [mithril_Mithril];
controllers_OneDieRoll.prototype = {
	rollDice: function() {
		var _gthis = this;
		this.reqLoaded = false;
		this.initialLoad = true;
		m.request({ method : "POST", url : "http://localhost:3000/roll", data : { type : "ONE_DIE_ROLL", payload : { "rollValue" : this.rollValue}}, withCredentials : false}).then(function(res) {
			_gthis.reqLoaded = true;
			_gthis.reqData = res;
			console.log(res);
		})["catch"](function(res1) {
			_gthis.reqLoaded = false;
			_gthis.initialLoad = false;
			js_Browser.alert("Request to server has failed - " + res1);
		});
	}
	,renderDiceImages: function() {
		var tmp = m.m("img",{ src : "../assets/dice-" + Std.string(this.reqData.rollValue) + ".png"});
		var tmp1 = m.m("p",{ },"Die Value: " + Std.string(this.reqData.rollValue));
		return [m.m("div",{ style : { display : "inline-block", padding : "20px"}},[tmp,tmp1])];
	}
	,renderDice: function() {
		if(this.reqLoaded == false && this.initialLoad == true) {
			var tmp = m.m("div",{ "class" : "circle"});
			var tmp1 = m.m("div",{ "class" : "circle-clipper left"},tmp);
			var tmp2 = m.m("div",{ "class" : "circle"});
			var tmp3 = m.m("div",{ "class" : "gap-patch"},tmp2);
			var tmp4 = m.m("div",{ "class" : "circle"});
			var tmp5 = m.m("div",{ "class" : "circle-clipper right"},tmp4);
			var tmp6 = m.m("div",{ "class" : "spinner-layer spinner-green-only"},[tmp1,tmp3,tmp5]);
			return [m.m("div",{ "class" : "preloader-wrapper small active", style : { margin : "30px"}},tmp6)];
		} else if(this.reqLoaded == true && this.initialLoad == true) {
			var tmp7 = this.renderDiceImages();
			return [m.m("div",{ style : { paddingBottom : "30px"}},tmp7)];
		} else {
			return [m.m("div",{ "class" : "", style : { paddingBottom : "30px"}},"Choose a dice expression.")];
		}
	}
	,view: function() {
		var _gthis = this;
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var tmp = m.m("h3",{ "class" : ""},"One Die Roll");
		var tmp1 = m.m("h6",{ "class" : ""},"Roll One Die (Accepted Values: [1-8]) - Example: 'd4'");
		var tmp2 = m.m("a",{ "class" : "waves-effect btn-flat", onclick : $bind(this,this.rollDice)},"Click To Roll Dice");
		var tmp3 = m.m("input",{ placeholder : "dX", oninput : function(e) {
			_gthis.rollValue = e.target.value;
		}, value : this.rollValue});
		var tmp4 = m.m("div",{ "class" : "input-field"},[tmp3]);
		var tmp5 = this.renderDice();
		var tmp6 = m.m("div",{ },tmp5);
		return [m.m("div",{ "class" : "card center-align"},[tmp,tmp1,tmp2,tmp4,tmp6])];
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.alert = function(v) {
	window.alert(js_Boot.__string_rec(v,""));
};
var models_RollType = function() { };
models_RollType.__name__ = true;
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
try {
var __varName = window.m;
(function(m) {
			if (m.m) return;
			m.m = function() {
				try { 
					for(var i=0; i < arguments.length; ++i) if(arguments[i] instanceof List) {
						var list = arguments[i].h; arguments[i] = [];
						while(list != null) { arguments[i].push(l[0]); list = l[1]; }
					}
				} catch(e) {}
				return m.apply(this, arguments);
			}
		})(__varName);
} catch(_) {}
try {
GLOBAL.m = require("mithril");
var __varName1 = GLOBAL.m;
(function(m) {
			if (m.m) return;
			m.m = function() {
				try { 
					for(var i=0; i < arguments.length; ++i) if(arguments[i] instanceof List) {
						var list = arguments[i].h; arguments[i] = [];
						while(list != null) { arguments[i].push(l[0]); list = l[1]; }
					}
				} catch(e) {}
				return m.apply(this, arguments);
			}
		})(__varName1);
} catch(_) {}
models_RollType.rollType = "ONE_DIE_ROLL";
Client.main();
})();

//# sourceMappingURL=main.js.map