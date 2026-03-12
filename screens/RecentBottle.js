import { useContext, useEffect } from "react";
import { BottlesContext } from "../api/bottle-context";
import BottlesOutput from "../components/BottleOutput";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";
import { useBottlesService } from "../api/apiState";
import { WineCard } from "../UI/WineCard";

function RecentBottles() {
  const bottlesCtx = useContext(BottlesContext);
  const { getAllBottles } = useBottlesService();

  useEffect(() => {
    if (getAllBottles.data) {
      bottlesCtx.setBottles(getAllBottles.data);
    }
  }, [getAllBottles.data]);

  if (getAllBottles.isLoading) {
    return <LoadingOverlay />;
  }

  if (getAllBottles.isError) {
    return (
      <ErrorOverlay
        message={getAllBottles.error?.message}
        onConfirm={() => getAllBottles.refetch()}
      />
    );
  }

  return (
    <>
      <BottlesOutput
        bottles={bottlesCtx.bottles}
        period="Last 7 Days"
        fallbackText="No bottles registered for the last 7 days."
      />
    </>
  );
}

export default RecentBottles;
