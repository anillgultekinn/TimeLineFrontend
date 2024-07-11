import { Identifier } from "typescript";

export default interface GetListWorkHourResponse {
    id: Identifier;
    accountId: Identifier;
    firstName: string;
    lastName: string;
    email: string;
    startHour: string;
    endHour: string;
    studyDate: Date;
}