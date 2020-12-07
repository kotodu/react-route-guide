import axios from "axios";
import { OdptBusroutePattern } from "../@types/odpt";

// TODO : odptの型定義データ作成。既にあるなら探すこと
// TODO : このあたりのクエリ付与処理を効率化したい

/**
 * @method joinKeyValue
 * @param mainUrl 
 * @param queryKey 
 * @param value 
 */
const joinKeyValue = (
    queryKey: string,
    value: string
) => {
    return (queryKey + "=" + value);
}

/**
 * @method getBusroutePattern
 * @param operator 
 * @param busroute 
 * @param consumerKey 
 */
const getBusroutePattern = (
    operator: string,
    busroute: string,
    consumerKey: string
) => {

    // メインのRequestURL
    const endPoint = "https://api-tokyochallenge.odpt.org/api/v4/";
    const requestPath = "odpt:BusroutePattern?";

    // consumerクエリ
    const consumerQueryKey = "acl:consumerKey";
    const consumerQuery = joinKeyValue(consumerQueryKey, consumerKey);

    // operatorクエリ
    const operatorQueryKey = "odpt:operator";
    const operatorQuery = "&" + joinKeyValue(operatorQueryKey, operator);

    // routeクエリ
    const routeQueryKey = "odpt:busroute";
    const routeQuery = "&" + joinKeyValue(routeQueryKey, busroute);

    const path = endPoint.concat(
        requestPath,
        consumerQuery,
        operatorQuery,
        routeQuery
    );

    // TODO : axiosのparamの使い方を確認すること
    // 本心ではparamを使いたいが、クオーテーションが含まれてラーに？
    return axios.get(path)
        .then(response => {
            console.log(response)
            return response.data as OdptBusroutePattern[];
        });
}

export {
    getBusroutePattern
}