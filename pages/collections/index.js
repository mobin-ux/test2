import axios from "axios";
import React from "react";
import CollectionCard from "../../components/collection-card";
import { backendUrl } from "../../hooks/useAPI";
import { useGate, useStore } from "../../node_modules/effector-react";
import { $collections, collectionsGate } from "../../store/collections";

const Collections = ({ collections }) => {
  // useGate(collectionsGate);
  // const collection = useStore($collections);

  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className="mx-2 lg:mt-20 md:mx-14"
        style={{ maxWidth: "1600px", width: "100%" }}
      >
        {collections.length === 0 && (
          <div className="text-5xl h-96 font-bold flex items-center justify-center">
            There is not any collection
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 pt-4">
          {collections.map((collection, i) => (
            <CollectionCard key={i} {...collection} />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${backendUrl}/collections`);
  return { props: { collections: data } };
}

export default Collections;
