import React, { useEffect, useRef } from "react";
import { useStore } from "effector-react";
import {
  $collection,
  $collectionLoading,
  $cover,
  changeCollection,
  changeCover,
  updateCollection,
} from "../../store/collections";

const CreateCollectionPopup = ({ open, onClose = () => undefined }) => {
  const ref = React.useRef();
  const collection = useStore($collection);
  const cover = useStore($cover);
  const logoRef = useRef();
  const coverRef = useRef();
  const loading = useStore($collectionLoading);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        onClose(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  const handleChange = (e) => {
    changeCollection({ ...collection, [e.target.name]: e.target.value });
  };

  const handleChangeLogo = (e) => {
    changeCollection({ ...collection, file: e.target.files[0] });
  };

  const handleChangeCover = (e) => {
    changeCover(e.target.files[0]);
  };

  const handleEditLogo = () => {
    changeCollection({ ...collection, file: null });
    setTimeout(() => {
      logoRef.current.click();
    }, 50);
  };

  const handleEditCover = () => {
    changeCover(null);
    setTimeout(() => {
      coverRef.current.click();
    }, 50);
  };

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } inset-0 absolute z-10 flex items-center justify-center backdrop-filter backdrop-blur-lg`}
      style={{ background: "#B4CBFF42" }}
    >
      <div
        className="w-96 py-28 px-14 flex flex-col justify-center items-center rounded-2xl gap-5 relative"
        ref={ref}
        style={{
          background: "#FFFFFFE5",
          boxShadow: "-8px 7px 17px 0px #0000001A",
        }}
      >
        <button
          onClick={onClose}
          className="right-6 top-6 absolute w-10 cursor-pointer"
        >
          <img src="/img/close.svg" alt="close" />
        </button>
        {!collection.file && (
          <label
            htmlFor="logo"
            className="cursor-pointer flex items-center justify-center w-44 h-44 rounded-full text-center border-payrue-blue border py-2 px-4 text-payrue-blue hover:bg-blue-50 hover:border-transparent transition duration-200 "
          >
            Choose Logo{" "}
            <input
              type="file"
              name="file"
              id="logo"
              className="hidden"
              ref={logoRef}
              value={collection.file}
              accept="image/*"
              onChange={handleChangeLogo}
            />
          </label>
        )}
        {collection.file && (
          <div className="relative">
            <img
              className="w-44 h-44 rounded-full"
              src={URL.createObjectURL(collection.file)}
              alt="collection logo"
            />
            <img
              className="absolute top-14 right-14"
              src="/img/Edit-Pen.svg"
              alt="close"
              onClick={handleEditLogo}
            />
          </div>
        )}

        {!cover && (
          <label
            htmlFor="cover"
            className="cursor-pointer flex items-center justify-center w-full h-20 rounded-xl text-center border-payrue-blue border py-2 px-4 text-payrue-blue hover:bg-blue-50 hover:border-transparent transition duration-200 "
          >
            Choose Cover{" "}
            <input
              type="file"
              name="file"
              id="cover"
              className="hidden"
              ref={coverRef}
              value={cover}
              accept="image/*"
              onChange={handleChangeCover}
            />
          </label>
        )}
        {cover && (
          <div className="relative w-full">
            <img
              className="w-full h-20 rounded-xl object-cover"
              src={URL.createObjectURL(cover)}
              alt="collection cover"
            />
            <img
              className="absolute top-2"
              style={{ right: "105px" }}
              src="/img/Edit-Pen.svg"
              alt="close"
              onClick={handleEditCover}
            />
          </div>
        )}
        <input
          placeholder="Collection Name"
          className="border rounded-xl p-4 w-full shadow-lg"
          value={collection.name || ""}
          name="name"
          onChange={handleChange}
        />
        <textarea
          placeholder="Description"
          className="border rounded-xl p-4 resize-none w-full shadow-lg"
          value={collection.description || ""}
          onChange={handleChange}
          name="description"
        />
        <button
          disabled={loading}
          onClick={updateCollection}
          className="mt-2 transition w-full duration-200 text-center hover:bg-blue-50 hover:border-payrue-blue border-transparent border hover:text-payrue-blue hover:shadow-none bg-payrue-blue text-white rounded-xl p-4 shadow-lg"
        >
          Create Collection
        </button>
      </div>
    </div>
  );
};

export { CreateCollectionPopup };
