import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useStore} from "effector-react";
import {$categories} from "../../store/categories";
import Select from "react-select";
import Link from "next/link";
import {maticPropelPrice} from "../../helpers/utilities";
import { backendUrl } from "../../hooks/useAPI";

import _ from 'lodash';

const NftTable = ({session, url, showActions = false}) => {
    const [items, setItems] = useState([]);
    const categories = useStore($categories);

    const fetchData = () => {
        setItems([]);
        axios
            .get(`${backendUrl}/nfts/${url}`, {
                headers: {
                    session,
                },
            })
            .then((resp) => {
                setItems(resp.data);
            });
    };
    const deleteItem = (item) => () =>
        axios
            .delete(`${backendUrl}/nfts/${item.nft.id}`, {
                headers: {
                    session: session,
                },
            })
            .then(() =>
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "The image deleted successfully!",
                })
            )
            .catch(() =>
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong!, please try again",
                })
            )
            .finally(fetchData);

    const sendToMarket = (item) => () =>
        axios
            .post(
                `${backendUrl}/nfts/send-to-market`,
                {
                    id: item.nft.id,
                    showInListings: !item.showInListing,
                },
                {
                    headers: {
                        session,
                    },
                }
            )
            .then(() =>
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "the image placed in market successfully!",
                })
            )
            .catch(() =>
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong!, please try again",
                })
            )
            .finally(fetchData);

    useEffect(() => {
        fetchData();
    }, [session, url]);

    const handleOnChange = async (item, selectedCategories) => {
        const {data} = await axios.put(
            `${backendUrl}/nfts/set-category/${item.nft.id}`,
            {
                categoryId: selectedCategories?.value,
            }
        );
        fetchData();
    };

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
                    Price
                </th>
                {showActions && (
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                    </th>
                )}
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, i) => (
                item.nft ?  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                            <div className="flex-shrink-0 h-10 w-10">
                                <img
                                    className="h-full w-full rounded-full"
                                    src={item.nft.image}
                                    alt=""
                                />
                            </div>
                            <Link prefetch={false} href={`/info/${item.nft.id}`}>
                                {item.nft.name}
                            </Link>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 py-1 gap-2 inline-flex items-center  leading-5 rounded-full">
                {item.nft.priceInPropel ? (
                    <img src="/img/propel.svg" width={20} alt=""/>
                ) : (
                    <img src="/img/matic.svg" width={20} alt=""/>
                )}
                  {maticPropelPrice(item.nft.price, item.nft.contractAddress)}{" "}
                  {item.nft.priceInPropel ? "PROPEL" : "MATIC"}
              </span>
                    </td>
                    {showActions && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium gap-1 flex justify-end">
                            <Select
                                // isClearable
                                instanceId={"category"}
                                onChange={(e) => handleOnChange(item, e)}
                                className="flex-1"
                                defaultValue={
                                    item.categories?.length > 0 && {
                                        label: item.nft.categories[0].name,
                                        value: item.nft.categories[0].id,
                                    }
                                }
                                menuPortalTarget={document.body}
                                options={categories.map(({id, name}) => ({
                                    label: name,
                                    value: id,
                                }))}
                            />
                            {!item.nft.showInListing && false && (
                                <button
                                    onClick={sendToMarket(item)}
                                    className="border border-indigo-600 py-2 px-4 rounded text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition duration-500"
                                >
                                    {!item.nft.showInListing
                                        ? "Send to market"
                                        : "Back from market"}
                                    Send to market
                                </button>
                            )}
                            <button
                                onClick={deleteItem(item)}
                                className="border border-red-600 py-2 px-4 rounded text-red-600 hover:border-red-600 hover:bg-red-50 transition duration-500"
                            >
                                Delete
                            </button>
                        </td>
                    )}
                </tr>: <div></div>
            ))}
            {items.length === 0 && (
                <tr>
                    <td colSpan="3" className="text-center p-10">
                        The list is empty
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};
export {NftTable};
