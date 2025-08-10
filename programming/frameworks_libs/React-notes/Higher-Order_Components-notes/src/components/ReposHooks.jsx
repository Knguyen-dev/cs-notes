import useDataFetching from "./useDataFetching";

export default function ReposHooks() {
  const { isLoading, error, data } = useDataFetching();
  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return error.message;
  }
  return (
    <ul>
      {/* Render out all list items */}
      {data.map(({ id, html_url, full_name }) => (
        <li key={id}>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {full_name}
          </a>
        </li>
      ))}
    </ul>
  );
}
