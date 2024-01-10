import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SiteInformation from './Components/SiteInformation';
import FilteredComponentsTable from './Components/FilteredComponentsTable';

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

        // Extract the catcode from the first row
        const defaultCatCode = response.data.length > 0 ? response.data[0].catcode : null;
        console.log('Default CatCode:', defaultCatCode); // Log the defaultCatCode
        setSelectedCatCode(defaultCatCode);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [siteuid, rpauid]);

  useEffect(() => {
    // Call handleClick with the defaultCatCode to update filtered components
    if (selectedCatCode) {
      handleClick(selectedCatCode);
    }
  }, [selectedCatCode]); // Run this effect whenever selectedCatCode changes

  const handleClick = async (catCode) => {
    console.log('Row clicked! CatCode:', catCode);
    setSelectedCatCode(catCode);

    // Filter components based on the selected CatCode's parent catcode
    const newFilteredComponents = data
      .filter(item => item.catcode === catCode)
      .reduce((acc, item) => acc.concat(item.components), []);
    
    console.log('Filtered Components:', newFilteredComponents); // Log the newFilteredComponents
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
      <FilteredComponentsTable filteredComponents={filteredComponents} />
    </div>
  );
};

export default Isr;
