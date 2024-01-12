
export const getMissionRatingStyle = (value) => {
    if (value === 'GREEN' || value === 'F1') {
      return { backgroundColor: 'green' };
    } else if (value === 'RED' || value === 'F3') {
      return { backgroundColor: 'red' };
    } else if (value === 'N/A') {
      return { backgroundColor: '' };
    } else if (value === 'AMBER' || value === 'F2') {
      return { backgroundColor: 'yellow' };
    }
    return {};
  };
  
  export const formatDollars = (value) => {
    const roundedValue = Math.ceil(value);
  
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roundedValue);
  
    return formattedValue.replace(/\.00$/, ''); 
  };
  
  
  export const getQualityRatingStyle = (value) => {
    if(value === 'Q1'){
      return {backgroundColor: 'green'};
    }else if(value === 'N/A'){
      return {backgroundColor: ''};
    }
  }
  