import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  donutData: any;
  donutOptions: any;
  
  verticalData: any;
  verticalOptions: any;

  stackedData: any;
  stackedOptions: any;
  horData: any;
  horOptions: any;
  lineData: any;
  lineOptions: any;
  ComboData: any;
  ComboOptions: any;
  
  activeCustomer =2
  inActiveCustomer =3
  dashboard:any

  customerDashboard: any = {};
  juristicDashboard: any = {};
  loanReqDashboard: any = {};
  creditReqDashboard: any = {};
  totalCustomerList: number = 0;
requestDashboard: any;


  constructor(private adminService:AdminService){}
  


  ngOnInit() {

    this.loadDonutChart();
    this.loadstackedchart();
    this.loadVerticalBarChart();
    this.loadLineChart();
    this.loadHorizontalBarChart()
    this.getDashboardData()
  }

  loadDonutChart() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.donutData = {
      labels: ['Customer', 'Juristic Person', 'Loan', 'Credit Card'],
      datasets: [
        {
          data: [10, 12, 7, 5],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--red-400'),
          ],
        },
      ],
    };

    this.donutOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }

  loadstackedchart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.stackedData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    this.stackedOptions  = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

  loadVerticalBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.verticalData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Current Year Sales',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Previous Year Sales',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.verticalOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }


  loadLineChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Revenue',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: 'Expenses',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
        },
      ],
    };

    this.lineOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.9,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }



  loadHorizontalBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.ComboData = {
        labels: ['Sept 05', 'Sept 06', 'Sept 07', 'Sept 08', 'Sept 09', 'Sept 10', 'Sept 11', 'Sept 12', 'Sept 13', 'Sept 14', ],
        datasets: [
            {
                type: 'line',
                label: 'Others',
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                data: [50, 25, 12, 48, 56, 76, 42, 22, 8, 13]
            },
            {
                type: 'bar',
                label: 'Juristic Person 2',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                data: [21, 84, 24, 75, 37, 65, 34, 20, 5, 42],
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'bar',
                label: 'Customer',
                backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                data: [41, 52, 24, 74, 23, 21, 32, 10, 28, 60]
            }
        ]
    };
    
    this.ComboOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.9,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}


getDashboardData() {
  this.adminService.get('/dashboardGet').subscribe((res) => {
    if (res.dataStatus) {
      this.customerDashboard = res.result.customerDashboard[0] || {};
      this.juristicDashboard = res.result.juristicDashboard[0] || {};
      this.loanReqDashboard = res.result.loanReqDashboard[0] || {};
      this.creditReqDashboard = res.result.creditReqDashboard[0] || {};

      this.totalCustomerList = this.calculateTotalRequests();

      console.log(this.customerDashboard, 'Customer Dashboard');
      console.log(this.juristicDashboard, 'Juristic Dashboard');
      console.log(this.loanReqDashboard, 'Loan Request Dashboard');
      console.log(this.creditReqDashboard, 'Credit Request Dashboard');
    } else {
      console.error('Failed to fetch dashboard data');
    }
  });
}


calculateTotalRequests(): number {
  const customerTotal = this.customerDashboard.total || 0;
  const juristicTotal = this.juristicDashboard.total || 0;
  const loanTotal = this.loanReqDashboard.total || 0;
  const creditTotal = this.creditReqDashboard.total || 0;

  return customerTotal + juristicTotal + loanTotal + creditTotal;
}

}
