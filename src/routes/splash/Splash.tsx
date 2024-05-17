import {useGetWeatherByCoordinatesQuery} from "@/api/weather.api";
import React, {useEffect, useState} from "react";
import {OPENAI_API_KEY} from "@/constants/constants";


const generatePrompt = (temperature: number, description: string): string => {
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

function Splash() {
    const city = "Lage (Lippe)";
    const [error, setError] = useState<null | string>(null);
    const [date, setDate] = useState(new Date());
    const { data: weatherData, error: weatherError } = useGetWeatherByCoordinatesQuery({
        lat: "33.44",
        lon: "-94.04"
    });

    useEffect(() => {
        setInterval(() => setDate(new Date()), 1000*20)
    })

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async (temperature: number, description: string) => {
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

                // Save to localStorage
                localStorage.setItem('weatherImage', imageUrl);
                localStorage.setItem('weatherImageTimestamp', Date.now().toString());

                setImageUrl(imageUrl);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('An error occurred while fetching the image.');
            }
        };

        if (weatherData) {
            const temperature = weatherData.current.temp - 273.15; // Convert from Kelvin to Celsius
            const description = weatherData.current.weather[0].description;

            // Check localStorage for an existing image and its timestamp
            const storedImage = localStorage.getItem('weatherImage');
            const storedTimestamp = localStorage.getItem('weatherImageTimestamp');
            const currentTime = Date.now();
            const twoHours = 2 * 60 * 60 * 1000;

            if (storedImage && storedTimestamp && currentTime - parseInt(storedTimestamp, 10) < twoHours) {
                setImageUrl(storedImage);
            } else {
                fetchImage(temperature, description).then();
            }
        }
    }, [weatherData]);

    const dateOptions: Intl.DateTimeFormatOptions = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };

    const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
    const dateAsFormattedString = dateFormatter.format(date);

    console.log(dateAsFormattedString) // "June 1, 2019"


    if (error != null || imageUrl == null) {
        return (
            <div className={"flex items-center justify-center h-[480px]"}>
                <span className={"text-6xl font-bold"}>{date.getHours()}:{date.getMinutes()}</span>
            </div>
        );
    } else {
        return (
            <div className={"flex justify-between h-[480px]"}>
                <img src={imageUrl} alt="Generated by OpenAI" width={"480px"}/>
                <div className={"p-2 w-[320px] flex items-center justify-center"}>
                    <div>
                        <span className={"flex justify-center text-4xl font-bold block"}>{date.getHours()}:{date.getMinutes()}</span>
                        <span
                            className={"text-2xl font-medium pt-1 block"}>{dateAsFormattedString}</span>
                    </div>
                </div>
            </div>
        )
    }

}

export default Splash
