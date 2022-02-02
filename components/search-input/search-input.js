import { useRouter } from "next/router";
import Select from "react-select/async";
import axios from "axios";
import { backendUrl } from "../../hooks/useAPI";
import styled from "styled-components";
const SearchInputStyle = styled.div`
  #react-select-search-placeholder {
    color: rgba(55, 63, 81, 0.15) !important;
    font-family: Poppins !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 18px !important;
  }
  & > div > div {
    min-height: unset;
  }
  & * {
    padding: 0;
    margin: 0;
  }
`;
const styles = {
  control: (styles) => ({
    ...styles,
    borderRadius: "0.75rem",
    border: "none",
    outline: "none",
    borderWidth: 0,
    boxShadow: "unset",
  }),
  indicatorsContainer: () => ({
    display: "none",
  }),
};

const SearchInput = () => {
  const handleSearch = async (event) => {
    const { data } = await axios.get(`${backendUrl}/nfts/search-nft/${event}`);
    return data;
  };
  const router = useRouter();
  const handleRoute = (e) => router.push(`/info/${e.id}`);
  return (
    <SearchInputStyle className="border rounded-lg border-payrue-gray px-2 py-1 hover:border-payrue-blue transition duration-200 focus-within:border-payrue-blue hidden lg:flex">
      <Select
        instanceId={"search"}
        className="outline-none w-56"
        styles={styles}
        placeholder="Search"
        cacheOptions
        getOptionLabel={(options) => options["name"]}
        getOptionValue={(options) => options["id"]}
        loadOptions={handleSearch}
        onChange={handleRoute}
      />
      <img src="/img/search-logo.svg" alt="search" />
    </SearchInputStyle>
  );
};

export { SearchInput };
