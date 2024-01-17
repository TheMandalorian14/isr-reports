import React from 'react';
import './FilteredComponentsTable.css';
import { getMissionRatingStyle } from './tableStyling';

const FilteredComponentsTable = ({ filteredComponents }) => {


  return (
    <div>
      {Array.isArray(filteredComponents) && filteredComponents.length > 0 ? (
        <table className='site-information-table'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quality Rating</th>
              <th>Mission Rating</th>
              <th>QIC</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {filteredComponents.map((component, index) => (
              <tr key={index}>
                <td title={component.desc}>{component.desc}</td>
                <td title={component.qrating}>{component.qrating}</td>
                <td  title={component.frating} style={getMissionRatingStyle(component.frating)}>
                  {component.frating}</td>
                <td title={component.qic}>{component.qic}</td>
                <td title={component.weight}>{component.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FilteredComponentsTable;
