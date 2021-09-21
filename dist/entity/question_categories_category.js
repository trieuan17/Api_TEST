"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.question_categories_category = void 0;
var typeorm_1 = require("typeorm");
var category_1 = require("./category");
var question_1 = require("./question");
var question_categories_category = /** @class */ (function () {
    function question_categories_category() {
    }
    var _a;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], question_categories_category.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", Number)
    ], question_categories_category.prototype, "categoryID", void 0);
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", Number)
    ], question_categories_category.prototype, "questionID", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return category_1.Category; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", typeof (_a = typeof category_1.Category !== "undefined" && category_1.Category) === "function" ? _a : Object)
    ], question_categories_category.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return question_1.Question; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", question_1.Question)
    ], question_categories_category.prototype, "question", void 0);
    question_categories_category = __decorate([
        (0, typeorm_1.Entity)()
    ], question_categories_category);
    return question_categories_category;
}());
exports.question_categories_category = question_categories_category;
//# sourceMappingURL=question_categories_category.js.map