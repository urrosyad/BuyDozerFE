import axios from "axios";


export const GET_UNIT = async (props) => {
          const { nameUnit, sortBuy, pageNumber, pageSize } = props
          const BASE_URL_GET_UNIT = `https://localhost:5001/api/HeavyUnits/GetHeavyUnit?ParameterUnit=%25${nameUnit}%25&PriceBuy=${sortBuy}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
        
          const accessToken = localStorage.getItem('AccessToken');
          try {
            const response = await axios.get(BASE_URL_GET_UNIT, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              }
            });
        
            const data = response.data.items
            console.log("ini log dari funct API", data);
            return { data };
          } catch (error) {
            console.error('Error fetching Unit:', error);
          }
        };

