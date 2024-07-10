import { Identifier } from "typescript";

export default interface GetWorkHourResponse {
    id: Identifier;
    accountId: Identifier;
    startHour: string;
    endHour: string;
    studyDate: Date;
}