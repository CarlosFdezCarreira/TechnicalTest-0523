import React, { useState } from "react";

import { useFetchData } from "../../../utils/hooks/fetchApi";
import Range from "../../components/range/Range";

 const Exercise1 = () => { 
	const { data, loading, error } = useFetchData('http://localhost:3030/exercise1');

    return(
        <Range
            data={data}
        />
    )

}

export default Exercise1;