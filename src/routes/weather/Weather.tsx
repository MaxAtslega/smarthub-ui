import React from "react";

import bow from "@/assets/weather/bow.png";
import {FiSunrise, FiSunset} from "react-icons/fi";
import {FaCloudRain, FaWind} from "react-icons/fa";

//Replace later with API
const city = "Lage, DE"
const stforecast = "Bewölkt"
const rainprobability = "1% das es gegen 09:00 Uhr regnet"
const temperaturelocation = "3°"
const feelslike = "Fühlt sich an wie 10 °C"
const am = "06:39am"
const pm = "08:46pm"
const forecastmorning = "10 °C"
const forecastafternoon = "11 °C"
const forecastevening = "8 °C"
const forecastovernight = "3 °C"
const windspeed = "24km/h"
const dewpoint = "0 °C"
const uvindex = "4"
const humidty = "61%"
const pressure = "1.001"
const visibility = "22"

function Weather() {
    return (
        <div className="flex justify-between bg-background-secondary p-4 h-full">
            <div className={"w-[50%]"}>
                <div className={"flex flex-col h-full"}>
                    <div className="pb-2 border-solid border-0 border-b border-b-background-primary">
                        <span className="font-black">{city}</span>
                    </div>
                    <div className={"pt-2"}>
                        <span className="st-forecast font-black">{stforecast}</span>
                        <div className="text-sm opacity-60">{rainprobability}</div>
                    </div>

                    <div className={"pt-5 mt-auto"}>
                        <div className={"flex justify-between items-end"}>
                            <div className={"pt-1"}>
                                <span className="block font-bold text-2xl">{temperaturelocation}</span>
                                <span className="font-bold">{feelslike}</span>
                            </div>
                            <div className={""}>
                                <div className={"w-full"}>
                                    <img className="ml-7 w-[120px] h-[30px] mt-3" src={bow}></img>
                                </div>
                                <div className={"flex justify-between w-full"}>
                                <div>
                                        <FiSunrise className={"text-[#]"}/>
                                        <span className={"pl-2"}>{am}</span>
                                    </div>
                                    <div className={"ml-5"}>
                                        <FiSunset/>
                                        <span className={"pl-2"}>{pm}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"pt-4 flex justify-between"}>
                        <div className={"w-full"}>
                            <div
                                className={"pb-1 flex justify-between border-solid border-0 border-b border-b-background-primary"}>
                                <div>
                                    <FaWind className={"mr-2"} />
                                    <span>Wind</span>
                                </div>
                                <span>{windspeed}</span>
                            </div>
                            <div className={"pt-3 pb-1 flex justify-between border-solid border-0 border-b border-b-background-primary"}>
                                <div>
                                    <FaWind className={"mr-2"} />
                                    <span>Dew Point</span>
                                </div>
                                <span>{dewpoint}</span>
                            </div>
                            <div className={"pt-3 pb-1  flex justify-between border-solid border-0 border-b border-b-background-primary"}>
                                <div>
                                    <FaWind className={"mr-2"} />
                                    <span>UV-Index</span>
                                </div>
                                <span>{uvindex}/10</span>
                            </div>
                        </div>

                        <div className={"pl-5 w-full"}>
                            <div
                                className={"pb-1 flex justify-between border-solid border-0 border-b border-b-background-primary"}>
                                <div>
                                    <FaWind className={"mr-2"}/>
                                    <span>Humidty</span>
                                </div>
                                <span>{humidty}</span>
                            </div>
                            <div
                                className={"pt-3 pb-1 flex justify-between border-solid border-0 border-b border-b-background-primary"}>
                                <div>
                                    <FaWind className={"mr-2"}/>
                                    <span>Pressure</span>
                                </div>
                                <span>{pressure}hPA</span>
                            </div>
                            <div
                                className={"pt-3 pb-1  flex justify-between border-solid border-0 border-b border-b-background-primary"}>
                                <div>
                                    <FaWind className={"mr-2"}/>
                                    <span>Visibility</span>
                                </div>
                                <span>{visibility}km</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={"w-[50%] pl-4 flex flex-col"}>
                <div className={"text-[160px] w-full flex justify-center"}>
                    <FaCloudRain />
                </div>

                <div className={"w-full flex mt-auto"}>
                    <div className={"text-center w-full flex flex-col items-center"}>
                        <span className={"mb-4"}>Morgens</span>
                        <FaCloudRain className={"mb-4 text-4xl"}/>
                        <span>10</span>
                    </div>
                    <div className={"text-center w-full flex flex-col items-center"}>
                        <span className={"mb-4"}>Mittags</span>
                        <FaCloudRain className={"mb-4 text-4xl"}/>
                        <span>10</span>
                    </div>
                    <div className={"text-center w-full flex flex-col items-center"}>
                        <span className={"mb-4"}>Abends</span>
                        <FaCloudRain className={"mb-4 text-4xl"}/>
                        <span>10</span>
                    </div>

                    <div className={"text-center w-full flex flex-col items-center"}>
                        <span className={"mb-4"}>Nachts</span>
                        <FaCloudRain className={"mb-4 text-4xl"}/>
                        <span>10</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
