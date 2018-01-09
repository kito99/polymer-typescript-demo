var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var App;
(function (App) {
    const { customElement, property, query, queryAll, observe } = Polymer.decorators;
    Polymer.setPassiveTouchGestures(true);
    let MayApp = class MayApp extends Polymer.Element {
        _routePageChanged(page) {
            this.page = page || 'view1';
            const drawer = this.$.drawer;
            if (!(drawer).persistent) {
                drawer.close();
            }
        }
        _pageChanged(page) {
            const resolvedPageUrl = this.resolveUrl('my-' + page + '.html');
            Polymer.importHref(resolvedPageUrl, null, this._showPage404.bind(this), true);
        }
        _showPage404() {
            this.page = 'view404';
        }
    };
    __decorate([
        property({
            reflectToAttribute: true
        }),
        __metadata("design:type", String)
    ], MayApp.prototype, "page", void 0);
    __decorate([
        observe('routeData.page'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MayApp.prototype, "_routePageChanged", null);
    __decorate([
        observe('page'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MayApp.prototype, "_pageChanged", null);
    MayApp = __decorate([
        customElement('my-app')
    ], MayApp);
})(App || (App = {}));
//# sourceMappingURL=my-app.js.map