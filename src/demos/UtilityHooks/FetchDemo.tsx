import { useFetch } from "../../hooks/UtilityHooks/useFetch";

export function FetchDemo() {
  const { data, loading, error } = useFetch<unknown>(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
