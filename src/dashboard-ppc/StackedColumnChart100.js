import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { Component } from 'react'
am4core.useTheme(am4themes_animated);
class StackedColumnChart100 extends Component {
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
        // Create chart instance
        let chart = am4core.create(this.props.id, am4charts.XYChart);


        // Add data
        chart.data = [{
            "label": "(گاز ترش (خوراک",
            "actual": 2.5,
            "deviation": 2.1,
        }, {
            "label": "(گاز شیرین (خوراک",
            "actual": 2.7,
            "deviation": 2.2,
        }, {
            "label": "(میعانات گازی (خوراک",
            "actual": 2.9,
            "deviation": 2.4,
        },
        {
            "label": "(پنتان پلاس (محصول",
            "actual": 2.9,
            "deviation": 2.4,
        },
        {
            "label": "(پروپان (محصول",
            "actual": 2.9,
            "deviation": 2.4,
        },
        {
            "label": "(بوتان (محصول",
            "actual": 2.9,
            "deviation": 2.4,
        },
        {
            "label": "(اتان (محصول",
            "actual": 2.9,
            "deviation": 2.4,
        },
        {
            "label": "(متان (محصول",
            "actual": 2.9,
            "deviation": 2.4,
        },
        ];

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "label";
        categoryAxis.renderer.grid.template.location = 0;


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inside = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.min = 0;

        // Create series
        function createSeries(field, name, color) {

            // Set up series
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.name = name;
            series.dataFields.valueY = field;
            series.dataFields.categoryX = "label";
            series.sequencedInterpolation = true;

            // Make it stacked
            series.stacked = true;

            // Configure columns
            series.columns.template.width = am4core.percent(60);
            series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY} تن";

            if (color) {
                series.columns.template.stroke = am4core.color(color);
                series.columns.template.fill = am4core.color(color);
            }
            // Add label
            let labelBullet = series.bullets.push(new am4charts.LabelBullet());
            labelBullet.label.text = "{valueY} ton";
            labelBullet.locationY = 0.5;
            labelBullet.label.hideOversized = true;

            return series;
        }

        createSeries("actual", "واقعی", "#0288d1");
        createSeries("deviation", "انحراف", "#ff9800");

        // Legend
        chart.legend = new am4charts.Legend();
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div id={this.props.id} style={{ width: "100%", height: "300px" }}></div>
        );
    }
}
export default StackedColumnChart100