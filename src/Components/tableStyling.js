
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
    // Default style
    return {};
  };
  
  export const formatDollars = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  export const getQualityRatingStyle = (value) => {
    if(value === 'Q1'){
      return {backgroundColor: 'green'};
    }else if(value === 'N/A'){
      return {backgroundColor: ''};
    }
  }
  