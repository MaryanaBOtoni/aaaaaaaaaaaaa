// src/pages/Weather.jsx
import React, { useEffect, useState } from 'react';
import './Weather.css'; // Importando o CSS
import Header from '../components/Header'; // Importando o Header
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importando componentes do Leaflet
import L from 'leaflet'; // Importando Leaflet
import { FaSun, FaSnowflake, FaCloudRain, FaCloud } from 'react-icons/fa'; // Importando ícones
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importando Font Awesome

// Configurando os ícones do Leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
});

// Dados das capitais e suas coordenadas
const capitals = [
    { state: 'Acre', capital: 'Rio Branco', coords: [-9.97499, -67.8243], flagIcon: 'fas fa-flag' },
    { state: 'Alagoas', capital: 'Maceió', coords: [-9.64985, -35.7089], flagIcon: 'fas fa-flag' },
    { state: 'Amapá', capital: 'Macapá', coords: [0.03874, -51.0694], flagIcon: 'fas fa-flag' },
    { state: 'Amazonas', capital: 'Manaus', coords: [-3.11903, -60.02173], flagIcon: 'fas fa-flag' },
    { state: 'Bahia', capital: 'Salvador', coords: [-12.9714, -38.5014], flagIcon: 'fas fa-flag' },
    { state: 'Ceará', capital: 'Fortaleza', coords: [-3.71722, -38.5433], flagIcon: 'fas fa-flag' },
    { state: 'Distrito Federal', capital: 'Brasília', coords: [-15.7801, -47.9292], flagIcon: 'fas fa-flag' },
    { state: 'Espírito Santo', capital: 'Vitória', coords: [-20.3155, -40.3128], flagIcon: 'fas fa-flag' },
    { state: 'Goiás', capital: 'Goiânia', coords: [-16.6864, -49.2643], flagIcon: 'fas fa-flag' },
    { state: 'Maranhão', capital: 'São Luís', coords: [-2.5394, -44.2828], flagIcon: 'fas fa-flag' },
    { state: 'Mato Grosso', capital: 'Cuiabá', coords: [-15.601, -56.0979], flagIcon: 'fas fa-flag' },
    { state: 'Mato Grosso do Sul', capital: 'Campo Grande', coords: [-20.4421, -54.6463], flagIcon: 'fas fa-flag' },
    { state: 'Minas Gerais', capital: 'Belo Horizonte', coords: [-19.9191, -43.9378], flagIcon: 'fas fa-flag' },
    { state: 'Pará', capital: 'Belém', coords: [-1.455, -48.5039], flagIcon: 'fas fa-flag' },
    { state: 'Paraíba', capital: 'João Pessoa', coords: [-7.115, -34.8641], flagIcon: 'fas fa-flag' },
    { state: 'Paraná', capital: 'Curitiba', coords: [-25.4284, -49.2733], flagIcon: 'fas fa-flag' },
    { state: 'Pernambuco', capital: 'Recife', coords: [-8.04756, -34.8775], flagIcon: 'fas fa-flag' },
    { state: 'Piauí', capital: 'Teresina', coords: [-5.08917, -42.8034], flagIcon: 'fas fa-flag' },
    { state: 'Rio de Janeiro', capital: 'Rio de Janeiro', coords: [-22.9068, -43.1729], flagIcon: 'fas fa-flag' },
    { state: 'Rio Grande do Norte', capital: 'Natal', coords: [-5.7945, -35.2110], flagIcon: 'fas fa-flag' },
    { state: 'Rio Grande do Sul', capital: 'Porto Alegre', coords: [-30.0346, -51.2177], flagIcon: 'fas fa-flag' },
    { state: 'Rondônia', capital: 'Porto Velho', coords: [-8.76078, -63.8999], flagIcon: 'fas fa-flag' },
    { state: 'Roraima', capital: 'Boa Vista', coords: [2.82334, -60.6753], flagIcon: 'fas fa-flag' },
    { state: 'Santa Catarina', capital: 'Florianópolis', coords: [-27.5956, -48.5480], flagIcon: 'fas fa-flag' },
    { state: 'São Paulo', capital: 'São Paulo', coords: [-23.5505, -46.6333], flagIcon: 'fas fa-flag' },
    { state: 'Sergipe', capital: 'Aracaju', coords: [-10.9472, -37.0731], flagIcon: 'fas fa-flag' },
    { state: 'Tocantins', capital: 'Palmas', coords: [-10.3322, -48.2041], flagIcon: 'fas fa-flag' },
];

function Weather() {
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState(null);

    // Função para buscar dados da API para cada capital
    useEffect(() => {
        const fetchWeatherData = async () => {
            const apiKey = '9fd913f43098226f34c7fb58d76205c9'; // Insira sua chave da API aqui
            const weatherPromises = capitals.map(async (capital) => {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital.capital},BR&appid=${apiKey}&units=metric&lang=pt_br`;
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Erro: ${response.status} ${response.statusText}`);
                    }
                    const data = await response.json();
                    return { ...capital, weather: data }; // Adiciona dados de clima à capital
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                    setError(error.message);
                    return { ...capital, weather: null }; // Se houver erro, retorna null para os dados
                }
            });

            const results = await Promise.all(weatherPromises);
            setWeatherData(results);
        };

        fetchWeatherData();
    }, []);

    return (
        <div className="weather-page">
            <Header />
            <h2>Temperaturas das Capitais do Brasil</h2>
            {error && <p className="error-message">Erro ao carregar os dados: {error}</p>}
            <div className="weather-container">
                <div className="weather-columns">
                    {weatherData.map((capital) => (
                        <div className="weather-info" key={capital.capital}>
                            <h2>{capital.capital}</h2>
                            {capital.weather ? (
                                <>
                                    <p>Temperatura: {capital.weather.main.temp}°C</p>
                                    <p>Descrição: {capital.weather.weather[0].description}</p>
                                </>
                            ) : (
                                <p>Dados não disponíveis</p>
                            )}
                        </div>
                    ))}
                </div>
                <MapContainer center={[-14.2350, -51.9253]} zoom={4} style={{ height: '50vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {weatherData.map((capital) => (
                        <Marker key={capital.capital} position={capital.coords}>
                            <Popup>
                                <strong>{capital.capital}</strong><br />
                                {capital.weather ? (
                                    <>
                                        <i class={capital.flagIcon}></i> {/* Ícone de bandeira */}
                                        <p>Temperatura: {capital.weather.main.temp}°C</p>
                                        <p>Descrição: {capital.weather.weather[0].description}</p>
                                    </>
                                ) : (
                                    <p>Dados não disponíveis</p>
                                )}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}

export default Weather;
