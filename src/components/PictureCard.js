import { memo, useState } from 'react';
import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5';
import { AiOutlineShareAlt } from 'react-icons/ai';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const PictureCard = memo(({ title, explanation, url, date }) => {
	const [seeMore, setSeeMore] = useState(false);
	const [pictureLiked, setPictureLiked] = useState(false);
	console.log(url);
	const handleSeeMore = () => {
		setSeeMore(!seeMore);
		console.log(seeMore);
	};

	const handleLiking = () => {
		setPictureLiked(!pictureLiked);
	};
	const marginInline = { marginInline: 5 };

	return (
		<Card className="card1">
			<CardImg top style={{ objectFit: 'fill', width: '100%', height: '300px' }} src={url.includes('youtube') || url.includes('vimeo') ? '/no_photo_available.png' : url} alt="Card image cap" />
			<CardBody>
				<CardTitle tag="h5" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: seeMore ? '' : 'nowrap' }}>
					{title}
				</CardTitle>
				<CardSubtitle tag="h6" className="mb-2 text-muted">
					{date}
				</CardSubtitle>
				<CardText className={seeMore ? '' : 'card-text-hidden'}>{explanation}</CardText>
				<div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-around', marginRight: 10 }}>
					{seeMore ? <Button onClick={handleSeeMore}>Less ?</Button> : <Button onClick={handleSeeMore}>More?</Button>}
					{pictureLiked ? <IoHeartSharp onClick={handleLiking} size={'2.0em'} color={'red'} /> : <IoHeartOutline onClick={handleLiking} size={'2.0em'} color={'red'} />}
					<AiOutlineShareAlt size={'2.0em'} color={'#007bff'} />
				</div>
			</CardBody>
		</Card>
	);
});

export default PictureCard;
