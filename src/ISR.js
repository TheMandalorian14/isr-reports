import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ISR.css';
import SiteInformation from './Components/SiteInformation';
import FilteredComponentsTable from './Components/FilteredComponentsTable';
import Button from './Components/Button';

const Isr = () => {
  const [data, setData] = useState([]);
  const [selectedCatCode, setSelectedCatCode] = useState(null);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [siteName, setSiteName] = useState('');
  const [facilityNumber, setFacilityNumber] = useState('');
  const { siteuid, rpauid } = useParams();
  const [description, setDesciption] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://grogu/isr/rest/query?siteuid=${siteuid}&rpauid=${rpauid}`, {
          // Add any other parameters or headers if needed
        });
        setData(response.data);

        // Extract the catcode from the first row
        const defaultCatCode = response.data.length > 0 ? response.data[0].catcode : null;
        setSelectedCatCode(defaultCatCode);

        // Extract the siteName from the first row
        const defaultSiteName = response.data.length > 0 ? response.data[0].siteName : '';
        setSiteName(defaultSiteName);

        const defaultFacilityNumber = response.data.length > 0 ? response.data[0].facNo : '';
        setFacilityNumber(defaultFacilityNumber);

        const defaultDescription = response.data.length > 0 ? response.data[0].desc : '';
        setDesciption(defaultDescription);


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
    setSelectedCatCode(catCode);

    // Filter components based on the selected CatCode's parent catcode
    const newFilteredComponents = data
      .filter(item => item.catcode === catCode)
      .reduce((acc, item) => acc.concat(item.components), []);
    
    setFilteredComponents(newFilteredComponents);
  };

  return (
    <div>
      <div className="stationary-bar top-bar">CUI</div>
      <div className='content-area'>
        <h1>ISR Facility Component Rating Report</h1>
        <h4>Site: {siteName}</h4>
        <h4>Facility Number: {facilityNumber}</h4>
        {Array.isArray(data) && data.length > 0 ? (
          <SiteInformation
            SiteName={data.map((item) => item.siteName)}
            FacilityNumber={data.map((item) => item.facNo)}
            CatCode={data.map((item) => item.catcode)}
            Description={data.map((item) => item.desc)}
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
        <Button label={"Export to Excel"}/>
        {/* Display filtered components in a new table */}
        <h4>Component Ratings For:</h4>
        <h4>{selectedCatCode}: {description}</h4>
        <FilteredComponentsTable filteredComponents={filteredComponents} />
      </div>
      <div className="stationary-bar bottom-bar">CUI</div>
    </div>
  );
};

export default Isr;
