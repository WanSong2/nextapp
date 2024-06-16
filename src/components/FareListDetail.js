export default function FareListDetail({ fare }) {
    const { SKD: schdule } = fare;
    return (
      <li key={fare.I} className="justify-between gap-x-6 py-3">
        <ul className="divide-y divide-gray-100 border border-2">
          {schdule?.map((journey, index) => {
            return (
              <li key={index} className="flex justify-between gap-x-5 border-1">
                <span>
                  <img
                    src={`https://sabre.etoursoft.co.kr/images/carrier_logo/30/${journey.HTC}.png`}
                    alt={journey.HTC}
                  />
                </span>
                <div className="flex-auto">
                  <strong title="">{journey.HTK}</strong>
                </div>
                <div className="flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {journey.HDD}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {`${journey.HDA}.${journey.HDT}`}
                  </p>
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {journey.HAD}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {`${journey.HAA}.${journey.HTT}`}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }
  