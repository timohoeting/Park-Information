export class BarWeekOptions {
    public datasets = [ {
        showTooltips: false,
        label: "Auslastung",
        data: [1.5, 1.3, 0.5, 1.9, 2.3, 2.5, 3]
        }
    ];

    public colors = [{
      backgroundColor :"rgba(76,175,79,0.44)",
      borderColor : "rgba(22,126,196,0)",
      pointBackgroundColor : "rgba(255,255,245,1)",
      pointBorderColor : "rgba(255,255,255,1.00)"
    }]

    public labels = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

    private options = {
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
          if (category >= 0 && category < 2){
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