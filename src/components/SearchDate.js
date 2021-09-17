import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const SearchDate = ({ text, startDate, endDate, handleSetText, handleStartDate, handleEndDate }) => {
	return (
		<div>
			<div>
				<div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBlock: '2em' }}>
					<FormGroup>
						<Label className="label" for="title-input-label">
							Change Text For New Title
						</Label>
						<Input type="text" value={text} onChange={handleSetText} id="title-input-label" />
					</FormGroup>
					<FormGroup>
						<Label className="label" for="start-date-input">
							Photo Taken After
						</Label>
						<Input type="date" value={startDate} onChange={handleStartDate} id="start-date-input" />
					</FormGroup>
					<FormGroup>
						<Label className="label" for="end-date-input">
							Photo Taken Before
						</Label>
						<Input type="date" value={endDate} onChange={handleEndDate} id="end-date-input" />
					</FormGroup>
				</div>
			</div>
		</div>
	);
};

export default SearchDate;
