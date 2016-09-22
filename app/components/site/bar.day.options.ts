export class BarDayOptions {
    public datasets = [ {
        showTooltips: false,
        label: "Auslastung",
        data: [2,3,1,2,3,1,2,3,2,1,3,2,1,3,2,3,1,2,3,1,2,3,1,2]
        }
    ];

  public colors = [{
    backgroundColor :"rgba(76,175,79,0.44)",
    borderColor : "rgba(22,126,196,0)",
    pointBackgroundColor : "rgba(255,255,245,1)",
    pointBorderColor : "rgba(255,255,255,1.00)"
  }]

    public labels = ['0 Uhr','','','4 Uhr','','','','8 Uhr','','','','12 Uhr','','','','16 Uhr','','','','20 Uhr','','','','24 Uhr',];

    public options = {
      legend: false,
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          let category = parseInt(tooltipItem.yLabel);
          if (category >= 4){
            return "Sehr viele freie Plätze."
          }
          if (category >= 3 && category < 4){
            return "Viele freie Plätze."
          }
          if (category >= 2 && category < 3){
            return "Wenige freie Plätze."
          }
          if (category >= 1 && category < 2){
            return "Sehr wenige freie Plätze."
          }
        }
      }
    },
      scales: {
        yAxes: [{
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
            drawOnChartArea: false,
            drawTicks: false,
        },
          ticks: {
            beginAtZero: true
          },
          display: false,
        }],
        xAxes : [{
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
            drawOnChartArea: false,
            drawTicks: false,
            }
        }]
      }
    };

}