// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import './Home.css'; // Importando o CSS
import Header from '../components/Header'; // Importando o Header
import { useUser } from '../UserContext'; // Importando o contexto
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importando componentes do Leaflet
import L from 'leaflet'; // Importando Leaflet
import { FaSun, FaSnowflake, FaCloudRain, FaCloud, FaTint, FaClock } from 'react-icons/fa'; // Importando ícones

// Configurando os ícones do Leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
});

function Home() {
    const { user } = useUser(); // Obtendo o usuário do contexto
    const [weatherData, setWeatherData] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const city = user?.city || ''; // Cidade do usuário
    const [cityCoords, setCityCoords] = useState([0, 0]); // Coordenadas da cidade

    // Atualiza a data e hora a cada segundo
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(intervalId);
    }, []);

    // Função para buscar dados da API
    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!city) return;

            const apiKey = '9fd913f43098226f34c7fb58d76205c9';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);

            // Define as coordenadas da cidade
            if (data && data.coord) {
                setCityCoords([data.coord.lat, data.coord.lon]);
            }
        };

        fetchWeatherData();
    }, [city]);

    // Função para escolher o ícone com base no clima
    const getWeatherIcon = (main) => {
        switch (main) {
            case 'Clear':
                return <FaSun className="weather-icon" />;
            case 'Rain':
                return <FaCloudRain className="weather-icon" />;
            case 'Snow':
                return <FaSnowflake className="weather-icon" />;
            default:
                return <FaCloud className="weather-icon" />;
        }
    };

    // Função para gerar notas sobre o clima
    const getWeatherNote = (temp) => {
        if (temp > 25) {
            return "Está calor hoje, ótimo para um dia de piscina ou para sair de casa e tomar um sorvete.";
        } else if (temp <= 25 && temp > 15) {
            return "Está bom o clima hoje, ótimo para fazer um piquenique ou fazer uma caminhada por aí.";
        } else {
            return "Hoje esfriou, melhor tirar o casaquinho do armário e curtir um filminho ou ótimo para tomar um chocolate quente.";
        }
    };

    // Formatação da data e hora
    const formattedDateTime = currentDateTime.toLocaleString('pt-BR', {
        dateStyle: 'full',
        timeStyle: 'long',
    });

    return (
        <div className="home-background"> {/* Ajustando o fundo */}
            <Header /> {/* Adiciona o cabeçalho */}
            <div className="container">
                <div className="home-box">
                    <h2>Bem-vindo(a), {user ? user.name : 'Visitante'}!</h2> {/* Nome do usuário */}
                    <h2>Clima em: {city}</h2> {/* Nome da cidade */}
                    
                    <div className="weather-info"> {/* Container do clima */}
                        {weatherData ? (
                            <div className="weather-card">
                                {getWeatherIcon(weatherData.weather[0].main)} {/* Ícone do clima */}
                                <h3>{weatherData.weather[0].description}</h3>
                                <p>{getWeatherNote(weatherData.main.temp)}</p> {/* Nota sobre o clima */}
                                <div className="weather-details">
                                    <div className="weather-item">
                                        {weatherData.main.temp < 15 ? <FaSnowflake className="icon" /> : <FaSun className="icon" />}
                                        <p>Temperatura: {weatherData.main.temp}°C</p>
                                    </div>
                                    <div className="weather-item">
                                        {weatherData.main.feels_like < 15 ? <FaSnowflake className="icon" /> : <FaSun className="icon" />}
                                        <p>Sensação Térmica: {weatherData.main.feels_like}°C</p>
                                    </div>
                                    <div className="weather-item">
                                        {weatherData.main.humidity > 70 ? <FaCloudRain className="icon" /> : <FaTint className="icon" />}
                                        <p>Umidade: {weatherData.main.humidity}%</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Carregando clima...</p>
                        )}
                    </div>

                    {/* Exibindo data e hora fora do container */}
                    <div className="time-display"> 
                        <FaClock className="clock-icon" /> {/* Ícone de relógio */}
                        <div>
                            <h3>Data e Hora Atual:</h3>
                            <p>{formattedDateTime}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mapa da cidade totalmente fora do container */}
            {city && (
                <MapContainer center={cityCoords} zoom={12} style={{ height: '50vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={cityCoords}>
                        <Popup>
                            <strong>{city}</strong><br />
                            {weatherData ? (
                                <>
                                    <p>Temperatura: {weatherData.main.temp}°C</p>
                                    <p>Descrição: {weatherData.weather[0].description}</p>
                                </>
                            ) : (
                                <p>Dados não disponíveis</p>
                            )}
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
}

export default Home;
