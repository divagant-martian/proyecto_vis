import React from 'react';
import { Card } from 'semantic-ui-react';

const ProjectBasicData = ({data}) => {
	const up = data.lat + 0.05,
		down = data.lat - 0.05,
		left = data.lon - 0.05,
		right = data.lon + 0.05,
		src = `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${down}%2C${right}%2C${up}&amp;layer=mapnik&marker=${data.lat}%2C${data.lon}`;

	return (
		<Card centered style={{width: 500}}>
			<iframe title="dasKartechen" width="500" height="350" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={src} ></iframe>
			<Card.Content>
				<Card.Header>{data.project}</Card.Header>
				<Card.Meta>
					<span>Constructor: {data.constructor}</span><br/>
					<span>Familias encuestadas: {data.total}</span>
				</Card.Meta>
				<Card.Description>
					Analicemos este proyecto ubicado en el municipio de {data.city} dentro de la región {data.region}.
				</Card.Description>        
			</Card.Content>
		</Card>
	);
};

export default ProjectBasicData;
