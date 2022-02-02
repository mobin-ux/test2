import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Select from "react-select";
import PAYRUESTORE from "../abi/PAYRUESTORE.json";
import PropelToken from "../abi/PropelToken.json";
import { useGate, useStore } from "effector-react";
import { $session } from "../store/session";
import { $categories, categoriesGate } from "../store/categories";
import { $provider } from "../store/provider";
import CreateCollectionPopup from "../components/create-collection-popup";
import { withHelper } from "../hooks/withHelper";
import {
  $createCollectionPopup,
  $myCollections,
  changeCreateCollectionPopup,
  myCollectionsGate,
  resetCollection,
  updateCollection,
} from "../store/collections";
import axios from "axios";
import { backendUrl } from "../hooks/useAPI";
import { startLoading, stopLoading } from "../store/loading";
import Swal from "sweetalert2";

const projectId = "20Vz9Bs2ZZF8Fdsg1vl9yqwD0sd";
const projectSecret = "a80a63db9082c173a8633ec0afbbbcce";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
const selectStyles = {
  control: (styles) => ({
    ...styles,
    flex: 1,
    borderRadius: "0.75rem",
    padding: "10px 8px",
  }),
};

const propelTokenAddress = process.env.propelTokenAddress;
const nftContractAddress = process.env.nftContractAddress;

const CreateItem = withHelper(({ login }) => {
  const provider = useStore($provider);
  useGate(categoriesGate);
  useGate(myCollectionsGate);
  const session = useStore($session);
  const categories = useStore($categories);
  const myCollections = useStore($myCollections);
  const createCollectionPopup = useStore($createCollectionPopup);
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
    categoryId: 0,
  });

  useEffect(() => {
    if (categories.length > 0) {
      updateFormInput((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]);
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const tokens = ["PROPEL", "MATIC"];

  const handleOnChange = (key) => (e) => {
    updateFormInput((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleOnChangeCategory = (e) => {
    updateFormInput((prev) => ({ ...prev, categoryId: e.value }));
  };

  const handleOnChangeCollection = (e) => {
    updateFormInput((prev) => ({ ...prev, collectionId: e.value }));
  };

  const [selectedToken, setSelectedToken] = useState("PROPEL");

  const defaultValueCollection = () => {
    const selected = myCollections.find(
      ({ id }) => id === formInput.collectionId
    );

    if (selected)
      return {
        value: selected.id,
        label: selected.name,
      };
    return null;
  };

  const handleOnChangeToken = (e) => {
    setSelectedToken(e.value);
  };

  useEffect(() => {
    resetCollection();
  }, []);

  const defaultValueCategory = () => {
    const selected = categories.find(({ id }) => id === formInput.categoryId);
    if (selected)
      return {
        value: selected.id,
        label: selected.name,
      };
    return null;
  };

  async function list(url) {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const accounts = await provider.listAccounts();
      const contract = new ethers.Contract(
        nftContractAddress,
        PAYRUESTORE.abi,
        signer
      );
      const list = await contract.getAllOnSale();
      //const owner = await contract.ownerOf(list[0].id)
      const newItemIndex = list.findIndex((item) => {
        return item.uri === url;
      });
      if (newItemIndex >= 0) {
        const id = list[newItemIndex].id;
        await axios.post(`${backendUrl}/nfts`, {
          seller: accounts[0],
          contractAddress: nftContractAddress,
          chainId: "137",
          tokenId: Number(id),
        });
        console.log("new nft added to db");
      } else {
        console.log("nft not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function mintCollectableByPropel(url) {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        nftContractAddress,
        PAYRUESTORE.abi,
        signer
      );
      const propelContract = new ethers.Contract(
        propelTokenAddress,
        PropelToken.abi,
        signer
      );
      const accounts = await provider.listAccounts();
      const price = ethers.utils.parseUnits(formInput.price, "ether");
      const commission = ethers.utils.parseUnits(
        (Number(formInput.price) / 200).toString(),
        "ether"
      );

      const approval = await propelContract.approve(
        nftContractAddress,
        commission.toString(),
        {
          from: accounts[0],
          gasLimit: 3500000,
        }
      );

      await approval.wait();

      const transaction = await contract.mintCollectableByPropel(
        accounts[0],
        url,
        formInput.name,
        price.toString(),
        true,
        {
          from: accounts[0],
          gasLimit: 3500000,
        }
      );

      await transaction.wait();
    } catch (error) {
      console.log(error);
    }
  }

  async function mintCollectable(url) {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        nftContractAddress,
        PAYRUESTORE.abi,
        signer
      );
      const accounts = await provider.listAccounts();
      const price = ethers.utils.parseUnits(formInput.price, "ether");
      const commission = ethers.utils.parseUnits(
        (Number(formInput.price) / 100).toString(),
        "ether"
      );
      const transaction = await contract.mintCollectable(
        accounts[0],
        url,
        formInput.name,
        price.toString(),
        true,
        {
          from: accounts[0],
          value: commission.toString(),
        }
      );

      await transaction.wait();
    } catch (error) {
      console.log(error);
    }
  }

  async function createMarket() {
    const { name, description, price, categoryId, collectionId } = formInput;
    if (!name || !description || !price || !fileUrl || !categoryId) return;
    const data = JSON.stringify({
      name,
      description,
      categoryId,
      collectionId,
      image: fileUrl,
    });
    try {
      startLoading();
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      if (selectedToken === "PROPEL") {
        await mintCollectableByPropel(url);
      } else {
        await mintCollectable(url);
      }
      //await list(url);
      stopLoading();
      router.push("/");
      // Swal.fire({
      //   title: "Success!",
      //   icon: "success",
      //   text: "Your item has been listed!",
      // });
    } catch (error) {
      stopLoading();
      console.log("Error uploading file: ", error);
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Something went wrong!",
      });
    }
  }

  return (
    <div className="flex justify-center pt-10">
      <CreateCollectionPopup
        open={createCollectionPopup}
        onClose={() => changeCreateCollectionPopup(false)}
      />
      <div className="w-full px-2 sm:px-0 sm:w-3/4 md:w-1/2 lg:1/3 flex gap-2 flex-col pb-12">
        <div className="w-full flex flex-col">
          <div className="flex items-center bg-gray-200 p-px rounded-xl overflow-hidden w-max mx-auto">
            <button
              className={`rounded-xl text-lg py-1.5 px-6 flex items-center gap-4 text-payrue-blue ${
                selectedToken === "PROPEL" ? "bg-white" : "opacity-50"
              }`}
              onClick={() => setSelectedToken("PROPEL")}
            >
              <img src="/img/propel.svg" className="h-7" alt="" />
              <span>Propel</span>
            </button>
            <button
              className={`rounded-xl text-lg py-1.5 px-6 flex items-center gap-4 text-purple-700 ${
                selectedToken === "MATIC" ? "bg-white" : "opacity-50"
              }`}
              onClick={() => setSelectedToken("MATIC")}
            >
              <img src="/img/polygon-matic-logo.svg" className="h-7" alt="" />
              <span>MATIC</span>
            </button>
          </div>
          <p className="flex items-center p-1 rounded-md overflow-hidden w-max mx-auto text-payrue-black opacity-50 font-light">
            {selectedToken === "PROPEL" ? 0.5 : 1}% Commission
          </p>
        </div>

        <label
          htmlFor="Asset"
          className="cursor-pointer w-40 text-center border-payrue-blue border rounded-xl py-2 px-4 text-payrue-blue hover:bg-blue-50 hover:border-transparent transition duration-200 "
        >
          Choose File{" "}
          <input
            type="file"
            name="Asset"
            id="Asset"
            className="hidden"
            accept="image/*"
            onChange={onChange}
          />
        </label>

        {fileUrl && (
          <img className="rounded mt-4" width="350" src={fileUrl} alt="" />
        )}
        <input
          placeholder="NFT Name"
          className="border rounded-xl p-4"
          onChange={handleOnChange("name")}
        />
        <Select
          instanceId={"category"}
          key={formInput.categoryId}
          onChange={handleOnChangeCategory}
          defaultValue={defaultValueCategory()}
          className="flex-1"
          styles={selectStyles}
          options={categories.map(({ id, name }) => ({
            label: name,
            value: id,
          }))}
        />
        {session && (
          <div className="flex justify-between items-center gap-3.5 flex-col sm:flex-row">
            <button
              onClick={() => changeCreateCollectionPopup(true)}
              className="flex w-full sm:w-64 items-center justify-center py-4 px-6 text-payrue-blue border-payrue-blue border rounded-lg hover:bg-blue-50 transition duration-200"
            >
              Create new collection
            </button>
            <p className="font-normal text-lg text-payrue-gray-60">Or</p>
            <Select
              instanceId={"collection"}
              onChange={handleOnChangeCollection}
              defaultValue={defaultValueCollection()}
              key={formInput.collection}
              styles={selectStyles}
              options={myCollections.map(({ id, name }) => ({
                label: name,
                value: id,
              }))}
              className="flex w-full sm:w-64"
            />
          </div>
        )}

        <textarea
          placeholder="Description"
          className="border rounded-xl p-4 resize-none"
          onChange={handleOnChange("description")}
        />
        <input
          placeholder={`Price in ${selectedToken}`}
          className="border rounded-xl p-4"
          onChange={handleOnChange("price")}
        />
        {session && (
          <button
            onClick={createMarket}
            className="mt-2 transition duration-200 text-center hover:bg-blue-50 hover:border-payrue-blue border-transparent border hover:text-payrue-blue hover:shadow-none bg-payrue-blue text-white rounded-xl p-4 shadow-lg"
          >
            Create Digital Asset
          </button>
        )}
        {!session && (
          <button
            className="mt-4 transition duration-200 hover:bg-blue-50 hover:border-payrue-blue border-transparent border hover:text-payrue-blue hover:shadow-none bg-payrue-blue text-white rounded-xl p-4 shadow-lg"
            onClick={login}
          >
            Please Login before creating your NFT
          </button>
        )}
      </div>
    </div>
  );
});

export default CreateItem;
