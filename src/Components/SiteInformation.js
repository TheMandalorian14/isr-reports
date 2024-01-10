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
  const formatDollars = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <table className="site-information-table">
      <tbody>
        <tr>
          <th>Catcode</th>
          <th>Description</th>
          <th>Mission Rating</th>

          <th>Mission Cost</th>
          <th>Quality Rating</th>
          <th>Cost to Q1</th>
          <th>Cost to Q2</th>
          <th>Total Cost</th>
        </tr>
        {SiteName.map((site, index) => (
          <tr
            key={index}
            title="Please click to change the Cat Code"
            onClick={() => handleClick(CatCode[index])} // Pass the clicked CatCode to handleClick
            className="clickable-row"
            style={{ cursor: 'pointer' }}
          >
            <td>{CatCode[index]}</td>
            <td>{Description[index]}</td>
            <td>{Mission[index]}</td>

            <td>{formatDollars(MissionCost[index])}</td>

            <td>{Quality[index]}</td>
            
            <td>{formatDollars(Q1[index])}</td>
            <td>{formatDollars(Q2[index])}</td>
            <td>{formatDollars(QIC[index])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SiteInformation;
