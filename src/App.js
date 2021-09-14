import './App.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Container, Spinner } from 'reactstrap';
import { useState } from 'react';
import PictureCard from './components/PictureCard';

const key = '1QyMmRUtp3Mfb47CNUWtJmhIUC4cORz8TqlCYM6g';

function App() {
	const [startDate, setStartDate] = useState(`2017-08-10`);
	const [endDate, setEndDate] = useState(`2017-08-20`);

	// Nasa Query
	const getNasaPhotos = async ({ queryKey: { 1: dates } }) => {
		console.log(dates);
		const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${key}&start_date=${dates.start_date}&end_date=${dates.end_date}`);
		console.log(response);
		return response.data;
	};

	// React Query => Creating Nasa Request
	// DATA => Storing Data in Nasa Info
	const { data: nasaPhotos, isLoading: nasaPhotosLoading } = useQuery(['active customers', { start_date: startDate, end_date: endDate }], getNasaPhotos);

	// LOADING => While Loading nasaPhotos Loading will be true
	if (nasaPhotosLoading) {
		return (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '80vh' }}>
				<Spinner color="info" />
			</div>
		);
	}

	const handleStartDate = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDate = (e) => {
		setEndDate(e.target.value);
	};

	return (
		<div className="App">
			<input type="date" value={startDate} onChange={handleStartDate} />
			<input type="date" value={endDate} onChange={handleEndDate} />
			<Container>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
					{nasaPhotos
						? nasaPhotos.map((photo) => {
								const { title, explanation, url, date } = photo;
								return <PictureCard title={title} explanation={explanation} url={url} date={date} />;
						  })
						: ' No Photos Available'}
				</div>
			</Container>
		</div>
	);
}

export default App;
