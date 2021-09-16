import { memo, useState } from 'react';
import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { HiOutlineShare, HiShare } from 'react-icons/hi';
import { useToasts } from 'react-toast-notifications';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { motion } from 'framer-motion';
import useWindowDimensions from '../hooks/windowDimensions';

const PictureCard = memo(({ title, explanation, url, date, setChoosePhoto }) => {
	const [seeMore, setSeeMore] = useState(false);
	const [pinPhoto, setPinPhoto] = useState(false);
	const [pictureLiked, setPictureLiked] = useState(false);
	const [sharedLink, setSharedLink] = useState(false);
	const { height, width } = useWindowDimensions();
	const { addToast } = useToasts();

	const handleSeeMore = () => {
		setSeeMore(!seeMore);
		console.log(seeMore);
	};

	const handlePinning = () => {
		let pinningText, appearance;
		if (!pinPhoto) {
			setChoosePhoto(url);
			setPinPhoto(true);
			pinningText = `Pinned Photo - ${title}`;
			appearance = `success`;
		} else {
			setPinPhoto(false);
			pinningText = `Unpinned Photo - ${title}`;
			appearance = `error`;
		}

		addToast(pinningText, {
			appearance: appearance,
			autoDismiss: true,
		});
	};

	const handleLiking = () => {
		setPictureLiked(!pictureLiked);

		const likingText = !pictureLiked ? `Liked - ${title}` : `Unliked - ${title}`;
		const appearance = !pictureLiked ? `success` : `error`;

		addToast(likingText, {
			appearance: appearance,
			autoDismiss: true,
		});
	};

	const handleSharing = () => {
		setSharedLink(true);
		navigator.clipboard.writeText(url);
		addToast(`Copied Link - ${title}`, {
			appearance: 'info',
			autoDismiss: true,
		});

		setTimeout(() => {
			setSharedLink(false);
		}, 1000);
	};

	return (
		<motion.div layout data-isOpen={seeMore} className="parent card card1">
			<div style={width > 700 && seeMore ? { display: 'flex' } : {}}>
				<CardImg
					top
					style={seeMore ? { maxHeight: height - 100 } : { objectFit: 'fill', width: '100%', height: '300px' }}
					src={url.includes('youtube') || url.includes('vimeo') ? '/no_photo_available.png' : url}
					alt="Card image cap"
				/>
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
						{pinPhoto ? <AiFillPushpin onClick={handlePinning} size={'2.0em'} color={'#28A744'} /> : <AiOutlinePushpin onClick={handlePinning} size={'2.0em'} color={'#28A744'} />}
						{pictureLiked ? <IoHeartSharp onClick={handleLiking} size={'2.0em'} color={'red'} /> : <IoHeartOutline onClick={handleLiking} size={'2.0em'} color={'red'} />}
						{sharedLink ? <HiShare size={'2.0em'} color={'#007bff'} /> : <HiOutlineShare onClick={handleSharing} size={'2.0em'} color={'#007bff'} />}
					</div>
				</CardBody>
			</div>
		</motion.div>
	);
});

export default PictureCard;
