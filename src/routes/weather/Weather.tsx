import React from "react";
import './Weather.css'

//pictures
import vector12 from "@/assets/weather/sunrise-icon.png";
import vector13 from "@/assets/weather/sundown-icon.png"
import group1 from "@/assets/weather/group1.png";
import bow from "@/assets/weather/bow.png";
import arrow from "@/assets/weather/arrow.png";
import dewpointpic from "@/assets/weather/dewpoint.png";
import humidtypic from "@/assets/weather/humidty.png";
import pressurepic from "@/assets/weather/pressure.png";
import uvindexpic from "@/assets/weather/uvindex.png";
import visibilitypic from "@/assets/weather/visibility.png";
import wind from "@/assets/weather/wind.png";
import morningicon from "@/assets/weather/morning-icon.png";
import afternoonicon from "@/assets/weather/afternoon-icon.png";
import eveningicon from "@/assets/weather/evening-icon.png";
import overnighticon from "@/assets/weather/overnight-icon.png";

//Replace later with API
const city = "Lage, Deutschland"
const temperature = "7°"
const stforecast = "Bewölkt"
const rainprobability = "1% das es gegen 09:00 Uhr regnet"
const temperaturelocation = "3°"
const location = "Wetter heute in Lage, Deutschland"
const feelslike = "Fühlt sich an wie"
const am = "06:39am"
const pm = "08:46pm"
const forecast = "Wettervorhersage für Lage, Deutschland"
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
        <div className="container-13">
            <div className="start-screen">
                    <span className="city"> {city} </span>
                    <span className="temperature"> {temperature} </span>
                    <div className="rectangle-left-top"> </div>
                    <span className="st-forecast"> {stforecast} </span>
                    <div className="rain-probability"> {rainprobability} </div>
                    <div className="location"> {location} </div>                   
                    <span className="temperature-location"> {temperaturelocation} </span>
                    <div className="left-box">
                        <div className="feels-like"> {feelslike}</div>
                        <div className="sunrise">
                            <div className="sunrise-icon">
                                <img className="vector-12" src={vector12}></img>
                            </div>
                            <div className="am">
                                 {am} 
                            </div>
                        </div>
                        <div className="sundown">
                            <div className="sundown-icon">
                                <img className="vector-13" src={vector13}></img>
                            </div>
                            <div className="pm">
                                {pm}
                            </div>
                        </div>
                    </div>
                    <img className="bow" src={bow}></img>

                    <div className="biclouds">
                        <img className="group1" src={group1}></img>
                    </div>
                    <div className="todays-forecast"> {forecast} </div>

                    <div className="down-box">
                        <div className="inner-down-box">
                            <div className="left-down-corner">
                                <div className="left">
                                    <div className="wind-container">
                                        <div className="memorywind">
                                            <img className="vector-14" src={wind}></img>
                                        </div>
                                        <div className="wind">
                                            <span className="windLabel">Wind</span> 
                                            {windspeed}
                                        </div>
                                    </div>
                                    
                                    <div className="rectangle-21"></div>

                                    <div className="dewpoint-container">
                                        <div className="memorydewpint">
                                            <img className="vector-15" src={dewpointpic}></img>
                                        </div>
                                        <div className="dewpoint">
                                            <span className="dewpointLabel"> Dew Point </span>
                                            {dewpoint}
                                        </div>
                                    </div>

                                    <div className="rectangle-22"></div>

                                    <div className="uvindex-container">
                                        <div className="memoryuvindex">
                                            <img className="vector-16" src={uvindexpic}></img>
                                        </div>
                                        <div className="uvindex">
                                            <span className="uvindexLabel"> UV-Index </span>
                                            {uvindex}/10
                                        </div>
                                    </div>

                                    <div className="rectangle-23"></div>                                                      
                                </div>

                                <div className="right">
                                    <div className="humidty-container">
                                        <div className="memoryhumidty">
                                            <img className="vector-17" src={humidtypic}></img>
                                        </div>
                                        <div className="humidty">
                                            <span className="humidtyLabel"> Humidty </span>
                                            {humidty} </div>
                                    </div>

                                    <div className="rectangle-24"></div>

                                    <div className="pressure-container">
                                        <div className="memorypressure">
                                            <img className="vector-11" src={pressurepic}></img>
                                        </div>
                                        <div className="pressure">
                                            <span className="pressureLabel"> Pressure </span>  
                                            {pressure} hPA
                                        </div>
                                    </div>

                                    <div className="rectangle-25"></div>

                                    <div className="visibility-container">
                                        <div className="memoryvisibility">
                                            <img className="group" src={visibilitypic}></img>
                                        </div>
                                        <div className="visibility">
                                            <span className="visibilityLabel"> Visibility </span> 
                                            {visibility} km
                                        </div>
                                    </div>
                                    <div className="rectangle-26"></div>
                                </div>
                            </div>
                            
                            <div className="right-down-corner">
                                <div className="morning-container">
                                    <div className="morning-headline">Morgens <br />{forecastmorning}</div>
                                    <div className="morning-image">
                                        <img className="vector-18" src={morningicon}></img>
                                    </div>
                                </div>
                                <div className="afternoon-container">
                                    <div className="afternoon-headline">Mittags <br />{forecastafternoon}</div>
                                    <div className="afternoon-image">
                                        <img className="vector-19" src={afternoonicon}></img>
                                    </div>
                                </div>
                                <div className="evening-container">
                                    <div className="evening-headline">Abends <br />{forecastevening}</div>
                                    <div className="evening-image">
                                        <img className="vector-20" src={eveningicon}></img>
                                    </div>                            
                            </div>
                            <div className="overnight-headline"> Nachts <br />{forecastovernight}</div>
                            <img className="vector-21" src={overnighticon}></img>

                            <div className="rectangle-27"></div>
                            <div className="rectangle-28"></div>
                            <div className="rectangle-29"></div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    )
}

export default Weather
