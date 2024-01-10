import React from 'react';
import './SiteInformation.css';

const SiteInformation = ({
  SiteName,
  FacilityNumber,
  CatCode,
  Description,
  Mission,
  Quality,
  QIC,
  MissionCost,
  Q1,
  Q2,
  onClickRow, // Pass the onClickRow function as a prop
}) => {
  const handleClick = (catCode) => {
    // Handle click event and pass the clicked CatCode to the parent component
    onClickRow(catCode);
  };

  return (
    <table className="site-information-table">
      <tbody>
        <tr>
          <th>Site Name:</th>
          <th>Facility Number:</th>
          <th>Catcode:</th>
          <th>Description:</th>
          <th>Mission:</th>
          <th>Quality:</th>
          <th>QIC:</th>
          <th>Mission Cost:</th>
          <th>Q1:</th>
          <th>Q2:</th>
        </tr>
        {SiteName.map((site, index) => (
          <tr
            key={index}
            title="Please click to change the Cat Code"
            onClick={() => handleClick(CatCode[index])} // Pass the clicked CatCode to handleClick
            className="clickable-row"
            style={{ cursor: 'pointer' }}
          >
            <td>{site}</td>
            <td>{FacilityNumber[index]}</td>
            <td>{CatCode[index]}</td>
            <td>{Description[index]}</td>
            <td>{Mission[index]}</td>
            <td>{Quality[index]}</td>
            <td>{QIC[index]}</td>
            <td>{MissionCost[index]}</td>
            <td>{Q1[index]}</td>
            <td>{Q2[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SiteInformation;
