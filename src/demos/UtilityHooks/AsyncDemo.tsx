import { useAsync } from "../../hooks/UtilityHooks/useAsync";
import { useEffect } from "react";

export function AsyncDemo() {
  const { execute, status, data } = useAsync(() =>
    fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) =>
      res.json()
    )
  );

  useEffect(() => {
    execute();
  }, [execute]);

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error occurred</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
