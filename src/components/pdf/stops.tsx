import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
    Image,
} from "@react-pdf/renderer";
import stopImg from "../../assets/stop.png";
import lineImg from "../../assets/line.png";
import stopGrayImg from "../../assets/stopGray.png";
import lineGrayImg from "../../assets/lineGray.png";
import bypassImg from "../../assets/bypass.png";

import { OdptBusroutePattern, OdptBusstopPoleOrder } from "../../@types/odpt";
import { getPolesFromRoutePatterns } from "../StopOptions";

type StopProp = {
    stopName: string;
    passTypes: PassType[];
};
type StopsProps = {
    routePatterns: OdptBusroutePattern[];
    selectStopId: string;
};

const getStopEachPattern = (passType: PassType) => {
    let src = "";
    if (passType.bypass) {
        src = bypassImg;
    } else {
        src = passType.passed ? stopGrayImg : stopImg;
    }
    return <Image src={src} />;
};
const getLineEachPattern = (passType: PassType) => {
    let src = "";
    if (passType.bypass) {
        src = bypassImg;
    } else {
        src = passType.passed ? lineGrayImg : lineImg;
    }
    return <Image src={src} />;
};

// 個別の停留所
const Stop = ({ stopName, passTypes }: StopProp) => {
    const lines = passTypes.map((passType) => {
        return getLineEachPattern(passType);
    });
    const stops = passTypes.map((passType) => {
        return getStopEachPattern(passType);
    });

    return (
        <View>
            <Text>{lines}</Text>
            <Text>
                {stops}
                {stopName}
            </Text>
        </View>
    );
};

type PassType = {
    /**
     * そもそも標柱を通らない
     */
    bypass: boolean;

    /**
     * 通過済みかどうか
     */
    passed: boolean;
};

// 運行系統図の停留所部分
const Stops = ({ routePatterns, selectStopId }: StopsProps) => {
    // 標柱
    const poles = getPolesFromRoutePatterns(routePatterns);

    const stops = poles.map((pole) => {
        /**
         * @var {PassType[]} passTypes 各パターンにおける該当停留所の停車index
         * @description もし停車しなければfalseが代入される
         */
        const passTypes = routePatterns.map((pattern) => {
            const orders = pattern["odpt:busstopPoleOrder"];
            const poleInOrder = orders.find((order) => {
                return order["odpt:busstopPole"] === pole["odpt:busstopPole"];
            });
            const poleIndex = poleInOrder?.["odpt:index"] ?? 0;

            const selectPole = orders.find((order) => {
                return order["odpt:busstopPole"] === selectStopId;
            });
            const selectPoleIndex = selectPole?.["odpt:index"] ?? 0;
            // 選択中停留所indexより、その停留所indexが小さければ、通過している
            // ただし、そもそもpoleIndexが0であれば、経由していない
            return {
                bypass: poleIndex === 0 || selectPoleIndex === 0,
                passed: selectPoleIndex > poleIndex,
            };
        });
        return (
            <Stop
                stopName={pole["odpt:note"] ?? ""}
                key={pole["odpt:busstopPole"]}
                passTypes={passTypes}
            />
        );
    });
    return <View>{stops}</View>;
};

export default Stops;
