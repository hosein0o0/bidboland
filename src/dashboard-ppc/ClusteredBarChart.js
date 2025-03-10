import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { Component } from 'react'
am4core.useTheme(am4themes_animated);
class ClusteredBarChart extends Component {
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
        if (am4core && am4charts && this.props.state.clusteredBarChart[this.props.name]) {
            this.StartChart()
        }
    }
    StartChart = () => {
        let chart = am4core.create(this.props.id, am4charts.XYChart);

        // Add data
        chart.data = this.props.state.clusteredBarChart[this.props.name]

        // Create axes
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        categoryAxis.numberFormatter.numberFormat = "#";
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.opposite = true;

        // Create series
        function createSeries(field, name, color) {
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "year";
            series.name = name;
            series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
            series.columns.template.height = am4core.percent(100);
            series.sequencedInterpolation = true;
            if (color) {
                series.columns.template.fill = am4core.color(color);
                series.columns.template.stroke = am4core.color(color);
            }

            let valueLabel = series.bullets.push(new am4charts.LabelBullet());
            valueLabel.label.text = "{valueX}";
            valueLabel.label.horizontalCenter = "left";
            valueLabel.label.dx = 10;
            valueLabel.label.hideOversized = false;
            valueLabel.label.truncate = false;

            let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
            categoryLabel.label.text = "{name}";
            categoryLabel.label.horizontalCenter = "right";
            categoryLabel.label.dx = -10;
            categoryLabel.label.fill = am4core.color("#fff");
            categoryLabel.label.hideOversized = false;
            categoryLabel.label.truncate = false;
        }

        createSeries("actual", "Actual", "#15c16b");
        createSeries("plan", "Plan");
        createSeries("deviation", "Deviation", "#ed9720");

    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div id={this.props.id} style={{ width: "100%", height: "580px" }}></div>
        );
    }
}
export default ClusteredBarChart