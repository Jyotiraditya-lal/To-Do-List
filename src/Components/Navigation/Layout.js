import React from "react";
import Navigation from "./Navigation";

const Layout=(props)=>{

    return(
        <React.Fragment>
            <Navigation />
            <main>{props.children}</main>
        </React.Fragment>
    )
}

export default Layout