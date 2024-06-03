import { useContext, useEffect, useState } from "react";

import { BottlesContext } from "../store/bottle-context";
import BottlesOutput from "../components/BottleOutput";
import { fetchBottles } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function AllBottles() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const bottlesCtx = useContext(BottlesContext);
  useEffect(() => {
    setIsFetching(true);

    async function getBottles() {
      try {
        const bottles = await fetchBottles();
        bottlesCtx.setBottles(bottles);
      } catch (error) {
        setError("Could not fetch bottles");
      }
    }

    setIsFetching(false);
    getBottles();
  }, []);

  function onConfirm() {
    setError(null);
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={onConfirm} />;
  }
  return (
    <BottlesOutput
      bottles={bottlesCtx.bottles}
      period="Total"
      fallbackText="No registered bottles found!"
    />
  );
}

export default AllBottles;
