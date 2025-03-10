import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { Component } from 'react'
am4core.useTheme(am4themes_animated);
class DivergentStackedBars extends Component {
    constructor(props) {
        super(props)
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


        /* Chart code */
        // Themes begin
        // Themes end

        // Create chart instance
        let chart = am4core.create(this.props.id, am4charts.XYChart);

        // Title
        // let title = chart.titles.push(new am4core.Label());
        // title.text = "Research tools used by students";
        // title.fontSize = 25;
        // title.marginBottom = 15;

        // Add data
        chart.data = [{
            "category": "Search engines",
            "negative1": -0.1,
            "negative2": -0.9,
            "positive1": 69,
            "positive2": 30
        }, {
            "category": "Online encyclopedias",
            "negative1": -2,
            "negative2": -4,
            "positive1": 19,
            "positive2": 75
        }, {
            "category": "Peers",
            "negative1": -2,
            "negative2": -10,
            "positive1": 46,
            "positive2": 42
        }, {
            "category": "Social media",
            "negative1": -2,
            "negative2": -13,
            "positive1": 33,
            "positive2": 52
        }, {
            "category": "Study guides",
            "negative1": -6,
            "negative2": -19,
            "positive1": 34,
            "positive2": 41
        }, {
            "category": "News websites",
            "negative1": -3,
            "negative2": -23,
            "positive1": 49,
            "positive2": 25
        }, {
            "category": "Textbooks",
            "negative1": -5,
            "negative2": -28,
            "positive1": 49,
            "positive2": 18
        }, {
            "category": "Librarian",
            "negative1": -14,
            "negative2": -34,
            "positive1": 37,
            "positive2": 16
        }, {
            "category": "Printed books",
            "negative1": -9,
            "negative2": -41,
            "positive1": 38,
            "positive2": 12
        }, {
            "category": "Databases",
            "negative1": -18,
            "negative2": -36,
            "positive1": 29,
            "positive2": 17
        }, {
            "category": "Student search engines",
            "negative1": -17,
            "negative2": -39,
            "positive1": 34,
            "positive2": 10
        }];


        // Create axes
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.axisFills.template.disabled = true;
        categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = -100;
        valueAxis.max = 100;
        valueAxis.renderer.minGridDistance = 50;
        valueAxis.renderer.ticks.template.length = 5;
        valueAxis.renderer.ticks.template.disabled = true;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
        valueAxis.renderer.labels.template.adapter.add("text", function (text) {
            return text + "%";
        })

        // Legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";

        // Use only absolute numbers
        chart.numberFormatter.numberFormat = "#.#s";

        // Create series
        function createSeries(field, name, color) {
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "category";
            series.stacked = true;
            series.name = name;
            series.stroke = color;
            series.fill = color;

            let label = series.bullets.push(new am4charts.LabelBullet);
            label.disabled = true
            label.label.text = "{valueX}%";
            label.label.fill = am4core.color("#fff");
            label.label.strokeWidth = 100;
            label.label.truncate = false;
            label.label.hideOversized = true;
            label.locationX = 0.5;
            return series;
        }

        let interfaceColors = new am4core.InterfaceColorSet();
        let positiveColor = interfaceColors.getFor("positive");
        let negativeColor = interfaceColors.getFor("negative");

        createSeries("negative2", "Unlikely", negativeColor.lighten(0.5));
        createSeries("negative1", "Never", negativeColor);
        createSeries("positive1", "Sometimes", positiveColor.lighten(0.5));
        createSeries("positive2", "Very often", positiveColor);

        chart.legend.events.on("layoutvalidated", function (event) {
            chart.legend.itemContainers.each((container) => {
                // if (container.dataItem.dataContext.name == "Never") {
                //     container.toBack();
                // }
            })
        })

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
export default DivergentStackedBars