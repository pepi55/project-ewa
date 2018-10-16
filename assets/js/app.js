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
            var myCoursesButton = new button_1.Button("My courses");
            var resultsButton = new button_1.Button("Results");
            var usersButton = new button_1.Button("Users");
            var profileButton = new button_1.Button("Profile");
            var takeTestButton = new button_1.Button("Take test");
            var logOutButton = new button_1.Button("Log out");
            myCoursesButton.setOnClick(function (e) {
                window.location.href = "#";
            });
            resultsButton.setOnClick(function (e) {
                window.location.href = "#";
            });
            usersButton.setOnClick(function (e) {
                window.location.href = "#";
            });
            profileButton.setOnClick(function (e) {
                window.location.href = "#";
            });
            takeTestButton.setOnClick(function (e) {
                window.location.href = "testpage.html";
            });
            logOutButton.setOnClick(function (e) {
                window.location.href = "/index.html";
            });
            $("#mycourses-button").append(myCoursesButton.getView());
            $("#results-button").append(resultsButton.getView());
            $("#profile-button").append(profileButton.getView());
            $("#users-button").append(usersButton.getView());
            $("#taketest-button").append(takeTestButton.getView());
            $("#logout-button").append(logOutButton.getView());
        };
        return MainController;
    }(controller_1.Controller));
    exports.MainController = MainController;
});
define("components/user", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var User = (function () {
        function User(email, username, password) {
            this.email = email;
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
                url: "assets/json/users.json"
            }).done(function (result) {
                for (var _i = 0, _a = result["users"]; _i < _a.length; _i++) {
                    var user = _a[_i];
                    this.users.push(new user_1.User(user["email"], user["username"], user["password"]));
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
define("components/question", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Question = (function () {
        function Question(question, type, answer) {
            this.answer = new Array();
            this.question = question;
            this.answer = answer;
            this.type = type;
        }
        Question.prototype.getQuestion = function () {
            return this.question;
        };
        Question.prototype.getType = function () {
            return this.type;
        };
        Question.prototype.getAmountOfAnswers = function () {
            return this.answer.length;
        };
        Question.prototype.getAnswer = function (index) {
            return this.answer[index];
        };
        return Question;
    }());
    exports.Question = Question;
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
define("components/radiobutton/checkbox", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CheckBox = (function () {
        function CheckBox(name, id) {
            this.name = name;
            this.id = id;
        }
        CheckBox.prototype.getView = function () {
            var template = "<input type=\"checkbox\" class=\"mdl-radio__button\" name=\"" + this.name + "\" value=\"" + this.id + "\">";
            return template;
        };
        return CheckBox;
    }());
    exports.CheckBox = CheckBox;
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
define("components/questions/questions", ["require", "exports", "components/radiobutton/radiobuttons", "components/radiobutton/checkbox"], function (require, exports, radiobuttons_1, checkbox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Questions = (function () {
        function Questions(questions) {
            this.questions = questions;
        }
        Questions.prototype.getView = function () {
            var div = $("<div>");
            for (var i = 0; i < this.questions.length; i++) {
                var table = $("<table>");
                var question = this.questions[i];
                var header = $("<tr>");
                header.append($("<td>")
                    .attr("colspan", question.answers.length + 1)
                    .html(question.mainQuestion));
                table.append(header);
                var answers = $("<tr>");
                answers.append($("<td>"));
                for (var i2 = 0; i2 < question.answers.length; i2++) {
                    var answer = question.answers[i2];
                    answers.append($("<td>").html(answer));
                }
                table.append(answers);
                for (var i2 = 0; i2 < question.subQuestions.length; i2++) {
                    var uniqueName = "subQuestion_" + i + "_" + i2;
                    var subQuestion = question.subQuestions[i2];
                    var row = $("<tr>");
                    row.append($("<td>").html(subQuestion.question));
                    for (var i3 = 0; i3 < question.answers.length; i3++) {
                        var controlView;
                        switch (subQuestion.type) {
                            case "radio":
                                var radiobutton = new radiobuttons_1.RadioButtons(uniqueName, i3);
                                controlView = radiobutton.getView();
                                break;
                            case "checkbox":
                                var checkbox = new checkbox_1.CheckBox(uniqueName, i3);
                                controlView = checkbox.getView();
                                break;
                            default:
                                controlView = "Unknown";
                                break;
                        }
                        row.append($("<td>").html(controlView));
                    }
                    table.append(row);
                }
                div.append(table);
            }
            return $(div).html();
        };
        return Questions;
    }());
    exports.Questions = Questions;
});
define("components/questionhandler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QuestionHandler = (function () {
        function QuestionHandler(callBack) {
            $.ajax({
                url: "/assets/json/questions.json",
            }).done(function (result) {
                this.mainQuestions = result;
                callBack();
            }.bind(this));
        }
        QuestionHandler.prototype.getMainQuestions = function () {
            return this.mainQuestions;
        };
        return QuestionHandler;
    }());
    exports.QuestionHandler = QuestionHandler;
});
define("controllers/testcontroller", ["require", "exports", "controllers/controller", "components/questions/questions", "components/questionhandler"], function (require, exports, controller_3, questions_1, questionhandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestController = (function (_super) {
        __extends(TestController, _super);
        function TestController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestController.prototype.setup = function () {
            var self = this;
            this.questions = new questionhandler_1.QuestionHandler(function () {
                var retrievedQuestions = self.questions.getMainQuestions();
                var question = new questions_1.Questions(retrievedQuestions);
                $("#testid").html(question.getView());
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
define("components/radiobutton/radioarrays", ["require", "exports", "components/radiobutton/radiobuttons", "components/radiobutton/checkbox"], function (require, exports, radiobuttons_2, checkbox_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RadioArrays = (function () {
        function RadioArrays(name, type) {
            this.name = name;
            this.type = type;
        }
        RadioArrays.prototype.getView = function (index) {
            var template = "";
            for (var i = 1; i <= index; i++) {
                if (this.type == "radio") {
                    template += "<td>" + new radiobuttons_2.RadioButtons(this.name, i).getView() + "</td>";
                }
                else {
                    template += "<td>" + new checkbox_2.CheckBox(this.name, i).getView() + "</td>";
                }
            }
            return template;
        };
        return RadioArrays;
    }());
    exports.RadioArrays = RadioArrays;
});
//# sourceMappingURL=app.js.map