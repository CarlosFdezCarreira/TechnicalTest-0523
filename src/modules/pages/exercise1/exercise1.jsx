import React, { useState } from "react";

import { useFetchData } from "../../../utils/hooks/fetchApi";
import Range from "../../components/range/range";

const Exercise1 = () => {
  const { data, loading, error } = useFetchData(
    "http://localhost:3030/exercise1"
  );

  const render = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return <Range {...data} mode={"normal"} />;
  };

  return <>{render()}</>;
};

export default Exercise1;
