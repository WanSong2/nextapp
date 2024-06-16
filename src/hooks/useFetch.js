import { useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://localfrt.ybtour.co.kr:8081/booking/findSkdFareGroup.lts?viewType=xml",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `qcars=&mode=v3&activedVia=0%2C1%2C2&activedBaggage=Y&activedMulti=A&activedCar=LJ%2CTW%2CBX%2CRS%2CZE%2C7C%2COZ%2CKE%2CVJ%2CHX%2CMU%2CNH&activedCabin=Y&activedAirport=ICN-NRT-NRT-ICN&activedStatus=OK%2CHL&filterTimeSlideMin0=0&filterTimeSlideMax0=2359&activedWaitTimeMin=000&activedWaitTimeMax=7705&activedDurationTimeMin=280&activedDurationTimeMax=4135&minAirFareView=223300&maxAirFareView=809600&activedOpcar=Y&page=1&sort=priceAsc&filterArrTimeSlideMin1=0&filterArrTimeSlideMax1=2359&trip=RT&dayInd=N&strDateSearch=202405&day=&plusDate=&daySeq=0&dep0=ICN&dep1=NRT&dep2=&dep3=&arr0=NRT&arr1=ICN&arr2=&arr3=&depdate0=20240617&depdate1=20240620&depdate2=&depdate3=&retdate=20240620&val=&comp=Y&adt=1&chd=0&inf=0&car=YY&idt=ALL&isBfm=Y&CBFare=&skipFilter=&miniFares=N&CRuleType=A&GscCode=YBTOUR&freebag=&sessionKey=OSITB89BDV4KLQVWT9W3`,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  return data;
};

export default useFetch;
