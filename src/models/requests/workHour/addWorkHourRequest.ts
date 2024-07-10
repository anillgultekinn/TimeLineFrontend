import { Identifier } from "typescript";

export default interface AddWorkHourRequest {
    accountId: Identifier;
    startHour: string;
    endHour: string;
    studyDate: Date;
}