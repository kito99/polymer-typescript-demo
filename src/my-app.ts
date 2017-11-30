namespace App {

    const {customElement, property, query, queryAll, observe} = Polymer.decorators;

    // Gesture events like tap and track generated from touch will not be
    // preventable, allowing for better scrolling performance.
    Polymer.setPassiveTouchGestures(true);

    @customElement('my-app')
    class MayApp extends Polymer.Element {

        @property({
            reflectToAttribute: true
        })
        page: string;
        routeData: any;
        subroute: string;
        // This shouldn't be neccessary, but the Analyzer isn't picking up
        // Polymer.Element#rootPath
        rootPath: string;


        @observe('routeData.page')
        _routePageChanged(page) {
            // If no page was found in the route data, page will be an empty string.
            // Default to 'view1' in that case.
            this.page = page || 'view1';

            // Close a non-persistent drawer when the page & route are changed.
            if (!this.$.drawer.persistent) {
                this.$.drawer.close();
            }
        }

        @observe('page')
        _pageChanged(page) {
            // Load page import on demand. Show 404 page if fails
            const resolvedPageUrl = this.resolveUrl('my-' + page + '.html');
            Polymer.importHref(
                resolvedPageUrl,
                null,
                this._showPage404.bind(this),
                true);
        }

        _showPage404() {
            this.page = 'view404';
        }
    }
}
