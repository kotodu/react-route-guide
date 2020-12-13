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

import { OdptBusstopPoleOrder } from "../../@types/odpt";

type StopProp = {
    stopName: string;
    passed: boolean;
};
type StopsProps = {
    stopOrders: OdptBusstopPoleOrder[];
    selectIndex: number;
};

// 個別の停留所
const Stop = ({ stopName, passed }: StopProp) => {
    const line = passed ? <Image src={lineGrayImg} /> : <Image src={lineImg} />;
    const stop = passed ? <Image src={stopGrayImg} /> : <Image src={stopImg} />;
    return (
        <View>
            <Text>{line}</Text>
            <Text>
                {stop}
                {stopName}
            </Text>
        </View>
    );
};

// 運行系統図の停留所部分
const Stops = ({ stopOrders, selectIndex }: StopsProps) => {
    return (
        <View>
            {stopOrders.map((order) => {
                return (
                    <Stop
                        stopName={order["odpt:note"] ?? ""}
                        passed={selectIndex > order["odpt:index"]}
                        key={order["odpt:busstopPole"]}
                    />
                );
            })}
        </View>
    );
};

export default Stops;
