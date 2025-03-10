import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

const PieChart = ({ data }) => {
  const chartRef = useRef(null)
  const id = `pie-${Math.random()}`
  useLayoutEffect(() => {
    let chart = am4core.create(id, am4charts.PieChart)

    chart.logo.disabled = true

    chart.data = data

    // Create Pie Series
    let pieSeries = chart.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'value'
    pieSeries.dataFields.category = 'label'
    pieSeries.slices.template.propertyFields.fill = 'color' // Assign colors

    pieSeries.tooltip.disabled = false
    pieSeries.tooltip.label.textAlign = 'middle'
    pieSeries.labels.template.textAlign = 'middle'

    // Animation
    pieSeries.hiddenState.properties.opacity = 1
    pieSeries.hiddenState.properties.endAngle = -90
    pieSeries.hiddenState.properties.startAngle = -90

    chartRef.current = chart

    return () => {
      chart.dispose()
    }
  }, [data])

  return <div id={id} style={{ width: '100%' }} />
}

// Named Export
export { PieChart }
