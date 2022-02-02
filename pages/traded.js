import { useCallback, useState } from "react";
import { TradedTable } from "../layouts";
import { useStore } from "effector-react";
import { $session } from "../store/session";

const Traded = () => {
  return (
    <div className="flex flex-col lg:flex-row mx-2 md:mx-10 mt-10 gap-8">
      <div className="flex-1">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <TradedTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traded;
