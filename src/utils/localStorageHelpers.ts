import {Station} from "@/models/Radio";

export const getFavorites = (id: number): Station[] => {
    const favorites = localStorage.getItem(`favorites_${id}`);
    return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (id: number, stations: Station[]) => {
    localStorage.setItem(`favorites_${id}`, JSON.stringify(stations));
};
