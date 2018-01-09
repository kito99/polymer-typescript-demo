namespace App {

    const {customElement, property, query, queryAll, observe, computed} = Polymer.decorators;

    // Gesture events like tap and track generated from touch will not be
    // preventable, allowing for better scrolling performance.
    Polymer.setPassiveTouchGestures(true);

    @customElement('my-app')
    export class MyApp extends Polymer.Element {

        @property({
            reflectToAttribute: true
        })
        page: string;
        routeData: any;
        subroute: string;

        // Example of referring to another element in this project
        @query('my-view1')
        view1: MyView1;

        @query('#drawer')
        drawer: any; // TODO: Add type when available

        @observe('routeData.page')
        _routePageChanged(page) {
            // If no page was found in the route data, page will be an empty string.
            // Default to 'view1' in that case.
            this.page = page || 'view1';

            // Close a non-persistent drawer when the page & route are changed.
            if (!(this.drawer).persistent) {
                this.drawer.close();
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
