import React from "react";

import { useFetchData } from "../../../utils/hooks/fetchApi";
import Range from "../../components/range/range";

const Exercise2 = () => {
  const { data, loading, error } = useFetchData(
    "http://localhost:3030/exercise2"
  );

  const render = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return <Range values={data} mode={"fixed"} />;
  };

  return <>{render()}</>;
};

export default Exercise2;
