import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import RouteGuide from "./pdf/index";

/**
 * RouteGuidePDFの出力
 */
const PdfDisplay = () => {
    return (
        <PDFViewer width="100%" height="100%">
            <RouteGuide />
        </PDFViewer>
    );
};

export { PdfDisplay };
