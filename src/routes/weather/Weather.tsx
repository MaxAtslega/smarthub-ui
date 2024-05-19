import React from "react";
import './Weather.css'

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
const forecatmorning = "10 °C"

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
                                <img className="vector-12" src="assets/weather/sunrise-icon.svg"></img>
                            </div>
                            <div className="am">
                                 {am} 
                            </div>
                        </div>
                        <div className="sundown">
                            <div className="sundown-icon">
                                <img className="vector-13" src=""></img>
                            </div>
                            <div className="pm">
                                {pm}
                            </div>
                        </div>
                    </div>
                    <img className="bow" src=""></img>
                    <div className="left-down-corner">
                        <div className="left">
                            <div className="rectangle-21"></div>
                            <div className="rectangle-22"></div>
                            <div className="rectangle-23"></div>                                                        
                        </div>
                        
                        <div className="right">
                            <div className="rectangle-24"></div>
                            <div className="rectangle-25"></div>
                            <div className="rectangle-26"></div>
                        </div>
                    </div>
                    <div className="biclouds">
                        <img className="group1" src=""></img>
                    </div>
                    <div className="todays-forecast"> {forecast} </div>

                    <div className="right-down-corner">
                        <div className="morning-container">
                            <div className="morning-headline">Morning <br />{forecatmorning}</div>
                            <div className="morning-image">
                                <img className="vector-18" src=""></img>
                            </div>
                        </div>
                        <div className="afternoon-container">

                        </div>
                        <div className="Evening-container">
                            
                        </div>
                        <div className="Overnight-container">

                        </div>

                        <div className="rectangle-27"></div>
                        <div className="rectangle-28"></div>
                        <div className="rectangle-29"></div>
                    </div>
            </div>
        </div>
    )
}

export default Weather
