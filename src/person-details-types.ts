namespace App {

    const {customElement, property, query, queryAll, observe, computed} = Polymer.decorators;

    @customElement('person-details-types')
    export class PersonDetailsTypes extends Polymer.Element {

        @property()
        person: Person;

        @query("#personAjax")
        personAjax: IronAjaxElement;

        @query("#dialog")
        dialog: PaperDialogElement;

        people: PeopleResponse;

        _showDetails(event) {
            this.personAjax.generateRequest().completes.then(() => {
                this.person = this.people.result[0];
                this.dialog.open();
            });
        }
    }
}
