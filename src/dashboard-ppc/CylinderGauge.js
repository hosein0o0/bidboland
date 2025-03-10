import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { Component } from 'react'
am4core.useTheme(am4themes_animated);
class CylinderGauge extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps
        }
    }
    componentDidMount() {
        if (am4core && am4charts) {
            this.StartChart()
        }
    }
    StartChart = () => {
        let chart = am4core.create(this.props.id, am4charts.XYChart3D);

        // chart.titles.create().text = "Crude oil reserves";
        
        // Add data
        chart.data = [{
          "label": "NGL 1100",
          "value1": 20,
          "value2": 80
        }, {
          "label": "NGL 2400",
          "value1": 20,
          "value2": 80
        }, {
          "label": "NGL 900",
          "value1": 20,
          "value2": 80
        }, {
          "label": "NGL 1300",
          "value1": 20,
          "value2": 80
        },  {
          "label": "NGL 1800",
          "value1": 20,
          "value2": 80
        }];
        
        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "label";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.strokeOpacity = 0;
        valueAxis.min = -10;
        valueAxis.max = 110;
        valueAxis.strictMinMax = true;
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.labels.template.adapter.add("text", function(text) {
          if ((text > 100) || (text < 0)) {
            return "";
          }
          else {
            return text + "%";
          }
        })
        
        // Create series
        let series1 = chart.series.push(new am4charts.ConeSeries());
        series1.dataFields.valueY = "value1";
        series1.dataFields.categoryX = "label";
        series1.columns.template.width = am4core.percent(80);
        series1.columns.template.fillOpacity = 0.9;
        series1.columns.template.strokeOpacity = 1;
        series1.columns.template.strokeWidth = 2;
        
        let series2 = chart.series.push(new am4charts.ConeSeries());
        series2.dataFields.valueY = "value2";
        series2.dataFields.categoryX = "label";
        series2.stacked = true;
        series2.columns.template.width = am4core.percent(80);
        series2.columns.template.fill = am4core.color("#000");
        series2.columns.template.fillOpacity = 0.1;
        series2.columns.template.stroke = am4core.color("#000");
        series2.columns.template.strokeOpacity = 0.2;
        series2.columns.template.strokeWidth = 2;
        

    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div id={this.props.id} style={{ width: "100%", height: "460px" }}></div>
        );
    }
}
export default CylinderGauge