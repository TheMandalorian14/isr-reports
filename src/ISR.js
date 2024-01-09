import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Isr = () => {
  const [data, setData] = useState([]);
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

  return (
    <div>
      <h1>Welcome to GROGU's REACT</h1>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item) => (
          <div key={item.catcode}>
            <p>Site Name: {item.siteName}</p>
            <p>Facility Number: {item.facNo}</p>
            <p>Catcode: {item.catcode}</p>
            <p>Description: {item.desc}</p>
            <p>Mission: {item.mission}</p>
            <p>Quality: {item.qual}</p>
            <p>QIC: {item.qic}</p>
            <p>Mission Cost: {item.missioncost}</p>
            <p>Q1: {item.q1}</p>
            <p>Q2: {item.q2}</p>

            {item.components.map((component) => (
              <div key={component.desc}>
                <p>Component Description: {component.desc}</p>
                <p>Quality Rating: {component.qrating}</p>
                <p>Mission Rating: {component.frating}</p>
                <p>QIC: {component.qic}</p>
                <p>Weight: {component.weight}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Isr;
