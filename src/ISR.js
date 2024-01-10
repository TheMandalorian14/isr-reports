import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SiteInformation from './Components/SiteInformation';

const Isr = () => {
  const [data, setData] = useState([]);
  const [selectedCatCode, setSelectedCatCode] = useState(null); // State to store the selected CatCode
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

  const handleClick = (catCode) => {
    // Handle click event, you can do something with the selected CatCode
    console.log('Row clicked! CatCode:', catCode);
    setSelectedCatCode(catCode);
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
          onClickRow={handleClick} // Pass the handleClick function to SiteInformation
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Isr;
