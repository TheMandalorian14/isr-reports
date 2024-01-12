import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SiteInformation from './SiteInformation'; 

const mockData = {
  SiteName: ['Site 1', 'Site 2'],
  CatCode: ['A', 'B'],
  Description: ['Description 1', 'Description 2'],
  Mission: ['High', 'Low'],
  Quality: ['Good', 'Average'],
  QIC: [500.0, 1200.0],
  MissionCost: [1000.0, 2000.0],
  Q1: [500.0, 600.0],
  Q2: [700.0, 1200.0],
};


const mockOnClickRow = jest.fn();

describe('SiteInformation Component', () => {
  test('renders table with correct data and handles click event', () => {
    const { queryAllByText, getByText } = render(
      <SiteInformation {...mockData} onClickRow={mockOnClickRow} />
    );


    mockData.CatCode.forEach((catCode, index) => {
      const missionCostFormatted = mockData.MissionCost[index].toLocaleString();
      const missionCostElements = queryAllByText('$' + missionCostFormatted);
      expect(missionCostElements).toHaveLength(1);

      const missionElements = queryAllByText(mockData.Mission[index]);
      expect(missionElements).toHaveLength(1);

      const qualityElements = queryAllByText(mockData.Quality[index]);
      expect(qualityElements).toHaveLength(1);


    });


    fireEvent.click(getByText('Description 1', { selector: 'td' }));


    expect(mockOnClickRow).toHaveBeenCalledWith('A');
  });
});
