import React from 'react';

const ProjectBasicData = ({data}) => {
  const up = data.lat + 0.05,
        down = data.lat - 0.05,
        left = data.lon - 0.05,
        right = data.lon + 0.05,
        src = `http://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${down}%2C${right}%2C${up}&amp;layer=mapnik&marker=${data.lat}%2C${data.lon}`;

  return (
    <div>
      <p>Analicemos el proyecto *{data.project}*, ubicado en la ciudad de *{data.city}* dentro de la región *{data.region}*:</p>
      <p>Constructor: *{data.constructor}*</p>
      <p>Familias encuestadas: {data.total}</p>
      <iframe width="425" height="350" frameborder="0" scrolling="no" marginHeight="0" marginWidth="0" src={src} ></iframe>
    </div>
  );
};

export default ProjectBasicData;
