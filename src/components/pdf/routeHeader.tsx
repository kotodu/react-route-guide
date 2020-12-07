import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import { OdptBusroutePattern } from "../../@types/odpt";

// 系統一覧を表示する
const RouteHeaders = ({
    routePatterns,
}: {
    routePatterns: OdptBusroutePattern[];
}) => {
    return (
        <View>
            {routePatterns.map((pattern) => {
                return (
                    <View>
                        <Text>{pattern["dc:title"]}</Text>
                    </View>
                );
            })}
        </View>
    );
};
export default RouteHeaders;
