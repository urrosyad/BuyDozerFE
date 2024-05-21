/** @format */
import axios from "axios";
const authData = localStorage.getItem('AuthData')
const auth = JSON.parse(authData)
// const accessToken = auth.accessToken
const accessToken = localStorage.getItem('AccessToken')

// const userId = auth.userId

//UNIT

export const GET_UNIT = async (props = {}) => {
  const { nameUnit = "", sortBuy = "", pageNumber = 1, pageSize = 10 } = props;

  const BASE_URL_GET_UNIT = `https://localhost:5001/api/HeavyUnits/GetHeavyUnit?ParameterUnit=%25${nameUnit}%25&PriceBuy=${sortBuy}&PageNumber=${pageNumber}&PageSize=${pageSize}`;

  try {
    const response = await axios.get(BASE_URL_GET_UNIT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data.items;
    const totalCount = response.data.totalCount
    console.log("ini log dari funct API", data);
    return { data, totalCount };
  } catch (error) {
    console.error("Error fetching Unit:", error);
  }
};

export const GET_UNIT_BYNAME = async ({ nameUnit }) => {

  const BASE_URL_GET_UNIT = `https://localhost:5001/api/HeavyUnits/GetHeavyUnit?ParameterUnit=%25${nameUnit}%25&PriceRent=false&PriceBuy=false&PageNumber=1&PageSize=1`;
  try {
    const response = await axios.get(BASE_URL_GET_UNIT, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataUnit = response.data.items
    return dataUnit

  } catch (error) {
    throw error;
  }
};

export const POST_UNIT = async ({ unitValues = "" }) => {
  const BASE_URL_POST_UNIT = "https://localhost:5001/api/HeavyUnits/CreateHeavyUnit"
  try {
    const response = await axios.post(BASE_URL_POST_UNIT, unitValues, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataUnit = response.data
    return dataUnit;
  } catch (error) {
    console.error('Error while Post Unit:', error);
    throw error
  }
};

export const PUT_UNIT = async ({ id, unitValues }) => {

  console.log("ID DAN ISI PUT UNIT:", id, unitValues);

  const BASE_URL_PUT_UNIT = `https://localhost:5001/api/HeavyUnits/UpdateHeavyUnit/${id}`
  try {
    const response = await axios.put(BASE_URL_PUT_UNIT, unitValues, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataUnit = response.data
    return dataUnit;
  } catch (error) {
    console.error('Error while Put Unit:', error);
    throw error
  }
}

export const DELETE_UNIT = async ({ id }) => {

  const BASE_URL_DELETE_UNIT = `https://localhost:5001/api/HeavyUnits/DeleteHeavyUnit/${id}`
  try {
    const response = await axios.delete(BASE_URL_DELETE_UNIT, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataUnit = response.data
    return dataUnit;
  } catch (error) {
    console.error('Error while Delete Unit:', error);
    throw error
  }
}

// TRANSACTION

export const GET_TRANSACTION_BUY = async ({ transactionNum }) => {
  const BASE_URL_GET_TRANSACTION_BUY = `https://localhost:5001/api/TransactionDetailBuy/GetTransactionDetailBuy?ParameterTransactionNumber=${transactionNum}&SortDate=true&PageNumber=1&PageSize=100`
  try {
    const response = await axios.get(BASE_URL_GET_TRANSACTION_BUY, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data
    console.log("INI TRXBUY", data);
    return { data };
  } catch (error) {
    console.error('Error Get transaction buy:', error);
  }
};

export const GET_TRANSACTION_RENT = async ({ transactionNum }) => {
  // False = Desc && True = Asc
  const BASE_URL_TRANSACTION = `https://localhost:5001/api/TransactionDetailRents/GetTransactionDetailRent?ParameterTransactionNumber=%25${transactionNum}%25&SortDate=true&PageNumber=1&PageSize=1`;
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(BASE_URL_TRANSACTION, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data
    return { data };

  } catch (error) {
    console.error('Error Get transaction rent:', error);
  }
};

export const GET_TRANSACTION_REPORT = async () => {
  const BASE_URL_TRANSACTION_REPORT = `https://localhost:5001/api/TransactionReport/GetTransactionReport`;
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(BASE_URL_TRANSACTION_REPORT, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data
    console.log("DATA REPORT", data);
    return { data };
  } catch (error) {
    console.error('Error Get transaction report:', error);
    return { data: [] }
  }
};

//TRANSACTION ON GOING
export const GET_TRANSACTION_ONGOING = async ({ username, transactionNum }) => {
  const BASE_URL_GET_TRANSACTION_ONGOING = `https://localhost:5001/api/TransactionOnGoing/GetTransactionOnGoing?ParameterUserName=${username}&ParameterTransactionNumber=${transactionNum ? transactionNum : "%25%25"}&ParameterStatus=%25%25&SortDate=true&PageNumber=1&PageSize=${transactionNum ? "1" : "50"}`
  try {
    console.log({ accessToken });
    const response = await axios.get(BASE_URL_GET_TRANSACTION_ONGOING, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const totalCount = response.data.totalCount
    const data = response.data.items || [];
    return { data, totalCount };
  } catch (error) {
    console.error('ERROR GET TRANSACTION:', error);
  }
};

//USER

export const GET_USER = async (props = {}) => {
  const { userName = "", sortUserName = true, pageNumber = 1, pageSize = 10 } = props;

  // False = Desc && True = Asc
  const BASE_URL_USER = `https://localhost:5001/api/UserEntitys/GetUserEntity?ParameterName=%25${userName}%25&SortUserName=${sortUserName}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(BASE_URL_USER, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataUser = response.data.items
    const totalCount = response.data.totalCount
    return { dataUser, totalCount };

  } catch (error) {
    console.error('Error get User:', error);
    // throw error;
  }
};