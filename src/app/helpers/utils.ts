import { Moment } from "moment";

export function momentToDate (date: Moment) {
    return new Date(date.year(), date.month(), date.date())
}