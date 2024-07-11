import { Identifier } from "typescript";

export default interface GetWorkHourResponse {
    id: Identifier;
    accountId: Identifier;
    firstName: string;
    lastName: string;
    email: string;
    startHour: string;
    endHour: string;
    studyDate: Date;
}