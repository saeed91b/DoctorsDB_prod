import { Appointment } from "./appointment";
import { Rating } from "./rating";

export interface Doctor {
    id: string;
    firstName: string;
    lastName: string;
    category: string;
    city: string;
    address: string;
    phone: string;
    description: string;
    numberOfFavorites: number;
    isFavorite: boolean;
    ratings: Rating[];
    averageRating: number;
    currentRating?: number;
    appointment?: Appointment;
  }