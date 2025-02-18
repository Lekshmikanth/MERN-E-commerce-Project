import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { PacmanLoader } from "react-spinners";

const LoadingCustomOverlay = ({ active, children, spinnerProps = "" }) => {
    let loader = <PacmanLoader />;
    switch (spinnerProps) {
        case "selectTagProp":
            loader = <PacmanLoader />;
            break;
        default:
            loader = <PacmanLoader size={10} />;
            break;
    }

    return <LoadingOverlay
        active={active}
        styles={{
            overlay: (base) => ({
                ...base,
                background: "transparent",
                zIndex: 999
            })
        }}

        spinner={loader}
    >
        {children}
    </LoadingOverlay>;

};

export default LoadingCustomOverlay;
