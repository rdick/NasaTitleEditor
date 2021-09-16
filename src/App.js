import './App.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Button, Container, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { useState } from 'react';
import PictureCard from './components/PictureCard';
import { ToastProvider } from 'react-toast-notifications';

const key = '1QyMmRUtp3Mfb47CNUWtJmhIUC4cORz8TqlCYM6g';

function App() {
	const [startDate, setStartDate] = useState(`2017-08-10`);
	const [endDate, setEndDate] = useState(`2017-08-20`);
	const [choosePhoto, setChoosePhoto] = useState('https://apod.nasa.gov/apod/image/1708/Carina_Foucher_960.jpg');
	const [text, setText] = useState('Press Pin For New Background Photo');
	const [font, setFont] = useState('Alfa Slab One, cursive');

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
			<div className="App">
				<Container>
					<h1 className="backgroundImageText" style={{ backgroundImage: `url(${choosePhoto})`, fontFamily: font, overflow: 'hidden' }}>
						{text}
					</h1>
					<div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
						<Button style={{ fontFamily: 'Alfa Slab One, cursive' }} color={font === 'Alfa Slab One, cursive' ? 'success' : 'secondary'} onClick={() => setFont('Alfa Slab One, cursive')}>
							Choose Font!
						</Button>
						<Button
							style={{ fontFamily: 'Cinzel Decorative, cursive' }}
							color={font === 'Cinzel Decorative, cursive' ? 'success' : 'secondary'}
							onClick={() => setFont('Cinzel Decorative, cursive')}
						>
							Choose Font!
						</Button>
						<Button style={{ fontFamily: 'Black Ops One, cursive' }} color={font === 'Black Ops One, cursive' ? 'success' : 'secondary'} onClick={() => setFont('Black Ops One, cursive')}>
							Choose Font!
						</Button>
						<Button style={{ fontFamily: 'Monoton, cursive' }} color={font === 'Monoton, cursive' ? 'success' : 'secondary'} onClick={() => setFont('Monoton, cursive')}>
							Choose Font!
						</Button>
						<Button style={{ fontFamily: 'Titan One, cursive' }} color={font === 'Titan One, cursive' ? 'success' : 'secondary'} onClick={() => setFont('Titan One, cursive')}>
							Choose Font!
						</Button>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '80vh' }}>
						<Spinner type="grow" color="primary" style={{ width: '100px', height: '100px' }}>
							.
						</Spinner>
					</div>
				</Container>
			</div>
		);
	}

	const handleStartDate = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDate = (e) => {
		setEndDate(e.target.value);
	};

	const handleSetText = (e) => {
		setText(e.target.value);
	};

	return (
		<ToastProvider autoDismiss autoDismissTimeout={2000} placement="bottom-center">
			<div className="App">
				<Container>
					<h1 className="backgroundImageText" style={{ backgroundImage: `url(${choosePhoto})`, fontFamily: font, overflow: 'hidden' }}>
						{text} sdfs
					</h1>
					<div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
						<Button style={{ fontFamily: 'Alfa Slab One, cursive' }} color={font === 'Alfa Slab One, cursive' ? 'success' : 'secondary'} onClick={() => setFont('Alfa Slab One, cursive')}>
							Choose Font!
						</Button>
						<Button
							style={{ fontFamily: 'Cinzel Decorative, cursive' }}
							color={font === 'Cinzel Decorative, cursive' ? 'success' : 'secondary'}
							onClick={() => setFont('Cinzel Decorative, cursive')}
						>
							Choose Font!
						</Button>
						<Button style={{ fontFamily: 'Black Ops One, cursive' }} color={font === 'Black Ops One, cursive' ? 'success' : 'secondary'} onClick={() => setFont('Black Ops One, cursive')}>
							Choose Font!
						</Button>
						<Button style={{ fontFamily: 'Monoton, cursive' }} color={font === 'Monoton, cursive' ? 'success' : 'secondary'} onClick={() => setFont('Monoton, cursive')}>
							Choose Font!
						</Button>
						<Button style={{ fontFamily: 'Titan One, cursive' }} color={font === 'Titan One, cursive' ? 'success' : 'secondary'} onClick={() => setFont('Titan One, cursive')}>
							Choose Font!
						</Button>
					</div>
					<div>
						<div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBlock: '3em' }}>
							<FormGroup>
								<Label className="label" for="input1">
									Change Text For New Title
								</Label>
								<Input type="text" value={text} onChange={handleSetText} id="input1" />
							</FormGroup>
							<FormGroup>
								<Label className="label" for="input2">
									Photo Taken After
								</Label>
								<Input type="date" value={startDate} onChange={handleStartDate} id="input2" id="input1" />
							</FormGroup>
							<FormGroup>
								<Label className="label" for="input3">
									Photo Taken Before
								</Label>
								<Input type="date" value={endDate} onChange={handleEndDate} id="input3" />
							</FormGroup>
						</div>
					</div>
				</Container>
				<Container>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between' }}>
						{nasaPhotos ? (
							nasaPhotos.map((photo) => {
								const { title, explanation, url, date } = photo;
								return <PictureCard setChoosePhoto={setChoosePhoto} title={title} explanation={explanation} url={url} date={date} />;
							})
						) : (
							<div style={{ height: '50vh', color: 'white' }}> No Photos Available'</div>
						)}
					</div>
				</Container>
			</div>
		</ToastProvider>
	);
}

export default App;
