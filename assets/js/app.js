"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maincontroller_1 = require("./controllers/maincontroller");
var logincontroller_1 = require("./controllers/logincontroller");
var adminCourseController_1 = require("./controllers/adminCourseController");
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.main = function (type) {
        console.log("werkt app");
        if (type == "main") {
            var controller = new maincontroller_1.MainController();
        }
        else if (type == "login") {
            var controller = new logincontroller_1.LoginController();
        }
        else if (type == "courses") {
            console.log("kak");
            var controller = new adminCourseController_1.adminCourseController();
        }
    };
    return App;
}());
exports.App = App;
module.exports = function app(type) {
    var app = new App();
    console.log("12343");
    console.log("index file wertk");
    app.main(type);
};
//# sourceMappingURL=app.js.map