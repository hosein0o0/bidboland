import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import React, { Component } from 'react'
am4core.useTheme(am4themes_animated)
class DurationValueAxis extends Component {
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
    // let chart = am4core.create(this.props.id, am4charts.XYChart3D);
    let chart = am4core.create(this.props.id, am4charts.XYChart3D)

    chart.colors.step = 2
    chart.maskBullets = false

    // Add data
    chart.data = [
      {
        date: '2012-01-01',
        distance: 227,
        townName: 'New York',
        townName2: 'New York',
        townSize: 12,
        latitude: 40.71,
        duration: 408
      },
      {
        date: '2012-01-02',
        distance: 371,
        townName: 'Washington',
        townSize: 7,
        latitude: 38.89,
        duration: 482
      },
      {
        date: '2012-01-03',
        distance: 433,
        townName: 'Wilmington',
        townSize: 3,
        latitude: 34.22,
        duration: 562
      },
      {
        date: '2012-01-04',
        distance: 345,
        townName: 'Jacksonville',
        townSize: 3.5,
        latitude: 30.35,
        duration: 379
      },
      {
        date: '2012-01-05',
        distance: 480,
        townName: 'Miami',
        townName2: 'Miami',
        townSize: 5,
        latitude: 25.83,
        duration: 501
      },
      {
        date: '2012-01-06',
        distance: 386,
        townName: 'Tallahassee',
        townSize: 3.5,
        latitude: 30.46,
        duration: 443
      },
      {
        date: '2012-01-07',
        distance: 348,
        townName: 'New Orleans',
        townSize: 5,
        latitude: 29.94,
        duration: 405
      },
      {
        date: '2012-01-08',
        distance: 238,
        townName: 'Houston',
        townName2: 'Houston',
        townSize: 8,
        latitude: 29.76,
        duration: 309
      },
      {
        date: '2012-01-09',
        distance: 218,
        townName: 'Dalas',
        townSize: 8,
        latitude: 32.8,
        duration: 287
      },
      {
        date: '2012-01-10',
        distance: 349,
        townName: 'Oklahoma City',
        townSize: 5,
        latitude: 35.49,
        duration: 485
      },
      {
        date: '2012-01-11',
        distance: 603,
        townName: 'Kansas City',
        townSize: 5,
        latitude: 39.1,
        duration: 890
      },
      {
        date: '2012-01-12',
        distance: 534,
        townName: 'Denver',
        townName2: 'Denver',
        townSize: 9,
        latitude: 39.74,
        duration: 810
      },
      {
        date: '2012-01-13',
        townName: 'Salt Lake City',
        townSize: 6,
        distance: 425,
        duration: 670,
        latitude: 40.75,
        dashLength: 8,
        alpha: 0.4
      },
      {
        date: '2012-01-14',
        latitude: 36.1,
        duration: 470,
        townName: 'Las Vegas',
        townName2: 'Las Vegas'
      },
      {
        date: '2012-01-15'
      },
      {
        date: '2012-01-16'
      },
      {
        date: '2012-01-17'
      }
    ]

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    dateAxis.renderer.minGridDistance = 50
    dateAxis.renderer.grid.template.disabled = true
    dateAxis.renderer.fullWidthTooltip = true

    let distanceAxis = chart.yAxes.push(new am4charts.ValueAxis())
    distanceAxis.title.text = 'Distance'
    //distanceAxis.renderer.grid.template.disabled = true;

    let durationAxis = chart.yAxes.push(new am4charts.DurationAxis())
    durationAxis.title.text = 'Duration'
    durationAxis.baseUnit = 'minute'
    //durationAxis.renderer.grid.template.disabled = true;
    durationAxis.renderer.opposite = true
    durationAxis.syncWithAxis = distanceAxis

    durationAxis.durationFormatter.durationFormat = "hh'h' mm'min'"

    let latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis())
    latitudeAxis.renderer.grid.template.disabled = true
    latitudeAxis.renderer.labels.template.disabled = true
    latitudeAxis.syncWithAxis = distanceAxis

    // Create series
    let distanceSeries = chart.series.push(new am4charts.ColumnSeries())
    distanceSeries.dataFields.valueY = 'distance'
    distanceSeries.dataFields.dateX = 'date'
    distanceSeries.yAxis = distanceAxis
    distanceSeries.tooltipText = '{valueY} miles'
    distanceSeries.name = 'Distance'
    distanceSeries.columns.template.fillOpacity = 0.7
    distanceSeries.columns.template.propertyFields.strokeDasharray =
      'dashLength'
    distanceSeries.columns.template.propertyFields.fillOpacity = 'alpha'
    distanceSeries.showOnInit = true

    let distanceState = distanceSeries.columns.template.states.create('hover')
    distanceState.properties.fillOpacity = 0.9

    let durationSeries = chart.series.push(new am4charts.LineSeries())
    durationSeries.dataFields.valueY = 'duration'
    durationSeries.dataFields.dateX = 'date'
    durationSeries.yAxis = durationAxis
    durationSeries.name = 'Duration'
    durationSeries.strokeWidth = 2
    durationSeries.propertyFields.strokeDasharray = 'dashLength'
    durationSeries.tooltipText = '{valueY.formatDuration()}'
    durationSeries.showOnInit = true

    let durationBullet = durationSeries.bullets.push(new am4charts.Bullet())
    let durationRectangle = durationBullet.createChild(am4core.Rectangle)
    durationBullet.horizontalCenter = 'middle'
    durationBullet.verticalCenter = 'middle'
    durationBullet.width = 7
    durationBullet.height = 7
    durationRectangle.width = 7
    durationRectangle.height = 7

    let durationState = durationBullet.states.create('hover')
    durationState.properties.scale = 1.2

    let latitudeSeries = chart.series.push(new am4charts.LineSeries())
    latitudeSeries.dataFields.valueY = 'latitude'
    latitudeSeries.dataFields.dateX = 'date'
    latitudeSeries.yAxis = latitudeAxis
    latitudeSeries.name = 'Duration'
    latitudeSeries.strokeWidth = 2
    latitudeSeries.propertyFields.strokeDasharray = 'dashLength'
    latitudeSeries.tooltipText = 'Latitude: {valueY} ({townName})'
    latitudeSeries.showOnInit = true

    let latitudeBullet = latitudeSeries.bullets.push(
      new am4charts.CircleBullet()
    )
    latitudeBullet.circle.fill = am4core.color('#fff')
    latitudeBullet.circle.strokeWidth = 2
    latitudeBullet.circle.propertyFields.radius = 'townSize'

    let latitudeState = latitudeBullet.states.create('hover')
    latitudeState.properties.scale = 1.2

    let latitudeLabel = latitudeSeries.bullets.push(new am4charts.LabelBullet())
    latitudeLabel.label.text = '{townName2}'
    latitudeLabel.label.horizontalCenter = 'left'
    latitudeLabel.label.dx = 14

    // Add legend
    chart.legend = new am4charts.Legend()

    // Add cursor
    chart.cursor = new am4charts.XYCursor()
    chart.cursor.fullWidthLineX = true
    chart.cursor.xAxis = dateAxis
    chart.cursor.lineX.strokeOpacity = 0
    chart.cursor.lineX.fill = am4core.color('#000')
    chart.cursor.lineX.fillOpacity = 0.1
  }

  componentWillUnmount () {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  render () {
    return (
      <div id={this.props.id} style={{ width: '100%', height: '460px' }}></div>
    )
  }
}
export default DurationValueAxis
