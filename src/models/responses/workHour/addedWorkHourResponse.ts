import { Identifier } from "typescript";

export default interface AddedWorkHourResponse {
    id: Identifier;
    accountId: Identifier;
    startHour: string;
    endHour: string;
    studyDate: Date;
}