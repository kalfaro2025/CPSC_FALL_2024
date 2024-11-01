
const Chart = window.Chart;
// Get the context of the canvas element we want to select
window.onload = function() {
  fetch('LittleSpokaneRiver.csv')
  .then(response => response.text())
  .then(csvData => {
    const rows = csvData.split('\n');
    const data = rows.map(row => row.split(','));

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dates = data.map(row => {
      const date = new Date(row[0]);
      if (!isNaN(date.getTime())) {
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${year}`;
      } else {
        return ''; 
      }
    });
    
    const temperatures = data.map(row => parseFloat(row[3]));
    
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatures,
          borderColor: 'brown',
          borderWidth: 2,
          cubicInterpolationMode: 'monotonic',
          pointRadius: 0,
        }]
      },
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)'
            },
            ticks: {
                maxTicksLimit: 20,
                stepSize: 2
            },
            grid: {
                display: false
            }
          },
          x: {
            title: {
              display: true,
            },
            ticks: {
                maxTicksLimit: 25
            },
            grid: {
                display: false
            },
          },
        },
        width: 200,
        height: 200
      },
    });
  });
}
