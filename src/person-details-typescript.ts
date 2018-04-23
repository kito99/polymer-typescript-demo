namespace App {

    export class PersonDetailsTypeScript extends Polymer.Element {

        static get is() {
            return 'person-details-typescript';
        }

        static get properties() {
            return {
                person: Object
            };
        }

        person: Person;
        people: PeopleResponse;
        personAjax: any;
        dialog: any;

        ready() {
            super.ready();
            this.personAjax = this.$.personAjax;
            this.dialog = this.$.dialog;
        }

        _showDetails(event) {
            this.personAjax.generateRequest().completes.then(() => {
                this.person = this.people.result[0];
                this.dialog.open();
            });
        }
    }

    customElements.define(PersonDetailsTypeScript.is, PersonDetailsTypeScript);
}