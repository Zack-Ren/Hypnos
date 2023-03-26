/**
 * Interface representing the core information used in Schemas that represent persons.
 */
export interface Person {
    id: string,
    username: string,
    password: string,
    name: string,
    phoneNumber: number,
    email: string,
    picture?: string,
}