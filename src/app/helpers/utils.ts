import { Moment } from "moment";

export function momentToDate (date: Moment) {
    return new Date(date.year(), date.month(), date.date())
}

export function getPetCategoryName(petCategory: number): string {
    switch(petCategory) {
        case 1:
            return 'Dog';
        case 2:
            return 'Cat';
        case 3:
            return 'Bird';
        case 4:
            return 'Reptile';
        case 5:
            return 'Fish';
    }

    return 'No Category';
}