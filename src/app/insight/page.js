"use client";

import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

export default function Insight() {
  const [insightDate, setInsightDate] = useState({});
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { insight } = await getData();
      setInsightDate(insight);
      setIsLoading(true);
    };

    fetchData();
  }, []);

  return (
    <>
      {!isLoading && <Loading />}
      {isLoading && (
        <div className="grid grid-flow-row auto-rows-max">
          {insightDate?.map((insight) => {
            const { scheduleId } = insight;
            return (
              <div
                key={scheduleId}
                className="mb-8 bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-2"
              >
                <div className="grid grid-rows-3 grid-flow-col gap-4">
                  <Summery insight={insight} />
                  <Fares insight={insight} />
                </div>
                {
                  //JSON.stringify(insight, null, 2)
                }
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

const getData = async () => {
  try {
    const response = await fetch("http://localhost:3002/result", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    return {};
  }
};

const Summery = ({ insight }) => {
  return (
    <div className="row-span-3">
      <ul className="list-disc">
        <li>
          <p className="text-sm">스케줄</p>
          <p className="text-sm">{insight.scheduleId}</p>
        </li>
        <li>
          <p className="text-sm">carrier</p>
          <p className="text-sm">{insight.carrier.join("-")}</p>
        </li>
        <li>
          <p className="text-sm">flightNo</p>
          <p className="text-sm">{insight.flightNo.join("-")}</p>
        </li>
        <li>
          <p className="text-sm">tax</p>
          <p className="text-sm">{insight.tax}</p>
        </li>
        <li>
          <p className="text-sm">qCharge</p>
          <p className="text-sm">{insight.qCharge}</p>
        </li>
      </ul>
    </div>
  );
};

const Fares = ({ insight }) => {
  return (
    <>
      <div className="col-span-2">02</div>
      <div className="col-span-2">02</div>
    </>
  );
};
