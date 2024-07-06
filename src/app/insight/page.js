"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

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
            const { fares } = insight;
            return (
              <div
                key={scheduleId}
                className="mb-8 bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-2"
              >
                <div className="grid grid-rows-1 grid-flow-col gap-4">
                  <Summery insight={insight} />
                  <Fares fares={fares} />
                </div>
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
  const { itinerary } = insight;
  return (
    <div className="row-span-3 w-64">
      <ul className="list-none">
        <li className="list-none mb-3">
          {itinerary.map((journey, index) => {
            return (
              <ul className="list-none" key={index}>
                <li className="mb-3 whitespace-normal">
                  <p className="text-sm mb-2">여정 {index + 1}</p>
                  <div key={journey} className="text-xs flex flex-row">
                    {
                      insight.carrier[index].map((ca, index) => {
                        return <><img className="text-xs" key={index}
                          src={`https://sabre.etoursoft.co.kr/images/carrier_logo/30/${ca}.png`}
                          alt={ca}
                        /> {journey.join("~")}</>
                      })
                    }
                  </div>
                </li>
              </ul>
            )
          })}
        </li>
        <li className="mb-3">
          <p className="text-sm">TAX</p>
          <p className="text-xs">{insight.tax.toLocaleString('ko-KR')}원</p>
        </li>
        <li className="mb-3">
          <p className="text-sm">유류할증료</p>
          <p className="text-xs">{insight.qCharge.toLocaleString('ko-KR')}원</p>
        </li>
      </ul >
    </div >
  );
};

const Fares = ({ fares }) => {
  return (
    <>
      {Object.keys(fares)?.map((fareType) => {
        return (
          <div className="col-span-1" key={fareType}>
            <ul className="list-none">
              <p className="font-bold text-xs h-16">
                [
                {`${Type[fareType.split("/")[0]]}${fareType.split("/").length > 1 ? '/' + CardType[fareType.split("/")[1]] : ''}`}
                ]
              </p>
              <FaresDetail fare={fares[fareType]} />
            </ul>
          </div>
        );
      })}
    </>
  );
};

function FaresDetail({ fare }) {
  return (
    <>
      {fare.map((detail, index) => {
        const fontColor = detail.otaId !== "-" ? "bg-indigo-300" : "";
        return (
          <li className={`w-22 rounded bg-blue-50 mb-3 ${fontColor}`} key={index}>
            <p className="text-xs mb-1">순위: {detail.ranking}</p>
            <p className="text-xs mb-1">{detail.farePerAdult.toLocaleString('ko-KR')}원</p>
            {detail.otaId === 'LTT017' ? <p className="text-xs">OTA:롯데관광</p> : ''}
          </li>
        );
      })}
    </>
  );
}

const Type = {
  A01: "성인/모든 결제수단",
  A02: "성인-2인이상",
  A03: "성인-나이제한",
  A04: "성인-경로",
  A05: "성인-바우처",
  A06: "학생",
  A07: "장애인",
  A08: "외국인/다문화",
  A09: "허니문",
  A10: "부산.경상.전라지역주민특가",
  A11: "수능수험생",
  A12: "성인-2인",
  A13: "성인-3인",
  A14: "성인-4인이상",
  A15: "성인-좌석승급",
  A16: "선원",
};

const CardType = {
  B01: "KB국민카드",
  B02: "롯데카드",
  B03: "롯데AMEX카드",
  B04: "BC카드",
  B05: "삼성카드",
  B06: "외환카드",
  B07: "외환크로스마일카드",
  B08: "하나SK카드",
  B09: "현대카드",
  B10: "현대카드 Diners 마일리지",
  B11: "씨티카드",
  B12: "우리카드",
  B13: "NH채움카드",
  B14: "마스터카드",
  B15: "마스터VIP카드",
  B16: "델타스카이마일스삼성카드",
  B17: "AMEX카드",
  B18: "삼성AMEX카드",
  B19: "신한카드",
  B20: "비자카드",
  B21: "삼성AMEX 3.4",
  B22: "KB국민 AMEX카드",
  B23: "신한AMEX카드",
  B24: "삼성카드 2V2.3V2",
  B25: "IBK기업은행카드",
  B26: "하나/외환카드",
  B27: "글로벌쇼핑 삼성카드",
  B28: "씨티 프리미어마일카드",
  B29: "법인카드",
  B30: "현대카드 플래티넘 이상(이용실적 충족시)",
  B31: "하나카드",
  B32: "KB국민 청춘대로 티타늄카드",
  B33: "현대카드 ZERO",
  B34: "씨티 비자카드",
  B35: "하나 VIVA G카드",
  B36: "삼성카드 & MILEAGE",
  B37: "KB국민/씨티/NH채움카드",
  B38: "삼성카드 taptap",
  B39: "하나멤버스 1Q카드",
  B40: "KB국민 비자카드",
  B41: "KB국민 가온글로벌카드",
  B42: "현대카드 T3",
  B43: "씨티 메가마일카드",
  B44: "BC 유니온페이카드",
  B45: "IBK 유니온페이카드",
  B46: "하나멤버스 1Q #tag1카드 Red",
  B47: "하나멤버스 1Q 카드 Daily",
  B48: "삼성카드 THE1 스카이패스",
  B49: "우리 유니온페이카드",
  B50: "KB국민 청춘대로 1코노미카드",
  B51: "신한카드 Air 1.5",
  B52: "KB국민 청춘대로 톡톡카드",
  B53: "카라이프 삼성카드",
  B54: "현대카드 VISA 플래티넘",
  B55: "하나멤버스 1Q Tour1 카드",
  B56: "글로벌쇼핑 삼성카드 5 V2",
  B57: "삼성카드 taptap I",
  B58: "우리카드 수퍼마일",
  B59: "SKYPASS THE DREAM 롯데카드",
  B60: "씨티 NEW 캐시백 카드",
  B61: "KB국민 가온 워킹업카드",
  B62: "하나 BC카드",
  B63: "롯데 유니온페이카드",
  B64: "신한 유니온페이카드",
  B65: "아메리칸 엑스프레스 그린",
  B66: "KB국민 청춘대로 매니아 UPI카드",
  B67: "하나카드 Mile 1.6",
  B68: "하나 통커카드",
  B69: "우리카드 카드의 정석 POINT",
  B70: "유니온페이 카드",
  B71: "KB국민 톡톡PAY카드",
  B72: "NH농협카드",
  B73: "국민 티타늄 Miz&Mr",
  B74: "네이버페이",
  B75: "KB국민 Easy on",
  B76: "KB국민 with 와이페이모어",
  B77: "BC바로카드",
  B78: "하나 신용/체크카드",
  B79: "현대 the Red Edition2(이용실적 충족시)",
  B80: "현대 M2/M3 Edition2(이용실적 충족시)",
  B81: "부산은행 BC카드",
  B82: "대구은행 BC카드",
  B83: "현대카드 the Pink",
  B84: "KB국민 WAVVE",
  B85: "KB국민 스카이패스 티타늄",
  B86: "KB국민 체크카드",
  B87: "하나 트래블로그 신용카드",
  B88: "삼성 iD PET 카드",
  B89: "현대 AMEX 카드",
  B90: "KB국민 몰테일카드",
  B91: "KB국민카드(이용실적 충족시)",
  B92: "삼성 iD NOMAD 카드",
  B93: "롯데 Trip to 로카 카드",
  B94: "우리 카드의 정석 EVERY1",
  B95: "Mile1 하나카드",
  B96: "삼성 iD GLOBAL 카드",
};
