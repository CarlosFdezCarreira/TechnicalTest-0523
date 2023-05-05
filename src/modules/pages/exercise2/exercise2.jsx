import React  from "react";

import { useFetchData } from "../../../utils/hooks/fetchApi";
import Range from "../../components/range/Range";

 const Exercise2 = () => { 
	const { data } = useFetchData('http://localhost:3030/exercise2');

    return(
        <Range
            values={data}
        />
    )

}

export default Exercise2;