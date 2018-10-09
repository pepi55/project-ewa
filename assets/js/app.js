var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("controllers/controller", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = (function () {
        function Controller() {
            this.setup();
        }
        return Controller;
    }());
    exports.Controller = Controller;
});
define("controllers/maincontroller", ["require", "exports", "controllers/controller"], function (require, exports, controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainController = (function (_super) {
        __extends(MainController, _super);
        function MainController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainController.prototype.setup = function () {
        };
        return MainController;
    }(controller_1.Controller));
    exports.MainController = MainController;
});
define("components/button/button", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Button = (function () {
        function Button(text) {
            this.text = text;
        }
        Button.prototype.setOnClick = function (callback) {
            this.onClickCallback = callback;
        };
        Button.prototype.getView = function () {
            var _this = this;
            var template = "<button class=\"mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored\">" + this.text + "</button>";
            return $(template)
                .on("click", function (e) { return _this.onClickCallback(e); });
        };
        return Button;
    }());
    exports.Button = Button;
});
define("controllers/logincontroller", ["require", "exports", "controllers/controller"], function (require, exports, controller_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoginController = (function (_super) {
        __extends(LoginController, _super);
        function LoginController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoginController.prototype.setup = function () {
        };
        return LoginController;
    }(controller_2.Controller));
    exports.LoginController = LoginController;
});
define("app", ["require", "exports", "controllers/maincontroller", "controllers/logincontroller"], function (require, exports, maincontroller_1, logincontroller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
        }
        App.main = function (type) {
            console.log(type);
            if (type == "main") {
                var controller = new maincontroller_1.MainController();
            }
            else if (type == "login") {
                var controller = new logincontroller_1.LoginController();
            }
        };
        return App;
    }());
    exports.App = App;
});
//# sourceMappingURL=app.js.map