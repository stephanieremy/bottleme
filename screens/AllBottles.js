import BottlesOutput from "../components/BottleOutput";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";
import { useBottlesService } from "../api/apiState";

function AllBottles() {
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
      period="Total"
      fallbackText="No registered bottles found!"
    />
  );
}

export default AllBottles;
