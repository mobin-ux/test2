import { useGate, useStore } from "effector-react";
import Link from "next/link";
import { $traded, tradedGate } from "../../store/traded";
import moment from "moment";
import { shortnererFunction } from "../../utils/shortnererFunction";
import { maticPropelPrice } from "../../helpers/utilities";
import { useState } from "react";
import { backendUrl } from "../../hooks/useAPI";
const TradedTable = () => {
  useGate(tradedGate);
  const items = useStore($traded);
  const [selectedPage, setSelectedPage] = useState(0);
  const [perPage] = useState(10);
  
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-payrue-blue-6">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Seller
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Buyer
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Price
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Date
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items
          .slice(selectedPage * perPage, selectedPage * perPage + perPage)
          .map((item, i) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-full w-full rounded-full"
                      src={item.nft.image}

                      alt=""
                    />
                  </div>
                  <Link prefetch={false} href={`/info/${item.nftId}`}>
                    {item.nft.name}
                  </Link>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  className="text-blue-500"
                  href={`https://polygonscan.com/address/${item.seller}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {shortnererFunction(item.seller !== '0xfd9ad11fafa379466ac232eb43410f528fbc9c0c'? item.seller : item.nft.seller )}
                </a>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  className="text-blue-500"
                  href={`https://polygonscan.com/address/${item.buyer}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {shortnererFunction(item.buyer)}
                </a>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 gap-2 inline-flex  leading-5 rounded-full">
                  {item.nft.priceInPropel ? (
                    <img src="/img/propel.svg" width={20} alt="" />
                  ) : (
                    <img src="/img/matic.svg" width={20} alt="" />
                  )}
                  {maticPropelPrice(item.price, item.nft.contractAddress)}{" "}
                  {item.nft.priceInPropel ? "PROPEL" : "MATIC"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <p>{moment(item.tsDate * 1000).fromNow()}</p>
                  <a
                    href={`https://polygonscan.com/tx/${item.txId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-5"
                  >
                    <img src="/img/external-link.svg" width="20" alt="" />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        {items.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center p-10">
              The list is empty
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5} className="text-center py-4">
            {
              <div className="flex justify-center">
                <button
                  className="bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-l"
                  onClick={() => setSelectedPage(selectedPage - 1)}
                  disabled={selectedPage === 0}
                >
                  Prev
                </button>
                <button
                  className="bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-r border-l border-gray-300"
                  onClick={() => setSelectedPage(selectedPage + 1)}
                  disabled={
                    selectedPage ===
                    Math.floor(items.length / perPage) +
                      (items.length % perPage !== 0 ? 1 : 0) -
                      1
                  }
                >
                  Next
                </button>
              </div>
            }
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
export { TradedTable };
