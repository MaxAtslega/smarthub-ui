import { useGetWeatherByCoordinatesQuery } from "@/api/weather.api";
import React, { useEffect, useState } from "react";
import {API_BASE_URL, OPENAI_API_KEY} from "@/constants/constants";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectDisplayStatus } from "@/slices/display.slice";
import { useGetConstantsByUserIdQuery } from "@/api/constants.api";
import { selectCurrentUser } from "@/slices/user.slice";
import quotes from "@/constants/quotes.json";

const generatePrompt = (temperature: number, description: string) => {
    if (temperature < 0) {
        if (description.includes('snow')) {
            return "A painting of a polar bear playing in the snow with snowflakes falling around.";
        } else if (description.includes('clear')) {
            return "A painting of an arctic fox sitting on an ice floe under a clear, starry night sky.";
        } else {
            return "A painting of a penguin family huddled together on a rocky shore under a cloudy sky.";
        }
    } else if (temperature < 20) {
        if (description.includes('rain')) {
            return "A painting of a red panda holding a leaf umbrella while it rains in a lush forest.";
        } else if (description.includes('windy')) {
            return "A painting of a fox with its fur blowing in the wind, standing on a hill with a partly cloudy sky.";
        } else {
            return "A painting of a deer grazing in a sunlit meadow with a few scattered clouds in the sky.";
        }
    } else if (temperature < 30) {
        if (description.includes('humid')) {
            return "A painting of a jaguar resting on a tree branch in a dense, humid jungle.";
        } else if (description.includes('stormy')) {
            return "A painting of a majestic eagle flying above a stormy landscape with lightning in the background.";
        } else {
            return "A painting of a lion basking in the sun on the savannah with a bright blue sky above.";
        }
    } else {
        if (description.includes('sunny')) {
            return "A painting of a camel walking through the hot desert under the blazing sun.";
        } else if (description.includes('dry')) {
            return "A painting of a meerkat standing on a rock, looking out over a dry, arid plain.";
        } else {
            return "A painting of a cheetah resting in the shade of a tree on a partly cloudy day in the savannah.";
        }
    }
};

const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};

function Splash() {
    const [error, setError] = useState<string|null>(null);
    const [date, setDate] = useState(new Date());
    const currentUser = useSelector(selectCurrentUser);
    const { data: constants, isLoading: constantsLoading } = useGetConstantsByUserIdQuery(currentUser?.id ?? 0);
    const [quote, setQuote] = useState(getRandomQuote());

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const [temperature, setTemperature] = useState(0);

    const { data: weatherData, error: weatherError } = useGetWeatherByCoordinatesQuery(
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
            }
        }
    }, [constants]);

    const navigate = useNavigate();
    const isDisplayOn = useSelector(selectDisplayStatus);

    useEffect(() => {
        const intervalId = setInterval(() => setDate(new Date()), 1000 * 20);
        return () => clearInterval(intervalId);
    }, []);

    const [imageData, setImageData] = useState('');

    const fetchImageAsBase64 = async (temperature: number, description:string) => {
        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'dall-e-2',
                    prompt: generatePrompt(temperature, description),
                    n: 1,
                    size: "512x512"
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const imageUrl = data.data[0].url;
            const proxyUrl = `http://${API_BASE_URL}/proxy-image?url=${encodeURIComponent(imageUrl)}`;
            const imageResponse = await fetch(proxyUrl);
            const blob = await imageResponse.blob();

            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                if(base64data) {
                    localStorage.setItem('weatherImage', base64data.toString());
                    localStorage.setItem('weatherImageTimestamp', Date.now().toString());
                    setImageData(base64data.toString());
                }
            };
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching the image.');
        }
    };

    useEffect(() => {
        if (weatherData) {
            const temperature = weatherData.current.temp - 273.15; // Convert from Kelvin to Celsius
            const description = weatherData.current.weather[0].description;

            setTemperature(temperature);

            const storedImage = localStorage.getItem('weatherImage');
            const storedTimestamp = localStorage.getItem('weatherImageTimestamp');
            const currentTime = Date.now();
            const twoHours = 12000000;

            if (storedImage && storedTimestamp && currentTime - parseInt(storedTimestamp, 10) < twoHours) {
                setImageData(storedImage);
            } else {
                fetchImageAsBase64(temperature, description).then();
            }
        }
    }, [weatherData]);

    const dateOptions: Intl.DateTimeFormatOptions = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
    const dateAsFormattedString = dateFormatter.format(date);

    const handlePageClick = () => {
        if (isDisplayOn) {
            navigate(-1);
        }
    };

    if (error || !imageData) {
        return (
            <div className="flex items-center justify-center h-[480px]" onClick={handlePageClick}>
                <span className="text-6xl font-bold">{String(date.getHours()).padStart(2, "0")}:{String(date.getMinutes()).padStart(2, "0")}</span>
            </div>
        );
    } else {
        return (
            <div className="flex justify-between h-[480px]" onClick={handlePageClick}>
                <span className="fixed right-[330px] text-5xl font-bold drop-shadow-4xl">
                    {temperature.toPrecision(4)}°C
                </span>
                <img src={imageData} width="480px" alt="Weather depiction" />
                <div className="fixed bottom-2 left-2 drop-shadow-4xl w-[460px] text-wrap">
                    <span className="block text-2xl font-bold text-wrap drop-shadow-4xl mb-2">
                        {quote.text}
                    </span>
                    <span className="text-xl drop-shadow-4xl">
                        <em>- {quote.from}</em>
                    </span>
                </div>
                <div className="p-2 w-[320px] flex items-center justify-center">
                    <div>
                        <span className="flex justify-center text-4xl font-bold block">
                            {String(date.getHours()).padStart(2, "0")}:{String(date.getMinutes()).padStart(2, "0")}
                        </span>
                        <span className="text-2xl font-medium pt-1 block">
                            {dateAsFormattedString}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Splash;
