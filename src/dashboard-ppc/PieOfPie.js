import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { Component } from 'react'
am4core.useTheme(am4themes_animated);
class PieOfPie extends Component {
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
            if (this.props.state.PieData[this.props.name]) {
                this.StartChart()
            }
        }
    }
    StartChart = () => {
        let container = am4core.create(this.props.id, am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "horizontal";


        let chart = container.createChild(am4charts.PieChart);


        // Add data
        chart.data = this.props.state.PieData[this.props.name]

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
        pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";

        pieSeries.slices.template.events.on("hit", function (event) {
            selectSlice(event.target.dataItem);
        })

        let chart2 = container.createChild(am4charts.PieChart);
        chart2.width = am4core.percent(30);
        chart2.radius = am4core.percent(80);

        // Add and configure Series
        let pieSeries2 = chart2.series.push(new am4charts.PieSeries());
        pieSeries2.dataFields.value = "value";
        pieSeries2.dataFields.category = "name";
        pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
        // pieSeries2.labels.template.radius = am4core.percent(50);
        // pieSeries2.labels.template.inside = true;
        // pieSeries2.labels.template.fill = am4core.color("#363636");
        pieSeries2.labels.template.disabled = true;
        pieSeries2.ticks.template.disabled = true;
        pieSeries2.alignLabels = false;
        pieSeries2.events.on("positionchanged", updateLines);

        let interfaceColors = new am4core.InterfaceColorSet();

        let line1 = container.createChild(am4core.Line);
        line1.strokeDasharray = "2,2";
        line1.strokeOpacity = 0.5;
        line1.stroke = interfaceColors.getFor("alternativeBackground");
        line1.isMeasured = false;

        let line2 = container.createChild(am4core.Line);
        line2.strokeDasharray = "2,2";
        line2.strokeOpacity = 0.5;
        line2.stroke = interfaceColors.getFor("alternativeBackground");
        line2.isMeasured = false;

        let selectedSlice;

        function selectSlice(dataItem) {

            selectedSlice = dataItem.slice;

            let fill = selectedSlice.fill;

            let count = dataItem.dataContext.subData.length;
            pieSeries2.colors.list = [];
            for (let i = 0; i < count; i++) {
                if (fill) {
                    pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
                }
            }

            chart2.data = dataItem.dataContext.subData;
            pieSeries2.appear();

            let middleAngle = selectedSlice.middleAngle;
            let firstAngle = pieSeries.slices.getIndex(0).startAngle;
            let animation = pieSeries.animate([
                { property: "startAngle", to: firstAngle - middleAngle },
                { property: "endAngle", to: firstAngle - middleAngle + 360 }
            ], 600, am4core.ease.sinOut);
            animation.events.on("animationprogress", updateLines);

            selectedSlice.events.on("transformed", updateLines);

            // let animations = chart2.animate({ property: "dx", from: -container.pixelWidth / 2, to: 0 }, 2000, am4core.ease.elasticOut)
            // animations.events.on("animationprogress", updateLines)
        }


        function updateLines() {
            if (selectedSlice) {
                let p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
                let p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };

                p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
                p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

                let p21 = { x: 0, y: -pieSeries2.pixelRadius };
                let p22 = { x: 0, y: pieSeries2.pixelRadius };

                p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
                p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

                line1.x1 = p11.x;
                line1.x2 = p21.x;
                line1.y1 = p11.y;
                line1.y2 = p21.y;

                line2.x1 = p12.x;
                line2.x2 = p22.x;
                line2.y1 = p12.y;
                line2.y2 = p22.y;
            }
        }

        chart.events.on("datavalidated", function () {
            setTimeout(function () {
                selectSlice(pieSeries.dataItems.getIndex(0));
            }, 1000);
        });
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div id={this.props.id} style={{ width: "100%", height: "250px" }}></div>
        );
    }
}
export default PieOfPie