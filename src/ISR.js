import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SiteInformation from './Components/SiteInformation';

const Isr = () => {
  const [data, setData] = useState([]);
  const [selectedCatCode, setSelectedCatCode] = useState(null);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const { siteuid, rpauid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://grogu/isr/rest/query?siteuid=${siteuid}&rpauid=${rpauid}`, {
          // Add any other parameters or headers if needed
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [siteuid, rpauid]);

  const handleClick = async (catCode) => {
    console.log('Row clicked! CatCode:', catCode);
    setSelectedCatCode(catCode);

    // Filter components based on the selected CatCode's parent catcode
    const newFilteredComponents = data
      .filter(item => item.catcode === catCode)
      .reduce((acc, item) => acc.concat(item.components), []);

    setFilteredComponents(newFilteredComponents);
  };

  return (
    <div>
      <h1>Welcome to GROGU's REACT</h1>
      {Array.isArray(data) && data.length > 0 ? (
        <SiteInformation
          SiteName={data.map((item) => item.siteName)}
          FacilityNumber={data.map((item) => item.facNo)}
          CatCode={data.map((item) => item.catcode)}
          Description={data.map((item) => item.catcode)}
          Mission={data.map((item) => item.mission)}
          Quality={data.map((item) => item.qual)}
          QIC={data.map((item) => item.qic)}
          MissionCost={data.map((item) => item.missioncost)}
          Q1={data.map((item) => item.q1)}
          Q2={data.map((item) => item.q2)}
          onClickRow={handleClick}
        />
      ) : (
        <p>Loading...</p>
      )}

      {/* Display filtered components in a new table */}
      <h2>Filtered Components</h2>
      {Array.isArray(filteredComponents) && filteredComponents.length > 0 ? (
        <table>
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

export default Isr;
