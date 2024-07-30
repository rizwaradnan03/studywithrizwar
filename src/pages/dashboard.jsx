import { FindAllChart } from "@/api/dashboard/FindAllChart";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Highcharts from "highcharts";
import IsLoading from "@/components/lib/react-query/IsLoading";
import { Helmet } from "react-helmet";

const dashboard = () => {
  const {
    isLoading: isLoadingChartAll,
    isError: isErrorChartAll,
    error: errorChartAll,
    data: dataChartAll,
  } = useQuery("chartAll", FindAllChart);

  console.log("isi data", dataChartAll);

  const generatedChartOptions = (item) => ({
    chart: {
      type: "pie",
    },
    title: {
      text: item.class_title,
    },
    series: [
      {
        name: item.class_title,
        data: item.data.map((dataPoint) => ({
          name: dataPoint.name,
          y: dataPoint.count,
          color: dataPoint.name === "Sudah" ? "#40A218" : "#FF0000",
        })),
      },
    ],
  });

  if (isLoadingChartAll) return <IsLoading />;

  return (
    <>
      <Helmet>
        <title>Halaman Dashboard</title>
      </Helmet>
      <div className="px-6.5 py-4 rounded-sm border shadow-10 border-stroke bg-whitedark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col lg:flex-row mb-10">
          {/* <div className="overflow-y-auto h-96"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5 p-6.5">
            {dataChartAll?.data.map((item, index) => (
              <HighchartsReact
                key={index}
                highcharts={Highcharts}
                options={generatedChartOptions(item)}
              />
            ))}
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default dashboard;
