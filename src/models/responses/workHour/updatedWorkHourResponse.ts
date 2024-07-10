import { Identifier } from "typescript";

export default interface UpdatedWorkHourResponse {
    id: Identifier;
    accountId: Identifier;
    startHour: string;
    endHour: string;
    studyDate: Date;
}