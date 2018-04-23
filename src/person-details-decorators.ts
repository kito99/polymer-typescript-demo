namespace App {

    const {customElement, property, query, queryAll, observe, computed} = Polymer.decorators;

    @customElement('person-details-decorators')
    export class PersonDetailsDecorators extends Polymer.Element {

        @property()
        person: Person;

        @query("#personAjax")
        personAjax: any;

        @query("#dialog")
        dialog: any;

        people: PeopleResponse;

        _showDetails(event) {
            this.personAjax.generateRequest().completes.then(() => {
                this.person = this.people.result[0];
                this.dialog.open();
            });
        }
    }
}
