import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { JediService } from '../jedi.service';
import { Jedi } from '../Jedi';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jedis: Observable<Jedi[]>;
  chartStatus: Chart;
  chartPlanet: Chart;

  constructor(private jediService: JediService) { }

  ngOnInit() {
    this.getJedis();
    this.getChartStatus();
    this.getChartPlanet();
  }

  getJedis(): void {
    this.jedis = this.jediService.getJedis();
  }

  getChartStatus(): void {
    this.jedis.forEach(next => {
      const seriesDataStatus = {};

      for (var i = 0; i < next.length; i++) {
        const status = next[i].status.id;
        if (seriesDataStatus.hasOwnProperty(status)) {
          seriesDataStatus[status] = seriesDataStatus[status] + 1;
        } else {
          seriesDataStatus[status] = 1;
        }
      }

      const config = this.getConfig();
      for (var j in seriesDataStatus) {
        config['series'][0].data.push({
          name: j,
          y: seriesDataStatus[j]
        });
      }
      this.chartStatus = new Chart(config);

    });
  }

  getChartPlanet(): void {
    this.jedis.forEach(next => {
      const seriesDataPlanet = {};

      for (var i = 0; i < next.length; i++) {
        const planet = next[i].planet;
        if (seriesDataPlanet.hasOwnProperty(planet)) {
          seriesDataPlanet[planet] = seriesDataPlanet[planet] + 1;
        } else {
          seriesDataPlanet[planet] = 1;
        }
      }

      const config = this.getConfig();
      for (var j in seriesDataPlanet) {
        config['series'][0].data.push({
          name: j,
          y: seriesDataPlanet[j]
        });
      }
      this.chartPlanet = new Chart(config);

    });
  }

  getConfig(): object {
    return {
      chart: {
        type: 'pie'
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.y} ({point.percentage:.1f} %)',
          }
        }
      },
      series: [
        {
          name: 'Jedis',
          data: []
        },
      ]
    };
  }

}
