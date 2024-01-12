import React, { useState } from 'react';
import './SiteInformation.css';
import { formatDollars, getMissionRatingStyle, getQualityRatingStyle } from './tableStyling';

const SiteInformation = ({
  SiteName,
  CatCode,
  Description,
  Mission,
  Quality,
  QIC,
  MissionCost,
  Q1,
  Q2,
  onClickRow,
}) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleClick = (catCode, index) => {
    onClickRow(catCode);
    setSelectedRowIndex(index); 
  };

  return (
    <table className="site-information-table">
      <tbody>
        <tr>
          <th>Catcode</th>
          <th>Description</th>
          <th>Mission Cost</th>
          <th>Mission Rating</th>
          <th>Quality Rating</th>
          <th>Cost to Q1</th>
          <th>Cost to Q2</th>
          <th>Total Cost</th>
        </tr>
        {SiteName.map((site, index) => (
          <tr
            key={index}
            title="Please click to change the Cat Code"
            onClick={() => handleClick(CatCode[index], index)}
            className={`clickable-row ${selectedRowIndex === index ? 'selected-row' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <td>{CatCode[index]}</td>
            <td>{Description[index]}</td>
            <td>{formatDollars(MissionCost[index])}</td>
            <td style={getMissionRatingStyle(Mission[index])}>{Mission[index]}</td>
            <td style={getQualityRatingStyle(Quality[index])}>{Quality[index]}</td>
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
