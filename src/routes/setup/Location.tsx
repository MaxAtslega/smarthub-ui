import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Navigate, useNavigate} from "react-router-dom";
import { OPEN_WEATHER_API_KEY } from "@/constants/constants";
import {useSelector} from "react-redux";
import {selectCurrentUser, selectUser} from "@/slices/user.slice";
import {useGetConstantsByUserIdQuery, usePostConstantMutation, usePutConstantMutation} from "@/api/constants.api";
import Constant from "@/models/Constant";
import {store} from "@/store"; // Adjust the import path as necessary

function Location() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    if (currentUser == null) {
        return <Navigate to="/login" />;
    }

    const cityInput = useRef<HTMLInputElement | null>(null);
    const countryInput = useRef<HTMLInputElement | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [locationConstant, setLocationConstant] = useState<Constant | null>(null);

    const { data: constants, isLoading: constantsLoading } = useGetConstantsByUserIdQuery(currentUser.id == null ? 0 : currentUser.id);
    const [postConstant] = usePostConstantMutation();
    const [putConstant] = usePutConstantMutation();

    useEffect(() => {
        if (constants) {
            const location = constants.find(c => c.name === 'LOCATION');
            setLocationConstant(location || null);
        }
    }, [constants]);

    const validateInput = async () => {
        const city = cityInput.current?.value.trim();
        const country = countryInput.current?.value.trim();

        if (!city || !country) {
            setError("input")
            return;
        }

        const data = await fetchWeatherData({city, country});
        if (data == null) {
            setError("fetch")
            return;
        }

        if (data.lat && data.lon) {
            await setOrUpdateLocationConstant(data);

            store.dispatch(selectUser(null))
        }
    }


    const fetchWeatherData = async ({ city, country }: { city: string; country: string }) => {
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            if (data.length === 0) {
                throw new Error('No data found for the given city and country');
            }

            return data[0];
        } catch (error: any) {
            setError("fetch");
            setLoading(false);
        }

        return null;
    };

    const setOrUpdateLocationConstant = async (location: {lat: number, lon: number, name: string, country: string, state: string}) => {
        const locationValue = JSON.stringify(location);

        if (!currentUser || !currentUser.id) {
            setError("user");
            setLoading(false);
            return;
        }

        try {
            if (locationConstant) {
                await putConstant({
                    userId: currentUser.id,
                    constantName: 'LOCATION',
                    newValue: locationValue
                }).unwrap();
            } else {
                await postConstant({
                    user_id: currentUser.id,
                    name: 'LOCATION',
                    value: locationValue
                }).unwrap();
            }
        } catch (error: any) {
            setError("post");
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>{t('location.title', 'Location')}</h1>
            <p>{t('location.info', 'We use this information to deliver accurate weather data to you.')}</p>

            {
                error != null && (
                    <div className={"bg-special-red p-2"}>{t('location.error.' + error)}</div>
                )
            }

            <div className={"mt-4"}>
                <label className="block mb-2" htmlFor="city">
                {t('location.cityLabel', 'Type your city:')}
                </label>
                <input
                    id="city"
                    ref={cityInput}
                    className="px-2 py-3"
                    placeholder={t('location.cityPlaceholder', 'Your city')}
                />
            </div>

            <div className={"mt-4"}>
                <label className="block mb-2" htmlFor="country">
                    {t('location.countryLabel', 'Type your country:')}
                </label>
                <input
                    id="country"
                    ref={countryInput}
                    className="px-2 py-3"
                    placeholder={t('location.countryPlaceholder', 'Your country')}
                />
            </div>

            <div className={"mt-4 pb-4"}>
                <button onClick={() => navigate(-1)} className={""}>{t('button.back')}</button>
                <button disabled={loading} onClick={() => validateInput()}
                        className={"ml-4"}>{t('button.next')}</button>
            </div>

        </div>
    )
}

export default Location
