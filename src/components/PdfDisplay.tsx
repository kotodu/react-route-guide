import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import RouteGuide from "./pdf/index";
import { OdptBusroutePattern } from "../@types/odpt";

type Props = {
    routePatterns: OdptBusroutePattern[];
    selectStop: string;
};

/**
 * RouteGuidePDFの出力
 */
const PdfDisplay = ({ routePatterns, selectStop }: Props) => {
    return (
        <PDFViewer width="100%" height="100%">
            <RouteGuide routePatterns={routePatterns} selectStopId={selectStop} />
        </PDFViewer>
    );
};

export { PdfDisplay };
