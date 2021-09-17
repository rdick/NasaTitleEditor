import React from 'react';
import { Button } from 'reactstrap';

export const FontChangeButtons = ({ font, setFont }) => {
	const font1 = 'Alfa Slab One, cursive';
	const font2 = 'Cinzel Decorative, cursive';
	const font3 = 'Black Ops One, cursive';
	const font4 = 'Monoton, cursive';
	const font5 = 'Titan One, cursive';
	return (
		<div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
			<Button style={{ fontFamily: font1 }} color={font === font1 ? 'success' : 'secondary'} onClick={() => setFont(font1)}>
				Choose Font!
			</Button>
			<Button style={{ fontFamily: font2 }} color={font === font2 ? 'success' : 'secondary'} onClick={() => setFont(font2)}>
				Choose Font!
			</Button>
			<Button style={{ fontFamily: font3 }} color={font === font3 ? 'success' : 'secondary'} onClick={() => setFont(font3)}>
				Choose Font!
			</Button>
			<Button style={{ fontFamily: font4 }} color={font === font4 ? 'success' : 'secondary'} onClick={() => setFont(font4)}>
				Choose Font!
			</Button>
			<Button style={{ fontFamily: font5 }} color={font === font5 ? 'success' : 'secondary'} onClick={() => setFont(font5)}>
				Choose Font!
			</Button>
		</div>
	);
};
