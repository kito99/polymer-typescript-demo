namespace App {

    const {customElement, property, query, queryAll, observe} = Polymer.decorators;

    @customElement('my-view404')
    class MyView404 extends Polymer.Element {
        static get properties() {
            return {
                // This shouldn't be neccessary, but the Analyzer isn't picking up
                // Polymer.Element#rootPath
                rootPath: String,
            };
        }
    }
}