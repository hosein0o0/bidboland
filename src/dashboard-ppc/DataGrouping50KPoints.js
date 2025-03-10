import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import React, { Component } from 'react'
am4core.useTheme(am4themes_animated)
class DataGrouping50KPoints extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
    }
  }
  componentDidMount () {
    if (am4core && am4charts) {
      this.StartChart()
    }
  }
  StartChart = () => {
    let chart = am4core.create(this.props.id, am4charts.XYChart)
    chart.paddingRight = 20

    let data = []
    let visits = 10
    for (let i = 1; i < 10000; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
      data.push({ date: new Date(2018, 0, i), value: visits })
    }
    chart.data = data

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    dateAxis.minZoomCount = 5

    // this makes the data to be grouped
    dateAxis.groupData = true;
    dateAxis.groupCount = 500;

    // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.fillOpacity = 0.5;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    let scrollbarX = new am4core.Scrollbar();
    scrollbarX.marginBottom = 20;
    chart.scrollbarX = scrollbarX;
  }

  componentWillUnmount () {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  render () {
    return (
      <div id={this.props.id} style={{ width: '100%', height: '400px' }}></div>
    )
  }
}
export default DataGrouping50KPoints
