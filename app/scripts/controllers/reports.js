'use strict';

angular.module('sweduphxApp').controller('ReportsCtrl', ["$scope", "$http", "$socket", "$timeout", function ($scope, $http, $socket, $timeout) {
    var applyTheme = function(){
        /**
         * Dark theme for Highcharts JS
         * @author Torstein Honsi
         */

// Load the fonts
        Highcharts.createElement('link', {
            href: 'http://fonts.googleapis.com/css?family=Unica+One',
            rel: 'stylesheet',
            type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);

        Highcharts.theme = {
            colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: "'Unica One', sans-serif"
                },
                plotBorderColor: '#606063'
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'

                    }
                }
            },
            yAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#B0B0B3'
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            legend: {
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },

            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },

            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },

            // scroll charts
            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#CCC'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },

            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },

            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            },

            // special colors for some of the
            legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
            background2: '#505053',
            dataLabelsColor: '#B0B0B3',
            textColor: '#C0C0C0',
            contrastTextColor: '#F0F0F3',
            maskColor: 'rgba(255,255,255,0.3)'
        };

// Apply the theme
        Highcharts.setOptions(Highcharts.theme);
    };
    var initChart = function(){
        $(function () {
            $('#container').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Top Performing Students'
                },
                subtitle: {
                    text: 'In-Gauge'
                },
                xAxis: {
                    categories: [
                        '1st Quarter',
                        '2nd Quarter',
                        '3rd Quarter'
                    ]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'GPA'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                 '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Aislin',
                    data: [3.8, 3.7, 3.9]

                }, {
                    name: 'Desmond',
                    data: [2.5, 2.9, 3.2]

                }, {
                    name: 'Lincoln',
                    data: [3.8, 2.5, 1.9]

                }, {
                    name: 'Tobias',
                    data: [1.5, 2.0, 0]

                }]
            });
        });

    }
    var initChart2 = function(){
        $(function () {
            $('#container2').highcharts({
                title: {
                    text: 'Monthly Feedback',
                    x: -20 //center
                },
                xAxis: {
                    categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb',
                        'Mar', 'Apr', 'May']
                },
                yAxis: {
                    title: {
                        text: 'Number of "Slow Downs"'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Asilin',
                    data: [8, 7, 5, 3, 1, 2, 0, 0, 5]
                }, {
                    name: 'Desmond',
                    data: [5, 6, 13, 9, 4, 1, 0, 15, 20]
                }, {
                    name: 'Lincoln',
                    data: [1, 4, 3, 1, 5, 6, 8, 3, 7]
                }, {
                    name: 'Tobias',
                    data: [15, 11, 10, 7, 6, 4, 2, 1, 0]
                }]
            });
        });


    };
    var initChart3 = function(){
        $(function () {
            $(document).ready(function() {
                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                $('#container3').highcharts({
                    chart: {
                        type: 'spline',
                        animation: Highcharts.svg, // don't animate in old IE
                        marginRight: 10,
                        events: {
                            load: function() {

                                // set up the updating of the chart each second
                                var series = this.series[0];
                                setInterval(function() {
                                    var x = (new Date()).getTime(), // current time
                                        y = Math.random();
                                    series.addPoint([x, y], true, true);
                                }, 1000);
                            }
                        }
                    },
                    title: {
                        text: 'Live student performance data'
                    },
                    xAxis: {
                        type: 'datetime',
                        tickPixelInterval: 150
                    },
                    yAxis: {
                        title: {
                            text: 'Value'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>'+ this.series.name +'</b><br/>'+
                                   Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                                   Highcharts.numberFormat(this.y, 2);
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    series: [{
                        name: 'Live student performance data',
                        data: (function() {
                            // generate an array of random data
                            var data = [],
                                time = (new Date()).getTime(),
                                i;

                            for (i = -19; i <= 0; i++) {
                                data.push({
                                    x: time + i * 1000,
                                    y: Math.random()
                                });
                            }
                            return data;
                        })()
                    }]
                });
            });

        });
    }
    applyTheme();

    initChart();
    initChart2();
    initChart3();
    $http.get("/api/assessment").success(function(results){
        $scope.assessments = results;
    });
    $http.get("/api/poll").success(function(results){
        $scope.polls = results;
    });
}]);
