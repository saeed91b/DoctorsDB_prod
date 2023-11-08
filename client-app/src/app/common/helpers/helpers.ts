import { Doctor } from "../../models/doctor";
import { Rating } from "../../models/rating";

function doctorsByName(doctors: Doctor[]) {
    return doctors.slice().sort((a, b) => {
        const name1 = a.lastName.toUpperCase();
        const name2 = b.lastName.toUpperCase();

        if (name1 < name2) {
            return -1;
        }

        if (name1 > name2) {
            return 1;
        }

        return 0;
    })
}

function groupedDoctors(doctors: Doctor[]) {
    return Object.entries(
        doctorsByName(doctors).reduce((doctors, doctor) => {
            const category = doctor.category;
            doctors[category] = doctors[category] ? [...doctors[category], doctor] : [doctor];
            return doctors;
        }, {} as { [key: string]: Doctor[] })
    )
}

function computeAverageRating(ratings: Rating[]) {
    var sum = 0;

    for(var i = 0; i < ratings.length; i++){
        sum += ratings[i].score;
    }

    return sum / ratings.length;
}

const sleep = (delay: number) => {
    return new Promise((resolve) =>
        setTimeout(resolve, delay)
    )
}

const helpers = {doctorsByName, groupedDoctors, computeAverageRating, sleep};
export default helpers;