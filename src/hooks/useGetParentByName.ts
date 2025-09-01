import useSWR from 'swr';
const useGetParentByName = (name: string | null) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  console.log(name);
  const { data: parent, error: error } = useSWR(
    name ? `/api/combination_parent?name=${name}` : `/api/combination_parent`,
    fetcher
  );
  console.log(parent);
  return {
    combinations_parent: parent,
    combinations_parentError: error,
  };
};

export default useGetParentByName;
