declare const d3, nv: any;

/**
 * ChartService to define the chart config for D3
 */
export class D3ChartService {

  static getChartConfig() {
    return {
      chart: {
        type: 'pieChart',
        height: 300,
        x(d) {
          return d.key;
        },
        y(d) {
          return d.y;
        },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 10,
            bottom: 5,
            left: 10
          }
        },
        callback() {
          d3.selectAll('.nv-legend-text').style('fill', 'white');
        }
      },
      title: {
        enable: true
      }
    };
  }
}
