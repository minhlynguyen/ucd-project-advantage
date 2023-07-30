import { ALL_AGES, BIG_CATE } from "../constants";


export const getPieDataForGender = (gender, data1, data2=null) => {
    let arr = data1.arr;
    let label = data1.label;
    let index;
    let cut;
    if (gender === 'female') {
      index = [0, 10];
      cut = 8;
    } else {
      index = [10, 20];
      cut = 6;
    }
    const commonSettings = {
      backgroundColor: [
        'rgba(255,99,132,0.5)', 
        'rgba(54,162,235,0.5)', 
        'rgba(255,206,86,0.5)', 
        'rgba(75,192,192,0.5)', 
        'rgba(153,102,255,0.5)', 
        'rgba(255,159,64,0.5)',
        'rgba(199,132,80,0.5)',
        'rgba(233,236,244,0.5)',
        'rgba(128,128,0,0.5)',
        'rgba(128,0,0,0.5)'
      ],
      borderColor: [
        'rgba(255,99,132,1)', 
        'rgba(54,162,235,1)', 
        'rgba(255,206,86,1)', 
        'rgba(75,192,192,1)', 
        'rgba(153,102,255,1)', 
        'rgba(255,159,64,1)',
        'rgba(199,132,80,1)',
        'rgba(233,236,244,1)',
        'rgba(128,128,0,1)',
        'rgba(128,0,0,1)'
      ],
      borderWidth: 1
    };
    let datasets = [
      {
        ...commonSettings,
        label: label,
        data: arr
      }
    ];
    if(data2) {
      datasets.push({
        ...commonSettings,
        label: data2.label,
        data: data2.arr
      });
    }
    let data = {
      labels: ALL_AGES.slice(index[0], index[1]).map(item => item.age.slice(cut)),
      datasets: datasets
    };
    return data;
};


export const getPieOptionsForGender = (gender) => {
    const pieOptions = {
      plugins: {
          legend: {
              labels: {
                  color: 'white',
              },
              position: 'left',
              align: 'end',
          },
          title: {
              display: true,
              text: gender + ' Distribution',
              color: 'white',
          },
      },
    };
    return pieOptions;
};

export const getBarOptions = () => {
    let businessOptions = {
        scales: {
            x: {
                ticks: {
                    display: false,
                    color: 'white',
                },
                title: {
                    display: true,
                    text: 'Business Category',
                    color: 'white', 
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white', 
                },
                title: {
                    display: true,
                    text: 'Number',
                    color: 'white', 
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Business Distribution',
                color: 'white', 
            },
        },
    };
    return businessOptions;
};

export const getLineData = (mode, zone1, zone2=null) => {

    const items1 = (mode === 'Ad') ? zone1.properties.impression.adTime.items : zone1.properties.impression.realTime.items;
    
    const LineData = {
        labels: items1.map(item => convertToBriefDateString(item.time)), // Assume that time is same for both zone
        datasets: [
          {
            label: `${zone1.properties.name} (total)`,
            data: items1.map(item => item.value),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: `${zone1.properties.name} (valid)`,
            data: items1.map(item => item.validValue),
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
    };
    if (zone2) {
        const items2 = (mode === 'Ad') ? zone2.properties.impression.adTime.items : zone2.properties.impression.realTime.items;
        LineData.datasets.push(
            {
                label: `${zone2.properties.name} (total)`,
                data: items2.map(item => item.value),
                fill: false,
                backgroundColor: 'rgb(153, 102, 255)',
                borderColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
                label: `${zone2.properties.name} (valid)`,
                data: items2.map(item => item.validValue),
                fill: false,
                backgroundColor: 'rgb(255, 159, 64)',
                borderColor: 'rgba(255, 159, 64, 0.2)',
            }
        );
    }
    return LineData;
};

export const getLineOptions = (mode) => {
    const LineOptions = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Impression for ${mode} Time`,
            color: 'white', 
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
          legend: {
            display: true,
            labels: {
              color: 'white',
            }, 
          }
        },
        interaction: {
          mode: 'nearest',
          intersect: true,
          axis: 'x'
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time',
              color: 'white', 
            },
            ticks: {
              color: 'white',
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Impression',
              color: 'white', 
            },
            ticks: {
              color: 'white', 
            },
            beginAtZero: true
          },
        },
    };
    return LineOptions;
};

export const getBarData = (data1, data2=null) => {

    const categoriesDataZone1 = data1.arr;
    const labelZone1 = data1.label;

    let BarData = {
        labels: BIG_CATE,
        datasets: [
          {
            label: labelZone1,
            data: categoriesDataZone1,
            backgroundColor: ['rgba(255, 99, 132, 0.5)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          }
        ],
    };
    if (data2) {
        const categoriesDataZone2 = data2.arr;
        const labelZone2 = data2.label;
        BarData.datasets.push(
            {
                label: labelZone2,
                data: categoriesDataZone2,
                backgroundColor: ['rgba(54, 162, 235, 0.5)'],
                borderColor: ['rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            }
        );
    }
    return BarData;
};