import { useContext, useEffect, useState } from "react";
import { getDateMinusDays } from "../util/date";
import { BottlesContext } from "../store/bottle-context";
import BottlesOutput from "../components/BottleOutput";
import { fetchBottles } from "../util/db";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentBottles() {
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

  const recentBottles = bottlesCtx.bottles?.filter((bottle) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return bottle?.date >= date7DaysAgo && bottle?.date <= today;
  });

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (!(error && !isFetching)) {
    return <ErrorOverlay message={error} onConfirm={onConfirm} />;
  }

  return (
    <BottlesOutput
      bottles={recentBottles}
      period="Last 7 Days"
      fallbackText="No bottles registered for the last 7 days."
    />
  );
}

export default RecentBottles;
