import { Identifier } from "typescript";

export default interface GetListWorkHourResponse {
    id: Identifier;
    accountId: Identifier;
    startHour: string;
    endHour: string;
    studyDate: Date;
}