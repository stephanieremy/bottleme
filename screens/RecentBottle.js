import BottlesOutput from "../components/BottleOutput";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";
import { useBottlesService } from "../api/apiState";

function RecentBottles() {
  const { getAllBottles } = useBottlesService();

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
    <BottlesOutput
      bottles={getAllBottles.data ?? []}
      period="Last 7 Days"
      fallbackText="No bottles registered for the last 7 days."
    />
  );
}

export default RecentBottles;
