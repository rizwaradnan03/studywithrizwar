"use client";
import Breadcrumb from "@/components/web/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/web/Charts/ChartOne";
import ChartTwo from "@/components/web/Charts/ChartTwo";
import ChartThree from "@/components/web/Charts/ChartThree";
import React from "react";

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
