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
define("components/user", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var User = (function () {
        function User(firstName, lastName, username, password) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.username = username;
            this.password = password;
        }
        User.prototype.getUsername = function () {
            return this.username;
        };
        User.prototype.getPassword = function () {
            return this.password;
        };
        return User;
    }());
    exports.User = User;
});
define("components/userhandler", ["require", "exports", "components/user"], function (require, exports, user_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserHandler = (function () {
        function UserHandler() {
            this.users = new Array();
            $.ajax({
                url: "http://127.0.0.1:8080/servlet/QuestionsAPIServlet",
                success: function (result) {
                    console.log(result);
                    for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                        var user = result_1[_i];
                        this.users.push(new user_1.User(user["firstName"], user["lastName"], user["username"], user["password"]));
                    }
                }.bind(this),
                fail: function (xhr, textStatus, errorThrown) {
                    console.log('request failed');
                }
            });
        }
        UserHandler.prototype.getPasswordByUsername = function (username) {
            for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
                var user = _a[_i];
                if (user.getUsername() == username) {
                    return user.getPassword();
                }
            }
        };
        return UserHandler;
    }());
    exports.UserHandler = UserHandler;
});
define("controllers/logincontroller", ["require", "exports", "controllers/controller", "components/button/button", "components/userhandler"], function (require, exports, controller_2, button_1, userhandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoginController = (function (_super) {
        __extends(LoginController, _super);
        function LoginController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.userHandler = new userhandler_1.UserHandler();
            return _this;
        }
        LoginController.prototype.setup = function () {
            var _this = this;
            $.get("/views/login.html").done(function (data) {
                $("#window").append(data);
            });
            $.get("/views/signup.html").done(function (data) {
                $("#window").append(data);
            });
            var loginButton = new button_1.Button("Login");
            var signupButton = new button_1.Button("Sign up");
            var backButton = new button_1.Button("Back");
            loginButton.setOnClick(function (e) {
                _this.userHandler.getPasswordByUsername("test");
                if (_this.userHandler.getPasswordByUsername(document.getElementById("username").value) == document.getElementById("password").value) {
                    window.location.href = "menu.html";
                }
                else {
                    $("#errorbox").html("Username and password don't match. Please try again.");
                }
            });
            var onSignup = 0;
            signupButton.setOnClick(function (e) {
                if (onSignup == 0) {
                    $("#login").css("display", "none");
                    $(".login_buttons").css("display", "none");
                    $("#signup").css("display", "block");
                    $("#back-button").css("display", "block");
                }
                else {
                    if (document.getElementById("signup_password").value == document.getElementById("signup_repassword").value) {
                    }
                }
            });
            backButton.setOnClick(function (e) {
                $("#login").css("display", "block");
                $(".login_buttons").css("display", "inline-block");
                $("#signup").css("display", "none");
                $("#back-button").css("display", "none");
            });
            $("#login-button").append(loginButton.getView());
            $("#signup-button").append(signupButton.getView());
            $("#back-button").append(backButton.getView());
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