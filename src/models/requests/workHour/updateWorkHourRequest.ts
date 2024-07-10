import { Identifier } from "typescript";

export default interface UpdateWorkHourRequest {
    accountId: Identifier;
    startHour: string;
    endHour: string;
    studyDate: Date;
}