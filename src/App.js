import './App.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Button, Container, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { useState } from 'react';
import PictureCard from './components/PictureCard';
import SearchDate from './components/SearchDate';
import { FontChangeButtons } from './components/FontChangeButtons';

const key = '1QyMmRUtp3Mfb47CNUWtJmhIUC4cORz8TqlCYM6g'; // Usually I put this in .env file

function App() {
	const [startDate, setStartDate] = useState(`2017-08-10`);
	const [endDate, setEndDate] = useState(`2017-08-20`);
	const [choosePhoto, setChoosePhoto] = useState('https://apod.nasa.gov/apod/image/1708/Carina_Foucher_960.jpg');
	const [text, setText] = useState('Press Pin For New Background Photo');
	const [font, setFont] = useState('Alfa Slab One, cursive'); // font1 to start

	// Nasa Query
	const getNasaPhotos = async ({ queryKey: { 1: dates } }) => {
		const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${key}&start_date=${dates.start_date}&end_date=${dates.end_date}`);
		return response.data;
	};

	// React Query => Creating Nasa Request && Caching Data
	const { data: nasaPhotos, isLoading: nasaPhotosLoading } = useQuery(['active customers', { start_date: startDate, end_date: endDate }], getNasaPhotos);

	const handleSetText = (e) => {
		setText(e.target.value);
	};

	const handleStartDate = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDate = (e) => {
		setEndDate(e.target.value);
	};

	// LOADING => While Loading nasaPhotos Loading will be true
	if (nasaPhotosLoading) {
		return (
			<div className="App">
				<Container>
					<h1 className="backgroundImageText" style={{ backgroundImage: `url(${choosePhoto})`, fontFamily: font, overflow: 'hidden' }}>
						{text}
					</h1>
					{/* Component To Change Font */}
					<FontChangeButtons font={font} setFont={setFont} />
					{/* Component To Search Date */}
					<SearchDate text={text} startDate={startDate} endDate={endDate} handleSetText={handleSetText} handleStartDate={handleStartDate} handleEndDate={handleEndDate} />;
					<div style={{ display: 'flex', justifyContent: 'space-around' }}>
						<a href="https://ryandick.netlify.app/">
							<Button color={'danger'} size={'lg'} style={{ marginBottom: '2em', width: 300 }}>
								Learn More About Ryan?
							</Button>
						</a>
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-around' }}>
						<a href="https://github.com/rdick/NasaTitleEditor">
							<Button color={'danger'} size={'lg'} style={{ marginBottom: '2em', width: 300 }}>
								Project GitHub Link
							</Button>
						</a>
					</div>
					<div style={{ height: '70vh' }}>.</div>
				</Container>
			</div>
		);
	}
	// Photos Loaded => Display Photos
	return (
		<div className="App">
			<Container>
				<h1 className="backgroundImageText" style={{ backgroundImage: `url(${choosePhoto})`, fontFamily: font, overflow: 'hidden' }}>
					{text}
				</h1>
				{/* Component To Change Font */}
				<FontChangeButtons font={font} setFont={setFont} />
				{/* Component To Search Date */}
				<SearchDate text={text} startDate={startDate} endDate={endDate} handleSetText={handleSetText} handleStartDate={handleStartDate} handleEndDate={handleEndDate} />;
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<a href="https://ryandick.netlify.app/">
						<Button color={'danger'} size={'lg'} style={{ marginBottom: '2em', width: 300 }}>
							Learn More About Ryan?
						</Button>
					</a>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<a href="https://github.com/rdick/NasaTitleEditor">
						<Button color={'danger'} size={'lg'} style={{ marginBottom: '2em', width: 300 }}>
							Project GitHub Link
						</Button>
					</a>
				</div>
			</Container>
			<Container>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-around' }}>
					{/* Display All Photos     OR     No Photos Available*/}
					{nasaPhotos ? (
						nasaPhotos.map((photo) => {
							const { title, explanation, url, date } = photo;
							// Display Individual Photo
							return <PictureCard setChoosePhoto={setChoosePhoto} title={title} explanation={explanation} url={url} date={date} />;
						})
					) : (
						<div style={{ height: '50vh', color: 'white' }}> No Photos Available</div>
					)}
				</div>
			</Container>
		</div>
	);
}

export default App;
