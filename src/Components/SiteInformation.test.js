import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SiteInformation from './SiteInformation'; // Replace with the actual path

// Mock data for testing
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

// Mock function for onClickRow
const mockOnClickRow = jest.fn();

describe('SiteInformation Component', () => {
  test('renders table with correct data and handles click event', () => {
    const { queryAllByText, getByText } = render(
      <SiteInformation {...mockData} onClickRow={mockOnClickRow} />
    );

    // Check if each CatCode has a corresponding element with the formatted mission cost
    mockData.CatCode.forEach((catCode, index) => {
      const missionCostFormatted = mockData.MissionCost[index].toLocaleString();
      const missionCostElements = queryAllByText('$' + missionCostFormatted + '.00');
      expect(missionCostElements).toHaveLength(1);

      const missionElements = queryAllByText(mockData.Mission[index]);
      expect(missionElements).toHaveLength(1);

      const qualityElements = queryAllByText(mockData.Quality[index]);
      expect(qualityElements).toHaveLength(1);

      // Add other assertions as needed...
    });

    // Simulate a click event on the first row
    fireEvent.click(getByText('Description 1', { selector: 'td' }));

    // Check if the onClickRow function is called with the correct CatCode
    expect(mockOnClickRow).toHaveBeenCalledWith('A');
  });
});
