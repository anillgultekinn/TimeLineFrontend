import { Identifier } from 'typescript';
export default interface GetAccountResponse {
    id: Identifier;
    firstName: string;
    lastName: string;
    email: string;
}