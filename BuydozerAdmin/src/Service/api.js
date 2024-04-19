export default const BASE_URL_GET_UNIT = ({ SearchValue, BuySort, PageNumber, PageSize}) => {
          const BASE_URL_GET_UNIT = `https://localhost:5001/api/HeavyUnits?ParameterUnit=%25${SearchValue}%25&PriceRent=false&PriceBuy=${BuySort}&PageNumber=${PageNumber}&PageSize=${PageSize}`;
}