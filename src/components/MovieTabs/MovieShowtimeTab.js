import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import axios from 'axios';

const MovieShowtimesTab = () => {
  const [cities, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState('');

  useEffect(() => {
    const fetchTheatreAreas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/finnkino/theatreAreas`);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const theatres = xmlDoc.getElementsByTagName('TheatreArea');
        const citiesList = [];

        for (let i = 0; i < theatres.length; i++) {
          const id = theatres[i].getElementsByTagName('ID')[0].textContent;
          const name = theatres[i].getElementsByTagName('Name')[0].textContent;

          // Ignore specific IDs
          if (!['1029', '1014', '1012', '1002', '1021', '1047'].includes(id)) {
            citiesList.push({ id, name });
          }
        }

        setCities(citiesList);
        setActiveCity(citiesList[0]?.id || '');
      } catch (error) {
        console.error('Error fetching theatre areas:', error.message);
      }
    };

    fetchTheatreAreas();
  }, []);

  return (
    <div className="movie-showtimes-tab">
      <h3>Finnkino Cities</h3>
      <Nav variant="pills" className="flex-column custom-nav">
        {cities.map((city, index) => (
          <Nav.Item key={index}>
            <Nav.Link eventKey={city.id} onClick={() => setActiveCity(city.id)}>{city.name}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default MovieShowtimesTab;
