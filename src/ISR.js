import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ISR.css';
import SiteInformation from './Components/SiteInformation';
import FilteredComponentsTable from './Components/FilteredComponentsTable';
import Button from './Components/Button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Isr = () => {
  const [data, setData] = useState([]);
  const [selectedCatCode, setSelectedCatCode] = useState(null);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [siteName, setSiteName] = useState('');
  const [facilityNumber, setFacilityNumber] = useState('');
  const { siteuid, rpauid } = useParams();
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://grogu/isr/rest/query?siteuid=${siteuid}&rpauid=${rpauid}`, {
          // Add any other parameters or headers if needed
        });
        setData(response.data);

        const defaultCatCode = response.data.length > 0 ? response.data[0].catcode : null;
        setSelectedCatCode(defaultCatCode);

        const defaultSiteName = response.data.length > 0 ? response.data[0].siteName : '';
        setSiteName(defaultSiteName);

        const defaultFacilityNumber = response.data.length > 0 ? response.data[0].facNo : '';
        setFacilityNumber(defaultFacilityNumber);

        const defaultDescription = response.data.length > 0 ? response.data[0].desc : '';
        setDescription(defaultDescription);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [siteuid, rpauid]);

  useEffect(() => {
    if (selectedCatCode) {
      handleClick(selectedCatCode);
    }
  }, [selectedCatCode]);

  const handleClick = async (catCode) => {
    setSelectedCatCode(catCode);

    const newFilteredComponents = data
      .filter(item => item.catcode === catCode)
      .reduce((acc, item) => acc.concat(item.components), []);
    
    setFilteredComponents(newFilteredComponents);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws_data = [
      ['ISR Facility Component Rating Report'],
      ['Site:', siteName],
      ['Facility Number:', facilityNumber],
      [''],
    ];
  
    if (Array.isArray(data) && data.length > 0) {
      ws_data.push(['SiteName', 'FacilityNumber', 'CatCode', 'Description', 'Mission', 'Quality', 'QIC', 'MissionCost', 'Q1', 'Q2']);
      data.forEach(item => {
        ws_data.push([
          item.siteName,
          item.facNo,
          item.catcode,
          item.desc,
          item.mission,
          item.qual,
          item.qic,
          item.missioncost,
          item.q1,
          item.q2,
        ]);
      });
    }
  
    ws_data.push(['', 'Component Ratings For:', selectedCatCode, description]);
    ws_data.push(['']);
    ws_data.push(['Component Ratings']);
    ws_data.push(['']);
    ws_data.push(['ComponentName', 'Rating']);
  
    filteredComponents.forEach(item => {
      ws_data.push([item.componentName, item.rating]);
    });
  
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
  
    // Use writeFile method
    XLSX.writeFile(wb, 'ISR_Facility_Component_Rating_Report.xlsx', { bookType: 'xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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
        <Button label={"Export to Excel"} onClick={exportToExcel} />
        <h4>Component Ratings For:</h4>
        <h4>{selectedCatCode}: {description}</h4>
        <FilteredComponentsTable filteredComponents={filteredComponents} />
      </div>
      <div className="stationary-bar bottom-bar">CUI</div>
    </div>
  );
};

export default Isr;
