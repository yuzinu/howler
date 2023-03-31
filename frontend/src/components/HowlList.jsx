import React from 'react';
import HowlPreview from './HowlPreview';

const HowlList = ({ howls }) =>
	<ul>
		{howls.map(howl => <HowlPreview key={howl.id} {...howl} />)}
	</ul>

export default HowlList;
