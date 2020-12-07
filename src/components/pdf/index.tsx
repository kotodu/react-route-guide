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
        flexDirection: "row",
        backgroundColor: "#E4E4E4",
        fontFamily: "源真ゴシック",
        fontWeight: "normal",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

type Props = {
    routePatterns: OdptBusroutePattern[];
};

// PDFオブジェクトの作成
const RouteGuide = ({ routePatterns }: Props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>お試し</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
            <RouteHeaders routePatterns={routePatterns} />
        </Page>
    </Document>
);

export default RouteGuide;
