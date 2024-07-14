import { Identifier } from "typescript";

export default interface UpdateWorkHourRequest {
    id: string;
    accountId: Identifier;
    startHour: string;
    endHour: string;
    studyDate: Date;
}