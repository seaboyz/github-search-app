"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// toggle dark theme
var theme = document.querySelector('.theme');
theme.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        theme.innerHTML = 'light <img src="./assets/icon-sun.svg" alt="sun"/>';
    }
    else {
        theme.innerHTML = 'dark <img src="./assets/icon-moon.svg" alt="moon"/>';
    }
});
// fetch data from api
var apiURL = 'https://api.github.com/users/';
var input = document.querySelector('input');
var form = document.querySelector('form');
var card = document.querySelector('.card');
var errorMessage = document.querySelector('.error-message');
function getUserInfo(userName) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(apiURL + userName)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var userName, userInfo, name_1, email, avatar_url, created_at, bio, followers, following, public_repos, location_1, blog, twitter_username, company, login, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                userName = input.value;
                // clear input
                input.value = '';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getUserInfo(userName)];
            case 2:
                userInfo = _a.sent();
                name_1 = userInfo.name, email = userInfo.email, avatar_url = userInfo.avatar_url, created_at = userInfo.created_at, bio = userInfo.bio, followers = userInfo.followers, following = userInfo.following, public_repos = userInfo.public_repos, location_1 = userInfo.location, blog = userInfo.blog, twitter_username = userInfo.twitter_username, company = userInfo.company, login = userInfo.login;
                card.innerHTML = "\n\t\t\t\t\t<div class=\"card__header\">\n\t\t\t\t\t\t<div class=\"avatar\">\n\t\t\t\t\t\t\t<img\n\t\t\t\t\t\t\t\tsrc=\"" + avatar_url + "\n\t\t\t\t\t\t\t\talt=\"avatar\"\n\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<a target=\"_blank\" href=\"https://github.com/" + login + "\" class=\"name\"\n\t\t\t\t\t\t\t>" + (name_1 ? name_1 : login) + "</a\n\t\t\t\t\t\t>\n\t\t\t\t\t\t<a target=\"_blank\" class=\"email " + (email ? '' : 'isDisabled') + "\">" + (email || 'Not available') + "</a>\n\t\t\t\t\t\t<p class=\"join-date\">Joined " + new Date(created_at)
                    .toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })
                    .replace(',', '') + "</p>\n\n\t\t\t\t\t\t<p class=\"bio " + (bio ? '' : 'isDisabled') + "\">\n\t\t\t\t\t\t\t" + (bio || 'Not available') + "\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"card__body\">\n\t\t\t\t\t\t<div class=\"stats\">\n\t\t\t\t\t\t\t<div class=\"repos\">\n\t\t\t\t\t\t\t\t<h3>Repos</h3>\n\t\t\t\t\t\t\t\t<a href=\"https://github.com/" + login + "?tab=repositories\" target=\"_blank\">" + public_repos + "</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"followers\">\n\t\t\t\t\t\t\t\t<h3>Followers</h3>\n\t\t\t\t\t\t\t\t<a href=\"https://github.com/" + login + "?tab=followers\" target=\"_blank\">" + followers + "</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"following\">\n\t\t\t\t\t\t\t\t<h3>Following</h3>\n\t\t\t\t\t\t\t\t<a href=\"https://github.com/" + login + "?tab=followings\" target=\"_blank\">" + following + "</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"card__footer\">\n\t\t\t\t\t\t<div class=\"location\">\n\t\t\t\t\t\t\t<i class=\"fas fa-map-marker-alt\"></i>\n\t\t\t\t\t\t\t<a class=\"" + (location_1 ? '' : 'isDisabled') + "\" >" + (location_1 || 'Not available') + "</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"blog " + (blog ? '' : 'isDisabled') + "\">\n\t\t\t\t\t\t\t<i class=\"fas fa-link\"></i>\n\t\t\t\t\t\t\t<a target=\"_blank\"  href=\"" + (blog || '') + "\">" + (blog || 'Not available') + "</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"twitter " + (twitter_username ? '' : 'isDisabled') + "\">\n\t\t\t\t\t\t\t<i class=\"fab fa-twitter\"></i>\n\t\t\t\t\t\t\t<a href=\"https://twitter.com/" + twitter_username + "\" target=\"_blank\" class=\"isDisabled\">" + (twitter_username || 'Not available') + "</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"company " + (company ? '' : 'isDisabled') + "\"\">\n\t\t\t\t\t\t\t<i class=\"far fa-building\"></i>\n\t\t\t\t\t\t\t<a>" + (company || 'Not available') + "</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t";
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                errorMessage.style.display = 'initial';
                input.addEventListener('focus', function () {
                    errorMessage.style.display = 'none';
                });
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=script.js.map