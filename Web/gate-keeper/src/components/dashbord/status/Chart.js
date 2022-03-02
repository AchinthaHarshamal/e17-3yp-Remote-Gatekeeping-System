import React from 'react';
import { Line } from 'react-chartjs-2';


const Chart = () => {

    var today = new Date()
    today.setDate(today.getDate() - 6);
    //console.log(today.getDate())
    const xlabels = []
    for(let i = 0 ; i< 6 ; i++){
        today.setDate(today.getDate() + 1);
        xlabels.push( today.getDate() +'/'+ today.getMonth().toString()  )
        
    }
   
    const data = {
        labels: xlabels,
        datasets: [
          {
            label: 'Number of Messages',
            data: [0, 0, 0, 1, 6, 0],
            fill: false,
            backgroundColor: 'rgb(245, 216, 51)',
            borderColor: 'rgba(137, 118, 8, 0.3)',
          },
        ],
    };

    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    return (
        <div className='mainChart'>
            <h5>Device Usage</h5>
            <div className='container'>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default Chart

// const today = new Date()
// const date = today.getDate()




