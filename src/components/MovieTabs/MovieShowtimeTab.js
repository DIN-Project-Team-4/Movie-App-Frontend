import React, { useEffect, useState } from 'react';
import { Button, Card, Tab, Nav, Col, Row, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const MovieShowtimesTab = ({ movieTitle = '' }) => {
  const [cities, setCities] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [activeCity, setActiveCity] = useState('');
  const [eventId, setEventId] = useState(null);

  useEffect(() => {
    const fetchTheatreAreas = async () => {
      try {
        const response = await axios.get('https://www.finnkino.fi/xml/TheatreAreas/');
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const theatres = xmlDoc.getElementsByTagName('TheatreArea');
        const citiesList = {};

        for (let i = 0; i < theatres.length; i++) {
          const id = theatres[i].getElementsByTagName('ID')[0].textContent;
          const name = theatres[i].getElementsByTagName('Name')[0].textContent;

          // Ignore specific IDs
          if (!['1029', '1014', '1012', '1002', '1021', '1047'].includes(id)) {
            const cityName = name.split(':')[0].trim();
            const theatreName = name.split(':')[1]?.trim() || cityName;

            if (!citiesList[cityName]) {
              citiesList[cityName] = [];
            }

            citiesList[cityName].push({ id, name: theatreName });
          }
        }

        setCities(citiesList);
      } catch (error) {
        console.error('Error fetching theatre areas:', error.message);
      }
    };

    fetchTheatreAreas();
  }, []);

  useEffect(() => {
    const fetchEventId = async () => {
      try {
        const response = await axios.get('https://www.finnkino.fi/xml/Events/?listType=NowInTheatres');
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const events = xmlDoc.getElementsByTagName('Event');

        for (let i = 0; i < events.length; i++) {
          const titleElement = events[i].getElementsByTagName('Title')[0];
          const originalTitleElement = events[i].getElementsByTagName('OriginalTitle')[0];
          const title = titleElement?.textContent?.trim() || '';
          const originalTitle = originalTitleElement?.textContent?.trim() || '';

          if (movieTitle && (title.includes(movieTitle) || originalTitle.includes(movieTitle))) {
            const id = events[i].getElementsByTagName('ID')[0].textContent;
            setEventId(id);
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching event ID:', error.message);
      }
    };

    fetchEventId();
  }, [movieTitle]);

  useEffect(() => {
    const fetchShowtimes = async () => {
      if (activeCity && eventId) {
        try {
          const response = await axios.get(`https://www.finnkino.fi/xml/Schedule/?area=${activeCity}&eventID=${eventId}&nrOfDays=7`);
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, 'text/xml');
          const shows = xmlDoc.getElementsByTagName('Show');
          const showtimesList = [];

          for (let i = 0; i < shows.length; i++) {
            const showTime = shows[i].getElementsByTagName('dttmShowStart')[0]?.textContent;
            const theatre = shows[i].getElementsByTagName('Theatre')[0]?.textContent;
            const auditorium = shows[i].getElementsByTagName('TheatreAuditorium')[0]?.textContent || 'Unknown Auditorium';
            const showUrl = shows[i].getElementsByTagName('ShowURL')[0]?.textContent;

            showtimesList.push({
              showDate: new Date(showTime).toLocaleString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
              showTime: new Date(showTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }),
              theatre,
              auditorium,
              showUrl,
            });
          }

          setShowtimes(showtimesList);
        } catch (error) {
          console.error('Error fetching showtimes:', error.message);
        }
      }
    };

    fetchShowtimes();
  }, [activeCity, eventId]);

  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const { showDate } = showtime;
    if (!acc[showDate]) {
      acc[showDate] = [];
    }
    acc[showDate].push(showtime);
    return acc;
  }, {});

  return (
    <div className="movie-showtimes-tab">
      <Tab.Container activeKey={activeCity} onSelect={(selectedKey) => setActiveCity(selectedKey)}>
        <Row className="mt-3">
          <Col sm={4}>
            <Nav className="flex-column custom-showtime" variant="pills">
              <Nav.Item>
                <Nav.Link className='finnkino-custom-cities' eventKey="" disabled>Finnkino Showtimes</Nav.Link>
              </Nav.Item>
              {Object.entries(cities).map(([cityName, theatres], cityIndex) => (
                <div key={cityIndex}>
                  <div className="city-group-header">{cityName}</div>
                  {theatres.map((theatre, theatreIndex) => (
                    <Nav.Item key={theatreIndex}>
                      <Nav.Link eventKey={theatre.id}>{theatre.name}</Nav.Link>
                    </Nav.Item>
                  ))}
                </div>
              ))}
            </Nav>
          </Col>
          <Col sm={8}>
            {activeCity ? (
              <>
                <div className='showtime-header'>Finnkino showtimes for {movieTitle} in {cities[Object.keys(cities).find(city => cities[city].some(theatre => theatre.id === activeCity))]?.find(theatre => theatre.id === activeCity)?.name || ''} cinema</div>
                {Object.keys(groupedShowtimes).length > 0 ? (
                  Object.entries(groupedShowtimes).map(([date, times], index) => (
                    <Card className="showtime-group">
                      <Card.Title className='custom-showtime-date'>{date}</Card.Title>
                      <ListGroup className="list-group-flush">
                        {times.map((showtime, idx) => (
                          <ListGroup.Item key={idx} className="showtime-item">
                            {showtime.showTime} ({showtime.auditorium})
                            <br />
                            <a href={showtime.showUrl} target="_blank" rel="noopener noreferrer"><Button variant='outline-*'>Buy Tickets</Button></a>
                          </ListGroup.Item>
                          
                        ))}
                      </ListGroup>

                    </Card>
                  ))
                ) : (
                  <p>No showtimes available for this movie.</p>
                )}
              </>
            ) : (
              <p>Select a cinema to view showtimes.</p>
            )}
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default MovieShowtimesTab;
