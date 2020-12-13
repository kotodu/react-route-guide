import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

// ttf,otf型定義を
// ! : 一部フォントでないと文字化けを起こすので注意
// https://github.com/diegomura/react-pdf/issues/875
// Nasuか源真ゴシックでないと出来ない、という情報すらある
import GenShinNormal from "../../fonts/GenShinGothic-Normal.ttf";
import { OdptBusroutePattern } from "../../@types/odpt";
import RouteHeaders from "./routeHeader";
import Stops from "./stops";

/**
 * @summary 使用するフォントの定義
 */
Font.register({
    family: "源真ゴシック",
    fonts: [
        {
            src: GenShinNormal,
            fontStyle: "normal",
            fontWeight: "normal",
        },
    ],
});

/**
 * @summary スタイル定義
 */
const styles = StyleSheet.create({
    page: {
        // flexDirection: "row",
        backgroundColor: "#E4E4E4",
        fontFamily: "源真ゴシック",
        fontWeight: "normal",
        lineHeight: 1,
        fontSize: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        width: "100%",
        textAlign: "center",
        color: "white",
        backgroundColor: "black",
        fontSize: 20,
        lineHeight: 1.2,
    },
    stops: {
        marginHorizontal: 10,
        width: "100%",
    },
});

type Props = {
    routePatterns: OdptBusroutePattern[];
    selectStopId: string;
};

// PDFオブジェクトの作成
const RouteGuide = ({ routePatterns, selectStopId }: Props) => {
    const selectPattern = routePatterns?.[0];
    const selectOrders = selectPattern["odpt:busstopPoleOrder"];
    const selectOrder = selectOrders.find((order) => {
        return order["odpt:busstopPole"] === selectStopId;
    });
    const selectIndex = selectOrder?.["odpt:index"] ?? 1;
    const selectName = selectOrder?.["odpt:note"] ?? "";
    const stopsView = (
        <Stops stopOrders={selectOrders} selectIndex={selectIndex} />
    );
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap={true}>
                <Text style={styles.header}>
                    運行系統図サンプル【{selectName} 】
                </Text>
                <View style={styles.stops}>{stopsView}</View>
            </Page>
        </Document>
    );
};

export default RouteGuide;
