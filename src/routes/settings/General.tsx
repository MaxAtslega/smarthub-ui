import {webSocketService} from "@/services/webSocketService";
import {useRebootMutation, useShutdownMutation} from "@/api/system.api";
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/slices/user.slice";
import Constant from "@/models/Constant";
import {useGetConstantsByUserIdQuery, usePostConstantMutation, usePutConstantMutation} from "@/api/constants.api";
import {OPEN_WEATHER_API_KEY} from "@/constants/constants";
import keyboardLayouts from "@/constants/keyboardLayouts";
import {useUpdateUserMutation} from "@/api/users.api";
import User from "@/models/User";

function General() {
    const [shutdownSystem] = useShutdownMutation();
    const [rebootSystem] = useRebootMutation();
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

    const [updateUser, {isLoading, error: errorUser}] = useUpdateUserMutation();

    const handleChangeLanguage = (event: any) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
        let user: User = {
            birthday: currentUser.birthday,
            theme: currentUser.theme,
            username: currentUser.username,
            id: currentUser.id,
            language: selectedLanguage,
            keyboard: currentUser.keyboard
        }
        updateUser({user: user});
    };

    const handleChangeKeyboard = (event: any) => {
        const selectedLayout = event.target.value;
        let user: User = {
            birthday: currentUser.birthday,
            theme: currentUser.theme,
            username: currentUser.username,
            id: currentUser.id,
            language: currentUser.language,
            keyboard: selectedLayout
        }
        updateUser({user: user});
    };

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
            setLoading(false);

            navigate("/app/dashboard");
        }
    }

    const setOrUpdateLocationConstant = async (location: {lat: number, lon: number, name: string, country: string, state: string}) => {
        const locationValue = JSON.stringify(location);

        if (!currentUser || !currentUser.id) {
            setError("user");
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
        }
    };


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
        }

        return null;
    };
    return (
        <div className={"bg-background-secondary h-full w-full rounded overflow-auto p-2"}>
            <div>
                <h1>General</h1>
                <p>General settings for your device and profile.</p>
                <div className={"mb-4"}>
                    <span className={"block pb-2"}>Controls</span>
                    <button className={"mb-4 mr-4"} onClick={async () => {
                        await rebootSystem().unwrap();
                    }}>REBOOT
                    </button>

                    <button className={"mb-4 mr-4"} onClick={async () => {
                        await shutdownSystem().unwrap();
                    }}>SHUTDOWN
                    </button>
                </div>

                <div className="language-setup mb-4">
                    <label className={"block mb-2"} htmlFor="language">Language</label>
                    <select defaultValue={currentUser.language} className={"w-full px-2 py-3 bg-background-third"}
                            id="language"
                            onChange={handleChangeLanguage}>
                        <option value="de">German (Standard)</option>
                        <option value="de-CH">German (Switzerland)</option>
                        <option value="de-AT">German (Austria)</option>
                        <option value="de-LI">German (Liechtenstein)</option>
                        <option value="de-LU">German (Luxembourg)</option>
                        <option value="en-US">English (United States)</option>
                        <option value="en-GB">English (United Kingdom)</option>
                        <option value="en-AU">English (Australia)</option>
                        <option value="es">Spanish (Spain)</option>
                        <option value="es-MX">Spanish (Mexico)</option>
                    </select>
                </div>

                <div className="keyboard-setup pb-8">
                    <label className={"block mb-2"} htmlFor="language">Keyboard layout</label>
                    <select defaultValue={currentUser.keyboard} className={"w-full px-2 py-3 bg-background-third"}
                            onChange={handleChangeKeyboard} id="language">
                        {Object.keys(keyboardLayouts).map((key: string) => (
                            <option key={key} value={key}>
                                {(keyboardLayouts as { [index: string]: any })[key]}
                            </option>
                        ))}
                    </select>
                </div>

                <span>{t('location.title', 'Location')}</span>
                {
                    error != null && (
                        <div className={"bg-special-red p-2"}>{t('location.error.' + error)}</div>
                    )
                }

                <div className={"mt-4"}>
                    <label className="block mb-2" htmlFor="city">
                        {t('setup.cityLabel', 'Your city:')}
                    </label>
                    <input
                        id="city"
                        ref={cityInput}
                        className="px-2 py-3 bg-background-third"
                        placeholder={t('location.cityPlaceholder', 'Your city')}
                    />
                </div>

                <div className={"mt-4"}>
                    <label className="block mb-2" htmlFor="country">
                        {t('setup.countryLabel', 'Your country:')}
                    </label>
                    <input
                        id="country"
                        ref={countryInput}
                        className="px-2 py-3 bg-background-third"
                        placeholder={t('location.countryPlaceholder', 'Your country')}
                    />
                </div>

                <div className={"mt-4 pb-4"}>
                    <button disabled={loading} onClick={() => validateInput()}
                            className={""}>{t('button.save', "Save")}</button>
                </div>
            </div>
        </div>
    )
}

export default General
