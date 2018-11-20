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
define("controllers/maincontroller", ["require", "exports", "controllers/controller", "components/button/button"], function (require, exports, controller_1, button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainController = (function (_super) {
        __extends(MainController, _super);
        function MainController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainController.prototype.setup = function () {
            $("#window").append();
            var profileButton = new button_1.Button("Profile");
            var takeTestButton = new button_1.Button("Take test");
            var resultsButton = new button_1.Button("Results");
            var courseButton = new button_1.Button("My courses");
            var logoutButton = new button_1.Button("Log out");
            profileButton.setOnClick(function (e) {
                window.location.href = "#";
            });
            takeTestButton.setOnClick(function (e) {
                window.location.href = "/views/testpage.html";
            });
            resultsButton.setOnClick(function (e) {
                window.location.href = "/views/results.html";
            });
            courseButton.setOnClick(function (e) {
                window.location.href = "#";
            });
            logoutButton.setOnClick(function (e) {
                window.location.href = "../index.html";
            });
            $("#profile-button").append(profileButton.getView());
            $("#takeTest-button").append(takeTestButton.getView());
            $("#results-button").append(resultsButton.getView());
            $("#course-button").append(courseButton.getView());
            $("#logout-button").append(logoutButton.getView());
        };
        return MainController;
    }(controller_1.Controller));
    exports.MainController = MainController;
});
define("components/user", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var User = (function () {
        function User(firstName, lastName, username, password, role) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.username = username;
            this.password = password;
            this.role = role;
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
            var url = "http://127.0.0.1:8080/servlet/LoginAPIServlet";
            var promise = fetch(url);
            promise.then(function (result) {
                return result.json();
            }).then(function (json) {
                for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                    var user = json_1[_i];
                    this.users.push(new user_1.User(user["firstName"], user["lastName"], user["username"], user["password"], user["role"]));
                }
            }.bind(this));
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
define("controllers/logincontroller", ["require", "exports", "controllers/controller", "components/button/button", "components/userhandler"], function (require, exports, controller_2, button_2, userhandler_1) {
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
            console.log("pop2");
            $.ajax({
                url: "http://127.0.0.1:8080/servlet/services/rest/users",
                success: function (result) {
                    console.log(result + "pop");
                }.bind(this),
                fail: function (xhr, textStatus, errorThrown) {
                    console.log('request failed');
                }
            });
            $.get("/views/login.html").done(function (data) {
                $("#window").append(data);
            });
            $.get("/views/signup.html").done(function (data) {
                $("#window").append(data);
            });
            var loginButton = new button_2.Button("Login");
            var signupButton = new button_2.Button("Sign up");
            var backButton = new button_2.Button("Back");
            loginButton.setOnClick(function (e) {
                _this.userHandler.getPasswordByUsername("test");
                if (_this.userHandler.getPasswordByUsername(document.getElementById("username").value) == document.getElementById("password").value) {
                    window.location.href = "views/main.html";
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
define("components/area", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Area = (function () {
        function Area(area, areas) {
            this.area = area;
            this.areas = areas;
        }
        return Area;
    }());
    exports.Area = Area;
});
define("components/areahandler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AreaHandler = (function () {
        function AreaHandler(callBack) {
            $.ajax({
                url: "/assets/json/questions.json",
            }).done(function (result) {
                this.areas = result;
                callBack();
            }.bind(this));
        }
        AreaHandler.prototype.getAreas = function () {
            return this.areas;
        };
        return AreaHandler;
    }());
    exports.AreaHandler = AreaHandler;
});
define("components/radiobutton/radiobuttons", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RadioButtons = (function () {
        function RadioButtons(name, id) {
            this.name = name;
            this.id = id;
        }
        RadioButtons.prototype.getView = function () {
            var template = "<input type=\"radio\" class=\"mdl-radio__button\" name=\"" + this.name + "\" value=\"" + this.id + "\">";
            return template;
        };
        return RadioButtons;
    }());
    exports.RadioButtons = RadioButtons;
});
define("models/JsonSubQuestion", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonSubQuestion = (function () {
        function JsonSubQuestion() {
        }
        return JsonSubQuestion;
    }());
    exports.JsonSubQuestion = JsonSubQuestion;
});
define("models/JsonMainQuestion", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonMainQuestion = (function () {
        function JsonMainQuestion() {
        }
        return JsonMainQuestion;
    }());
    exports.JsonMainQuestion = JsonMainQuestion;
});
define("components/questions/areas", ["require", "exports", "components/radiobutton/radiobuttons"], function (require, exports, radiobuttons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Areas = (function () {
        function Areas(areas) {
            this.areas = areas;
        }
        Areas.prototype.getView = function () {
            var div = $("<div>");
            for (var i = 0; i < this.areas.length; i++) {
                var table = $("<table>");
                var area = this.areas[i];
                var header = $("<tr>");
                var mainQuestion;
                mainQuestion = "How confident are you in the following areas?";
                header.append($("<td>")
                    .attr("colspan", 6)
                    .html(mainQuestion));
                table.append(header);
                var answers = $("<tr>");
                var answer1 = '<td>' + 'Not confident at all' + '<td>' + 'Slightly confident' + '<td>' + 'Somewhat confident' + '<td>' + 'Fairly confident' + '<td>' + 'Completely confident';
                answers.append($("<td>").html(answer1));
                table.append(answers);
                for (var i2 = 0; i2 < area.areas.length; i2++) {
                    var uniqueName = "uniqueArea_" + i + "_" + i2;
                    var uniqueArea = area.areas[i2];
                    var row = $("<tr>");
                    row.append($("<td>").html(uniqueArea.area));
                    var k = 0;
                    for (var i3 = 0; i3 < 5; i3++) {
                        var controlView;
                        k++;
                        if (k == 5) {
                            k = 0;
                        }
                        var radiobutton = new radiobuttons_1.RadioButtons(uniqueName, i3 + k);
                        controlView = radiobutton.getView();
                        row.append($("<td>").html(controlView));
                    }
                    table.append(row);
                }
                div.append(table);
            }
            return $(div).html();
        };
        return Areas;
    }());
    exports.Areas = Areas;
});
define("controllers/testcontroller", ["require", "exports", "controllers/controller", "components/areahandler", "components/button/button", "components/questions/areas"], function (require, exports, controller_3, areahandler_1, button_3, areas_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestController = (function (_super) {
        __extends(TestController, _super);
        function TestController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestController.prototype.setup = function () {
            var self = this;
            this.areas = new areahandler_1.AreaHandler(function () {
                var retrievedAreas = self.areas.getAreas();
                var area = new areas_1.Areas(retrievedAreas);
                var saveButton = new button_3.Button("Save");
                saveButton.setOnClick(function (e) {
                    window.location.href = "/views/results.html";
                });
                $("#testid").html(area.getView());
                $("#save-button").append(saveButton.getView());
            });
        };
        return TestController;
    }(controller_3.Controller));
    exports.TestController = TestController;
});
define("app", ["require", "exports", "controllers/maincontroller", "controllers/logincontroller", "controllers/testcontroller"], function (require, exports, maincontroller_1, logincontroller_1, testcontroller_1) {
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
            else if (type == "test") {
                console.log("i");
                var controller = new testcontroller_1.TestController();
            }
        };
        return App;
    }());
    exports.App = App;
});
define("components/radiobutton/radioarrays", ["require", "exports", "components/radiobutton/radiobuttons"], function (require, exports, radiobuttons_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RadioArrays = (function () {
        function RadioArrays(name) {
            this.name = name;
        }
        RadioArrays.prototype.getView = function (index) {
            var template = "";
            for (var i = 1; i <= index; i++) {
                template += "<td>" + new radiobuttons_2.RadioButtons(this.name, i).getView() + "</td>";
            }
            return template;
        };
        return RadioArrays;
    }());
    exports.RadioArrays = RadioArrays;
});
//# sourceMappingURL=app.js.map