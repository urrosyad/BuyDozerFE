/** @format */
import axios from "axios";
import { useNavigate } from "react-router-dom";
const userName = localStorage.getItem("UserName");
const accessToken = localStorage.getItem("AccessToken");

//---------UNIT ENDPOINT---------//
export const GET_UNIT = async (props = {}) => {
  const { nameUnit = "", sortBuy = "", pageNumber = 1, pageSize = 10 } = props;
  const BASE_URL_GET_UNIT = `https://buydozermain-api.azurewebsites.net/api/HeavyUnits/GetHeavyUnit?ParameterUnit=%25${nameUnit}%25&PriceBuy=${sortBuy}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  try {
    const response = await axios.get(BASE_URL_GET_UNIT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data.items;
    const totalCount = response.data.totalCount;
    return { data, totalCount };
  } catch (error) {
    console.error("Error fetching Unit:", error);
    throw error;
  }
};

export const GET_UNIT_BYNAME = async ({ nameUnit }) => {
  const BASE_URL_GET_UNIT = `https://buydozermain-api.azurewebsites.net/api/HeavyUnits/GetHeavyUnit?ParameterUnit=%25${nameUnit}%25&PriceRent=false&PriceBuy=false&PageNumber=1&PageSize=1`;
  try {
    const response = await axios.get(BASE_URL_GET_UNIT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataUnit = response.data.items;
    return dataUnit;
  } catch (error) {
    throw error;
  }
};

export const POST_UNIT = async ({ unitValues }) => {
  const BASE_URL_POST_UNIT =
    "https://buydozermain-api.azurewebsites.net/api/HeavyUnits/CreateHeavyUnit";
  try {
    const response = await axios.post(BASE_URL_POST_UNIT, unitValues, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataUnit = response.data;
    return dataUnit;
  } catch (error) {
    console.error("Error while Post Unit:", error);
    throw error;
  }
};

export const PUT_UNIT = async ({ id, unitValues }) => {
  const BASE_URL_PUT_UNIT = `https://buydozermain-api.azurewebsites.net/api/HeavyUnits/UpdateHeavyUnit/${id}`;
  try {
    const response = await axios.put(BASE_URL_PUT_UNIT, unitValues, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataUnit = response.data;
    return dataUnit;
  } catch (error) {
    console.error("Error while Put Unit:", error);
    throw error;
  }
};

export const DELETE_UNIT = async ({ id }) => {
  const BASE_URL_DELETE_UNIT = `https://buydozermain-api.azurewebsites.net/api/HeavyUnits/DeleteHeavyUnit/${id}`;
  try {
    const response = await axios.delete(BASE_URL_DELETE_UNIT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataUnit = response.data;
    return dataUnit;
  } catch (error) {
    console.error("Error while Delete Unit:", error);
    throw error;
  }
};
//---------UNIT ENDPOINT---------//

//---------USER ENDPOINT---------//
export const GET_USER = async (props) => {
  const {
    Username = "",
    PageNumber = 1,
    PageSize = 10,
    SortUserName = true,
  } = props;

  const BASE_URL_USER = `https://buydozermain-api.azurewebsites.net/api/UserEntitys/GetUserEntity?ParameterName=%25${Username}%25&SortUserName=${SortUserName}&PageNumber=${PageNumber}&PageSize=${PageSize}`;

  try {
    const response = await axios.get(BASE_URL_USER, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataUser = response.data.items;
    const totalCount = response.data.totalCount;
    return { dataUser, totalCount };
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
};

export const GET_USER_BYNAME = async ({ Username }) => {
  const BASE_URL_GET_USER = `https://buydozermain-api.azurewebsites.net/api/UserEntitys/GetUserEntity?ParameterName=%25${Username}%25&SortUserName=true&PageNumber=1&PageSize=1
`;
  try {
    const response = await axios.get(BASE_URL_GET_USER, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataUser = response.data.items;
    return dataUser;
  } catch (error) {
    throw error;
  }
};

export const PUT_USER = async ({ id, userValues }) => {
  const BASE_URL_PUT_USER = `https://buydozermain-api.azurewebsites.net/api/UserEntitys/UpdateUserEntity/${id}`;
  try {
    const response = await axios.put(BASE_URL_PUT_USER, userValues, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataUser = response.data;
    return dataUser;
  } catch (error) {
    console.error("Error while Put User:", error);
    throw error;
  }
};

export const PUT_ROLE_ADMIN = async ({ id }) => {
  const BASE_URL_PUT_ROLE_ADMIN = `https://buydozermain-api.azurewebsites.net/api/UserEntitys/CreateAdmin?id=${id}`;
  try {
    const response = await axios.post(BASE_URL_PUT_ROLE_ADMIN, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataUser = response.data;
    return dataUser;
  } catch (error) {
    console.error("Error while updating User to admin:", error);
    throw error;
  }
};

export const DELETE_USER = async ({ id }) => {
  const BASE_URL_DELETE_USER = `https://buydozermain-api.azurewebsites.net/api/UserEntitys/DeleteUserEntity/${id}`;
  try {
    const response = await axios.delete(BASE_URL_DELETE_USER, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataUser = response.data;
    return dataUser;
  } catch (error) {
    console.error("Error while Delete User:", error);
    throw error;
  }
};
//---------USER ENDPOINT---------//

//---------RENT LIST ENDPOINT---------//
export const GET_RENT_LIST = async (props) => {
  const { SearchValue } = props;
  const BASE_URL_GET_RentList = `https://buydozermain-api.azurewebsites.net/api/PriceListRents/GetPriceListRent?ParameterNameRent=%25${SearchValue}%25&SortPrice=true&PageNumber=1&PageSize=5`;
  try {
    const response = await axios.get(BASE_URL_GET_RentList, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataRentList = response.data.items;
    const totalCount = response.data.totalCount;
    return { dataRentList, totalCount };
  } catch (error) {
    console.error("Error fetching RentList:", error);
    throw error;
  }
};

export const POST_RENT_LIST = async ({ requestBody }) => {
  const BASE_URL_POST_RentList =
    "https://buydozermain-api.azurewebsites.net/api/PriceListRents/CreatePriceListRent";

  try {
    const response = await axios.post(BASE_URL_POST_RentList, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataRentList = response.data;
    return dataRentList;
  } catch (error) {
    console.error("Error while Post RentList:", error);
    throw error;
  }
};

export const PUT_RENT_LIST = async ({ id, requestBody }) => {

  const BASE_URL_PUT = `https://buydozermain-api.azurewebsites.net/api/PriceListRents/UpdatePriceListRent/${id}`;
  try {
    const response = await axios.put(BASE_URL_PUT, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataRentList = response.data;
    return dataRentList;
  } catch (error) {
    console.error("Error while Put RentList:", error);
    throw error;
  }
};

export const DELETE_RENT_LIST = async ({ id }) => {
  const BASE_URL_DELETE = `https://buydozermain-api.azurewebsites.net/api/PriceListRents/DeletePriceListRent/${id}`;
  try {
    const response = await axios.delete(BASE_URL_DELETE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const dataRentList = response.data;
    return dataRentList;
  } catch (error) {
    console.error("Error while Delete RentList:", error);
    throw error;
  }
};
//---------RENT LIST ENDPOINT---------//

//---------TRANSACTION ENDPOINT---------//
export const GET_TRANSACTION_BUY = async ({ transactionNum }) => {
  const BASE_URL_GET_TRANSACTION_BUY = `https://buydozermain-api.azurewebsites.net/api/TransactionDetailBuy/GetTransactionDetailBuy?ParameterTransactionNumber=${transactionNum}&SortDate=true&PageNumber=1&PageSize=100`;
  try {
    const response = await axios.get(BASE_URL_GET_TRANSACTION_BUY, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return { data };
  } catch (error) {
    console.error("Error get transaction buy:", error);
    throw error;
  }
};

export const PUT_TRANSACTION_STATUS_BUY = async ({ id, statusTransaction }) => {
  const requestBody = { id, statusTransaction };
  const BASE_URL_PUT_TRANSACTION_STATUS_BUY = `https://buydozermain-api.azurewebsites.net/api/TransactionDetailBuy/UpdateTransactionDetailBuy/${id}`;
  try {
    const response = await axios.put(
      BASE_URL_PUT_TRANSACTION_STATUS_BUY,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const dataTransaksi = response.data;
    return dataTransaksi;
  } catch (error) {
    console.error("Error while Put transaction buy:", error);
    throw error;
  }
};

export const GET_TRANSACTION_RENT = async ({ transactionNum }) => {
  const BASE_URL_GET_TRANSACTION_RENT = `https://buydozermain-api.azurewebsites.net/api/TransactionDetailRents/GetTransactionDetailRent?ParameterTransactionNumber=${transactionNum}&SortDate=true&PageNumber=1&PageSize=1`;
  try {
    const response = await axios.get(BASE_URL_GET_TRANSACTION_RENT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return { data };
  } catch (error) {
    console.error("Error get transaction rent:", error);
    throw error;
  }
};

export const PUT_TRANSACTION_STATUS_RENT = async ({
  id,
  statusTransaction,
}) => {
  const requestBody = { id, statusTransaction };
  const BASE_URL_PUT_TRANSACTION_STATUS_RENT = `https://buydozermain-api.azurewebsites.net/api/TransactionDetailRents/UpdateTransactionDetailRent/${id}`;
  try {
    const response = await axios.put(
      BASE_URL_PUT_TRANSACTION_STATUS_RENT,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const dataTransaksi = response.data;
    return dataTransaksi;
  } catch (error) {
    console.error("Error while Put transaction rent:", error);
    throw error;
  }
};

export const GET_TRANSACTION_ONGOING = async ({ username, transactionNum }) => {
  const BASE_URL_GET_TRANSACTION_ONGOING = `https://buydozermain-api.azurewebsites.net/api/TransactionOnGoing/GetTransactionOnGoing?ParameterUserName=${username}&ParameterTransactionNumber=${transactionNum ? transactionNum : "%25%25"
    }&ParameterStatus=%25%25&SortDate=true&PageNumber=1&PageSize=${transactionNum ? "1" : "50"
    }`;
  try {
    const response = await axios.get(BASE_URL_GET_TRANSACTION_ONGOING, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data.items || [];
    return { data };
  } catch (error) {
    console.error("ERROR GET TRANSACTION:", error);
    throw error;

  }
};

//---------TRANSACTION ENDPOINT---------//


//---------REPORT ENDPOINT---------//
export const GET_TRANSACTION_REPORT = async () => {
  const BASE_URL_TRANSACTION_REPORT = `https://buydozermain-api.azurewebsites.net/api/TransactionReport/GetTransactionReport`;
  try {
    const response = await axios.get(BASE_URL_TRANSACTION_REPORT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return { data };
  } catch (error) {
    console.error("Error Get transaction report:", error);
    return { data: [] };
  }
};

export const GET_REPORT_CARD = async () => {
  const BASE_URL_REPORT_CARD = `https://buydozermain-api.azurewebsites.net/api/TransactionReport/GetReportCard`;
  try {
    const response = await axios.get(BASE_URL_REPORT_CARD, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return { data };
  } catch (error) {
    console.error("Error Get transaction report:", error);
    return { data: [] };
  }
};

export const GET_USER_TRANSACTION_TYPE = async () => {
  const BASE_URL_USER_TRANSACTION_TYPE = `https://buydozermain-api.azurewebsites.net/api/TransactionReport/GetUserTransactionType`;
  try {
    const response = await axios.get(BASE_URL_USER_TRANSACTION_TYPE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return { data };
  } catch (error) {
    console.error("Error Get transaction report:", error);
    return { data: [] };
  }
};

export const GET_SUMMARY_TRANSACTION_STATUS = async () => {
  const BASE_URL_SUMMARY_TRANSACTION = `https://buydozermain-api.azurewebsites.net/api/TransactionReport/GetSummaryTransactionStatus`;
  try {
    const response = await axios.get(BASE_URL_SUMMARY_TRANSACTION, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return { data };
  } catch (error) {
    console.error("Error Get transaction report:", error);
    return { data: [] };
  }
};

export const GET_UNIT_REMAINING = async () => {
  const BASE_URL_UNIT_REMAINING = `https://buydozermain-api.azurewebsites.net/api/TransactionReport/GetUnitRemaining`;
  try {
    const response = await axios.get(BASE_URL_UNIT_REMAINING, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data.items;
    return { data };
  } catch (error) {
    console.error("Error Get transaction report:", error);
    return { data: [] };
  }
};

//---------REPORT ENDPOINT---------//
