import React, { useState, useEffect } from 'react';
import {
    useGetStationsByCountryQuery,
    useGetStationsByNameQuery
} from '@/api/radio.api';
import { Station } from '@/models/Radio';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/slices/user.slice';
import { getFavorites, saveFavorites } from '@/utils/localStorageHelpers';
import NoRadioPicture from '@/assets/no-radio.png';
import { useAudio } from '@/contexts/AudioPlayerContext';

const Radio: React.FC = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { selectedStation, setSelectedStation, stopPlayback } = useAudio();

    const [name, setName] = useState<string>('');
    const [searchedName, setSearchedName] = useState<string>('');
    const [favorites, setFavorites] = useState<Station[]>([]);

    useEffect(() => {
        if (currentUser && currentUser.id) {
            setFavorites(getFavorites(currentUser.id));
        }
    }, [currentUser]);

    const { data: topStations, error: topStationsError, isLoading: isTopStationsLoading } = useGetStationsByCountryQuery('Germany');
    const { data: searchResults, error: searchError, isLoading: isSearchLoading } = useGetStationsByNameQuery({ name: searchedName });

    const toggleFavorite = (station: Station) => {
        let updatedFavorites;
        if (favorites.some(fav => fav.stationuuid === station.stationuuid)) {
            updatedFavorites = favorites.filter(fav => fav.stationuuid !== station.stationuuid);
        } else {
            updatedFavorites = [...favorites, station];
        }
        setFavorites(updatedFavorites);
        if (currentUser && currentUser.id) {
            saveFavorites(currentUser.id, updatedFavorites);
        }
    };

    const isFavorite = (station: Station) => {
        return favorites.some(fav => fav.stationuuid === station.stationuuid);
    };

    return (
        <>
            <div className={"flex justify-between"}>
                <input
                    type="text"
                    id="name"
                    placeholder={"Search for a radio station"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-1 mr-4 rounded px-4"
                />
                {
                    name === searchedName && name !== "" ? <button type="submit" onClick={() => {
                            setSearchedName("")
                            setName("")
                        }} className="bg-blue-500 text-white p-2 rounded">Clear</button> :
                        <button type="submit" onClick={() => {
                            if(name.trim() != "") {
                                setSearchedName(name)
                            }}} disabled={name.trim() == ""} className="bg-blue-500 text-white p-2 rounded">Search
                        </button>
                }
            </div>
            <div className="bg-background-secondary h-full w-full rounded overflow-auto p-2">
                <ul style={{ scrollbarWidth: "none" }} className={"list-none p-0 m-0 w-full flex gap-4 overflow-x-auto items-stretch "}>
                    {isSearchLoading && <p>Loading...</p>}
                    {searchError && <p>Error loading search results</p>}
                    {searchResults && (name !== "" && name === searchedName) && (
                        <>
                            {searchResults.filter((station) => station.stationuuid != selectedStation?.stationuuid).map(station => (
                                <li onClick={() => {
                                    if (selectedStation != station) {
                                        setSelectedStation(station);
                                    } else {
                                        stopPlayback();
                                    }
                                }}
                                    className={"rounded-2xl bg-background-default p-4 border-none flex justify-center items-center flex-col cursor-pointer " + (station == selectedStation ? "border-2 border-solid border-amber-50" : "")}
                                    key={station.stationuuid}>
                                    <img src={station.favicon || NoRadioPicture} className={"rounded h-[180px] w-[180px]"}
                                         alt={station.name} />
                                    <span className={"font-semibold pt-2 pb-2 whitespace-nowrap"}>{station.name}</span>
                                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(station); }}>
                                        {isFavorite(station) ? 'Unfavorite' : 'Favorite'}
                                    </button>
                                </li>
                            ))}
                            <li className={"w-[20px] bg-background-default rounded-2xl"}>
                                <div className={"h-[100%] w-[20px] bg-background-default rounded-2xl"}>
                                </div>
                            </li>
                        </>
                    )}

                    {
                        selectedStation != null && (
                            <>
                                <li onClick={() => {
                                    stopPlayback();
                                }}
                                    className={"rounded-2xl bg-background-default p-4 flex justify-center items-center flex-col cursor-pointer border border-primary-700 border-solid"}
                                    key={selectedStation.stationuuid}>
                                    <img src={selectedStation.favicon || NoRadioPicture}
                                         className={"rounded h-[180px] w-[180px]"} alt={selectedStation.name} />
                                    <span className={"font-semibold pt-2 pb-2 break-inside-avoid"}>{selectedStation.name}</span>
                                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(selectedStation); }}>
                                        {isFavorite(selectedStation) ? 'Unfavorite' : 'Favorite'}
                                    </button>
                                </li>

                                <li className={"w-[20px] bg-background-default rounded-2xl"}>
                                    <div className={"h-[100%] w-[20px] bg-background-default rounded-2xl"}>
                                    </div>
                                </li>
                            </>
                        )
                    }

                    {favorites.filter((station) => station.stationuuid != selectedStation?.stationuuid).map(station => (
                        <li onClick={() => {
                            if (selectedStation != station) {
                                setSelectedStation(station);
                            } else {
                                stopPlayback();
                            }
                        }}
                            className={"rounded-2xl bg-background-default p-4 flex justify-center items-center flex-col cursor-pointer " + (station == selectedStation ? "border border-b-white border-solid" : "border-none ")}
                            key={station.stationuuid}>
                            <img src={station.favicon || NoRadioPicture} className={"rounded h-[180px] w-[180px]"}
                                 alt={station.name} />
                            <span className={"font-semibold pt-2 pb-2 break-inside-avoid"}>{station.name}</span>
                            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(station); }}>
                                {isFavorite(station) ? 'Unfavorite' : 'Favorite'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Radio;
