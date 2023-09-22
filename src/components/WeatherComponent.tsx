// src/components/Weather.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<any | null>(null);
  const [temperature, setTemperature] = useState<any | null>(null);
  const [city, setCity] = useState<any | null>(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
        // Geolocation을 지원하는 경우
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            console.log("위도:", lat);
            console.log("경도:", lon);
          
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=21a7b98675a8ffb875b30ddae3284f6f`)
            .then((response) => {
                console.log(response)
                setCity(response.data.name);
                setWeather(response.data.weather[0].description)
                setTemperature(Math.round(response.data.main.temp- 273.15))
            })
            .catch((error) => {
            console.error(error);
            });

        }, function(error) {
            // 위치 정보를 가져오지 못한 경우 또는 사용자가 위치 정보 제공을 거부한 경우
            console.error("위치 정보를 가져오는데 실패했습니다.", error);
        });
    } else {
        // Geolocation을 지원하지 않는 경우
        console.error("Geolocation을 지원하지 않는 브라우저입니다.");
    }

  }, []);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 화면 크기가 변경될 때마다 실행되는 함수
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // 화면 크기 변경 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  if (!weather) {
    return (
      <div className={(screenWidth > 675?'w-1/2':'mt-4')+' text-gray-600 p-8 bg-white rounded-xl w-1/2 h-32'}>
          <div role="status">
          <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading weather...</span>
          </div>
          
      </div>)
  }

  return (
    <div className={(screenWidth > 675?'w-1/2':'mt-4')+' text-gray-600 p-8 bg-white rounded-xl h-32'}>
        <span>Weather in </span><span className='text-gray-800 font-bold'>{city}</span>
        <br />
        <span className='text-xl'>{weather} / </span><span className='text-xl text-gray-800 font-bold'>{temperature}°C</span>
    </div>
  );
};

export default Weather;
