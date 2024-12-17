import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import bow from "@/assets/weather/bow.png";
import { FiSunrise, FiSunset } from "react-icons/fi";
import {
    FaCloudRain,
    FaWind,
    FaTint,
    FaThermometerThreeQuarters,
    FaEye,
    FaCloudSun,
    FaSun,
    FaSnowflake,
    FaSmog,
    FaCloud, FaBolt
} from "react-icons/fa";
import { useGetConstantsByUserIdQuery } from "@/api/constants.api";
import { selectCurrentUser } from "@/slices/user.slice";
import { useGetForecastByCoordinatesQuery, useGetWeatherByCoordinatesQuery } from "@/api/weather.api";

const Weather = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [city, setCity] = useState<string | null>(null);

    const { data: constants } = useGetConstantsByUserIdQuery(currentUser?.id ?? 0);

    const { data: weatherData } = useGetWeatherByCoordinatesQuery(
        lat && lon ? { lat, lon } : { lat: "33.44", lon: "-94.04" },
        {
            skip: lat === null || lon === null
        }
    );

    const { data: forecastData } = useGetForecastByCoordinatesQuery(
        lat && lon ? { lat, lon } : { lat: "33.44", lon: "-94.04" },
        {
            skip: lat === null || lon === null
        }
    );

    useEffect(() => {
        if (constants) {
            const locationConstant = constants.find(c => c.name === 'LOCATION');
            if (locationConstant) {
                const location = JSON.parse(locationConstant.value);
                setLat(location.lat);
                setLon(location.lon);
                setCity((location.name + ", " + location.country));
            }
        }
    }, [constants]);

    if (!weatherData || !forecastData){
        return (
            <div className="flex justify-between bg-background-secondary p-4 h-full">
                Loading...
            </div>
        );
    }


    const stforecast = weatherData.current.weather[0].description;
    const temperaturelocation = `${Math.round(weatherData.current.temp - 273.15)}°C`;
    const feelslike = `Feels like ${Math.round(weatherData.current.feels_like - 273.15)}°C`;
    const sunriseTime = new Date(weatherData.current.sunrise * 1000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(weatherData.current.sunset * 1000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const windspeed = `${weatherData.current.wind_speed} km/h`;
    const dewpoint = `${Math.round(weatherData.current.dew_point - 273.15)} °C`;
    const uvindex = weatherData.current.uvi;
    const humidty = `${weatherData.current.humidity}%`;
    const pressure = `${weatherData.current.pressure} hPA`;
    const visibility = `${weatherData.current.visibility / 1000} km`;

    const forecastIntervals = forecastData.list.slice(0, 3).map((interval: any, index: any) => ({
        time: new Date(interval.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: `${Math.round(interval.main.temp - 273.15)} °C`,
        weather: interval.weather[0].description,
        icon: interval.weather[0].icon
    }));

    const getWeatherIcon = (icon: string) => {
        switch (icon) {
            case '01d':
            case '01n':
                return <FaSun className="text-yellow-500" />;
            case '02d':
            case '02n':
                return <FaCloudSun className="text-yellow-500" />;
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                return <FaCloud className="text-gray-500" />;
            case '09d':
            case '09n':
                return <FaCloudRain className="text-gray-500" />;
            case '10d':
            case '10n':
                return <FaCloudSun className="text-blue-500" />;
            case '11d':
            case '11n':
                return <FaBolt className="text-yellow-500" />;
            case '13d':
            case '13n':
                return <FaSnowflake className="text-blue-500" />;
            case '50d':
            case '50n':
                return <FaSmog className="text-gray-500" />;
            default:
                return <FaCloud className="text-gray-500" />;
        }
    };

    return (
            <div className="flex justify-between bg-background-secondary p-4 h-full rounded">
                <div className="w-[60%]">
                    <div className="flex flex-col h-full">
                        <div className="pb-2 border-solid border-0 border-b border-b-background-primary">
                            <span className="font-black">{city}</span>
                        </div>
                        <div className="pt-2">
                            <span className="st-forecast font-black">{stforecast}</span>
                        </div>
                        <div className="pt-5 mt-auto">
                            <div className="flex justify-between items-end">
                                <div className="pt-1">
                                    <span className="block font-bold text-2xl">{temperaturelocation}</span>
                                    <span className="font-bold">{feelslike}</span>
                                </div>
                                <div>
                                    <div className="w-full">
                                        <img className="ml-4 w-[120px] h-[30px] mt-3" src={bow} alt="bow"></img>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <FiSunrise className="text-[#FF7E5F]"/>
                                            <span className="pl-2">{sunriseTime}</span>
                                        </div>
                                        <div className="ml-5">
                                            <FiSunset className="text-[#597287]"/>
                                            <span className="pl-2">{sunsetTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-between">
                            <div className="w-full">
                                <div
                                    className="pb-1 flex justify-between border-solid border-0 border-b border-b-background-primary">
                                    <div>
                                        <FaWind className="mr-2 text-blue-500"/>
                                        <span>Wind</span>
                                    </div>
                                    <span>{windspeed}</span>
                                </div>
                                <div
                                    className="pt-3 pb-1 flex justify-between border-solid border-0 border-b border-b-background-primary">
                                    <div>
                                        <FaTint className="mr-2 text-blue-500"/>
                                        <span>Dew Point</span>
                                    </div>
                                    <span>{dewpoint}</span>
                                </div>
                                <div
                                    className="pt-3 pb-1 flex justify-between border-solid border-0 border-b border-b-background-primary">
                                    <div>
                                        <FaThermometerThreeQuarters className="mr-2 text-yellow-500"/>
                                        <span>UV-Index</span>
                                    </div>
                                    <span>{uvindex}/10</span>
                                </div>
                            </div>

                            <div className="pl-5 w-full">
                                <div
                                    className="pb-1 flex justify-between border-solid border-0 border-b border-b-background-primary">
                                    <div>
                                        <FaTint className="mr-2 text-blue-500"/>
                                        <span>Humidty</span>
                                    </div>
                                    <span>{humidty}</span>
                                </div>
                                <div
                                    className="pt-3 pb-1 flex justify-between border-solid border-0 border-b border-b-background-primary">
                                    <div>
                                        <FaCloudSun className="mr-2 text-red-500"/>
                                        <span>Pressure</span>
                                    </div>
                                    <span>{pressure}</span>
                                </div>
                                <div
                                    className="pt-3 pb-1 flex justify-between border-solid border-0 border-b border-b-background-primary">
                                    <div>
                                        <FaEye className="mr-2 text-green-500"/>
                                        <span>Visibility</span>
                                    </div>
                                    <span>{visibility}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[50%] pl-4 flex flex-col">
                    <div className="text-[160px] w-full flex justify-center">
                        {getWeatherIcon(weatherData.current.weather[0].icon)}
                    </div>
                    <div className="w-full flex mt-auto">
                        {forecastIntervals.map((interval: any, index: any) => (
                            <div key={index} className="text-center w-full flex flex-col items-center">
                                <span className="mb-2">{interval.time}</span>
                                <div className="mb-2 text-5xl">
                                    {getWeatherIcon(interval.icon)}
                                </div>
                                <span>{interval.temperature}</span>
                                <span>{interval.weather}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    );
};

export default Weather;
