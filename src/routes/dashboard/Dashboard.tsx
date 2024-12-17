import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FaCloudSun, FaEye, FaPause, FaPlay, FaThermometerThreeQuarters, FaTint, FaWind } from "react-icons/fa";
import { useSpotify } from "@/contexts/SpotifyContext";
import { IoMdSkipForward, IoMdSkipBackward, IoMdAlarm } from "react-icons/io";
import PlayingImage from '@/assets/playing.png';
import { IoIosTimer } from "react-icons/io";
import { selectCurrentUser } from "@/slices/user.slice";
import { useGetConstantsByUserIdQuery } from "@/api/constants.api";
import Alarm, { getNextAlarm } from "@/utils/Alarm";
import AlarmWithOccurrence, { formatNextOccurrence } from "@/utils/AlarmWithOccurrence";
import { TbSmartHome } from "react-icons/tb";
import { useGetForecastByCoordinatesQuery, useGetWeatherByCoordinatesQuery } from "@/api/weather.api";
import Draggable from 'react-draggable';
import { FaCalendar } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { currentTrack, play, next, previous, pause, isPlaying } = useSpotify();

  const [alarm, setAlarm] = useState<AlarmWithOccurrence | null>(null);
  const { data: constants } = useGetConstantsByUserIdQuery(currentUser?.id || 0);

  useEffect(() => {
    if (constants) {
      const alarmConstant = constants.find(c => c.name === "ALARM");
      if (alarmConstant) {
        const alarms: Alarm[] = JSON.parse(alarmConstant.value);
        setAlarm(getNextAlarm(alarms));
      }
    }
  }, [constants]);

  const [lat, setLat] = useState<string | null>(null);
  const [lon, setLon] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

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

  const { data: weatherData } = useGetWeatherByCoordinatesQuery(
    lat && lon ? { lat, lon } : { lat: "33.44", lon: "-94.04" },
    { skip: lat === null || lon === null }
  );

  const { data: forecastData } = useGetForecastByCoordinatesQuery(
    lat && lon ? { lat, lon } : { lat: "33.44", lon: "-94.04" },
    { skip: lat === null || lon === null }
  );

  if (!weatherData || !forecastData) {
    return (
      <div className="flex justify-between bg-background-secondary p-4 h-full">
        Loading...
      </div>
    );
  }

  const temperaturelocation = `${Math.round(weatherData.current.temp - 273.15)}°C`;
  const feelslike = `Feels like ${Math.round(weatherData.current.feels_like - 273.15)}°C`;
  const windspeed = `${weatherData.current.wind_speed} km/h`;
  const dewpoint = `${Math.round(weatherData.current.dew_point - 273.15)} °C`;
  const uvindex = weatherData.current.uvi;
  const humidty = `${weatherData.current.humidity}%`;
  const pressure = `${weatherData.current.pressure} hPA`;

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  const userName = currentUser?.username || 'User';

  return (
    <div className="w-full h-full">
      <span className={"mb-4 text-lg font-bold"}>{`${getGreeting()}, ${userName}`}</span>

      <div className="mt-2 box-border flex justify-between gap-4">
        {/* Row 1: Spotify Player, SmartHome, Weather */}
        <div className={"flex flex-col gap-4 w-full"}>
          <Draggable>
            <div className="bg-background-secondary flex flex-col gap-2 p-2 cursor-move">
              <div className="mb-1">
                {currentTrack != null ? (
                  <div className="flex w-full">
                    <img className="w-[20px]" src={currentTrack.item.album.images[0].url} alt={currentTrack.item.name}/>
                    <div className="flex flex-col pl-4">
                    <span
                      className="font-black inline-block text-[10px]">{currentTrack.item.artists.map((artist: any) => artist.name).join(', ')}</span>
                      <span className="font-black inline-block text-[12px]">{currentTrack.item.name}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full">
                    <img className="w-[50px] rounded" src={PlayingImage} alt={"Nothing Playing"}/>
                    <div className="flex flex-col pl-4">
                      <span className="font-black inline-block text-[12px]">Nothing is playing</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-background-third flex rounded justify-between p-2">
                {isPlaying ? (
                  <>
                    <button onClick={previous} className="text-white rounded flex items-center text-sm">
                      <IoMdSkipBackward/>
                    </button>
                    <button onClick={pause} className="text-white rounded flex items-center text-sm">
                      <FaPause/>
                    </button>
                    <button onClick={next} className="text-white rounded flex items-center text-sm">
                      <IoMdSkipForward/>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={previous} className="text-white rounded flex items-center text-sm">
                      <IoMdSkipBackward/>
                    </button>
                    <button onClick={pause} className="text-white rounded flex items-center text-sm">
                      <FaPlay/>
                    </button>
                    <button onClick={next} className="text-white rounded flex items-center text-sm">
                      <IoMdSkipForward/>
                    </button>
                  </>
                )}
              </div>
            </div>
          </Draggable>

          <div>
            <Draggable>
              <div className="bg-background-secondary p-2 cursor-move">
                <div className="text-sm w-full flex items-center gap-2 pb-2">
                  <TbSmartHome/> SmartHome
                </div>
                <span className={"pb-2 text-sm"}>LED</span>
                <div className={"justify-between flex mb-2 gap-2"}>
                  <button className={"w-full"}>On</button>
                  <button className={"w-full"}>Off</button>
                </div>

                <span className={"pb-2 text-sm"}>Steckdose</span>
                <div className={"justify-between flex gap-2"}>
                  <button className={"w-full"}>On</button>
                  <button className={"w-full"}>Off</button>
                </div>
              </div>
            </Draggable>
          </div>
        </div>

        {/* Row 2: Alarm (left), Weather (right) */}
        <div className={"w-full flex flex-col gap-4"}>
          <Draggable>
            <div className="bg-background-secondary p-2 cursor-move">
            <div className="text-sm w-full flex items-center gap-2 pb-3">
                <IoMdAlarm/> Alarm
              </div>
              <div>
                {alarm != null ? (
                  <span className="">at {alarm.time} {formatNextOccurrence(alarm.nextOccurrence)}</span>
                ) : (
                  <span className="">There is no alarm</span>
                )}
              </div>
            </div>
          </Draggable>

          <Draggable>
            <div className="bg-background-secondary p-2 cursor-move">
              <div className="text-sm w-full flex items-center gap-2 pb-3">
                <FaCalendar/> Calendar
              </div>
              <span className="">There are no appointments</span>
            </div>
          </Draggable>
        </div>

        <div className={"w-full"}>
          <Draggable>
            <div className="bg-background-secondary p-2 cursor-move">
              <div className="pt-1">
                <span className="block font-bold text-2xl">{temperaturelocation}</span>
                <span className="font-bold">{feelslike}</span>
              </div>
              <div className="pt-4 flex">
                <div className="w-full">
                  <div className="pb-1 flex justify-between border-b border-b-background-primary">
                    <div className="flex items-center">
                      <FaWind className="mr-2 text-blue-500"/>
                      <span>Wind</span>
                    </div>
                    <span>{windspeed}</span>
                  </div>
                  <div className="pt-3 pb-1 flex justify-between border-b border-b-background-primary">
                    <div className="flex items-center">
                      <FaTint className="mr-2 text-blue-500"/>
                      <span>Dew Point</span>
                    </div>
                    <span>{dewpoint}</span>
                  </div>
                  <div className="pt-3 pb-1 flex justify-between border-b border-b-background-primary">
                    <div className="flex items-center">
                      <FaThermometerThreeQuarters className="mr-2 text-yellow-500"/>
                      <span>UV-Index</span>
                    </div>
                    <span>{uvindex}/10</span>
                  </div>
                  <div className="pt-3 pb-1 flex justify-between border-b border-b-background-primary">
                    <div className="flex items-center">
                      <FaTint className="mr-2 text-blue-500"/>
                      <span>Humidity</span>
                    </div>
                    <span>{humidty}</span>
                  </div>
                  <div className="pt-3 pb-1 flex justify-between border-b border-b-background-primary">
                    <div className="flex items-center">
                      <FaCloudSun className="mr-2 text-red-500"/>
                      <span>Pressure</span>
                    </div>
                    <span>{pressure}</span>
                  </div>
                </div>
              </div>
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
