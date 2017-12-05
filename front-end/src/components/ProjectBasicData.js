import React from 'react';

const ProjectBasicData = ({data}) => {
  const up = data.lat + 0.1,
        down = data.lat - 0.1,
        left = data.lng - 0.1,
        right = data.lng + 0.1,
        src = `http://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${down}%2C${right}%2C${up}&amp;layer=mapnik&marker=${data.lat}%2C${data.lng}`;

  return (
    <div>
      <p>Analicemos el proyecto *{data.project}*, ubicado en *{data.city}*, *{data.region}*:</p>
      <p>Constructor: *{data.constructor}*</p>
      <p>Familias encuestadas: {data.total}</p>
      <iframe width="425" height="350" frameborder="0" scrolling="no" marginHeight="0" marginWidth="0" src={src} ></iframe>
    </div>
  );
};

export default ProjectBasicData;
