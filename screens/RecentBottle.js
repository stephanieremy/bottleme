import { useContext, useEffect, useState } from "react";
import { BottlesContext } from "../store/bottle-context";
import BottlesOutput from "../components/BottleOutput";
import { fetchRecentBottles } from "../util/db";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentBottles() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const bottlesCtx = useContext(BottlesContext);
  useEffect(() => {
    setIsFetching(true);

    async function getBottles() {
      try {
        const bottles = await fetchRecentBottles();
        bottlesCtx.setBottles(bottles);
      } catch (e) {
        setError(e);
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

  if (!(error && !isFetching)) {
    return <ErrorOverlay message={error} onConfirm={onConfirm} />;
  }

  return (
    <BottlesOutput
      bottles={bottlesCtx.bottles}
      period="Last 7 Days"
      fallbackText="No bottles registered for the last 7 days."
    />
  );
}

export default RecentBottles;
