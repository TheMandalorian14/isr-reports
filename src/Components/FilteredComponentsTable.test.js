import React from 'react';
import { render } from '@testing-library/react';
import FilteredComponentsTable from './FilteredComponentsTable'; // Adjust the import path

// Mock data for testing
const mockFilteredComponents = [
  {
    desc: 'Component 1',
    qrating: 'High',
    frating: 'Good',
    qic: '123',
    weight: '10',
  },
  // Add more sample data as needed
];

describe('FilteredComponentsTable Component', () => {
  test('renders table with correct headers', () => {
    const { getByText } = render(<FilteredComponentsTable filteredComponents={mockFilteredComponents} />);

    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Quality Rating')).toBeInTheDocument();
    expect(getByText('Mission Rating')).toBeInTheDocument();
    expect(getByText('QIC')).toBeInTheDocument();
    expect(getByText('Weight')).toBeInTheDocument();
  });

  test('renders table rows with correct data', () => {
    const { getByText } = render(<FilteredComponentsTable filteredComponents={mockFilteredComponents} />);

    // Check if the table rows contain the expected data
    mockFilteredComponents.forEach((component) => {
      expect(getByText(component.desc)).toBeInTheDocument();
      expect(getByText(component.qrating)).toBeInTheDocument();
      expect(getByText(component.frating)).toBeInTheDocument();
      expect(getByText(component.qic)).toBeInTheDocument();
      expect(getByText(component.weight)).toBeInTheDocument();
    });
  });

  test('renders loading message when no components are provided', () => {
    const { getByText } = render(<FilteredComponentsTable filteredComponents={[]} />);

    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
