"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maincontroller_1 = require("./controllers/maincontroller");
var logincontroller_1 = require("./controllers/logincontroller");
var adminCourseController_1 = require("./controllers/adminCourseController");
var userCourseController_1 = require("./controllers/userCourseController");
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.main = function (type) {
        if (type == "main") {
            var controller = new maincontroller_1.MainController();
        }
        else if (type == "login") {
            var controller = new logincontroller_1.LoginController();
        }
        else if (type == "adminCourses") {
            var controller = new adminCourseController_1.adminCourseController();
        }
        else if (type == "userCourses") {
            var controller = new userCourseController_1.userCourseController();
        }
    };
    return App;
}());
exports.App = App;
module.exports = function app(type) {
    console.log("rerouting.....");
    var app = new App();
    app.main(type);
};
//# sourceMappingURL=app.js.map