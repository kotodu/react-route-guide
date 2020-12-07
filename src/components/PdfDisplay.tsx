import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import RouteGuide from "./pdf/index";
import { OdptBusroutePattern } from "../@types/odpt";

type Props = {
    routePatterns: OdptBusroutePattern[];
};

/**
 * RouteGuidePDFの出力
 */
const PdfDisplay = ({ routePatterns }: Props) => {
    return (
        <PDFViewer width="100%" height="100%">
            <RouteGuide routePatterns={routePatterns} />
        </PDFViewer>
    );
};

export { PdfDisplay };
