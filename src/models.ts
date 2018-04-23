namespace App {

    export class Address {
        city: string;
        country: string;
        phone: string;
        state: string;
        street: string;
        zip: string;
    }

    export class Person {
        firstName: string;
        lastName: string;
        address: Address;
    }

    export interface PeopleResponse {
        result: Person[];
    }
}


