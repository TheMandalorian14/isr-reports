import React from 'react';
import './FilteredComponentsTable.css';

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
                <td>{component.desc}</td>
                <td>{component.qrating}</td>
                <td>{component.frating}</td>
                <td>{component.qic}</td>
                <td>{component.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No filtered components available</p>
      )}
    </div>
  );
};

export default FilteredComponentsTable;
