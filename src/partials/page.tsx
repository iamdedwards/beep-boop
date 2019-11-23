/* eslint-disable react/prop-types */

import Nav from "./nav";
import * as React from "react";

const Page: React.SFC = (props): JSX.Element =>{
    return (
        <div className="w-100 h-100 d-flex flex-column overflow-hidden" style={{ position: "absolute"}}>
            <Nav/>
            {props.children}
        </div>
    );
}

export default Page;