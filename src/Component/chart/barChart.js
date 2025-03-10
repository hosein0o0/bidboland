import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  const id = `chart-${Math.random().toString(36).substr(2, 9)}`; // Unique ID

  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create(id, am4charts.XYChart);
    chartRef.current = chart;

    chart.data = data;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "label";


    categoryAxis.renderer.labels._template.textAlign = 'middle'
    categoryAxis.renderer.grid.template.location = 0;

    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;

    categoryAxis.renderer.labels.template.fontSize = 9;
    categoryAxis.renderer.labels.template.truncate = false;
    categoryAxis.renderer.labels.template.wrap = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "label";

    series.columns.template.propertyFields.fill = "color";

    series.columns.template.width = am4core.percent(50);

    chart.logo.disabled = true;

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id={id} style={{ width: "100%", height: "100%" }}></div>;
};
