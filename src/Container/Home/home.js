import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { Customizations as Custom } from "../SpinnerCusomizations/customizations";
import { SpinnerPage } from "../SpinnerPage/spinnerPage";



export const Home = () => {
    const [page, setPage] = useState('home')
    const [spinnerConfig, setSpinnerConfig] = useState();
    const pageConfig = ['spinner', 'customize']

    const directPage = (pageInput) => {
        switch (pageInput) {
            case 'home':
                return <h1>spinner wheel</h1>
            case 'spinner':
            case 'submit':
                return <SpinnerPage spinnerConfig={spinnerConfig} />
            case 'customize':
                return <Custom setPage={setPage} setConfig={setSpinnerConfig} config={spinnerConfig} />
            default:
                break
        }
    }

    return (
        <Fragment>
            <div>
                <h1>{page.toLocaleUpperCase()}</h1>
                {pageConfig.map((nextPage) => {
                    return (
                        <Button
                            style = {{margin: '10%'}}
                            onClick={() => {
                                setPage(nextPage);
                            }}
                        >
                            {nextPage}
                        </Button>
                    )
                })}
            </div>
            <div>
                {directPage(page)}
            </div>
        </Fragment>


    )
}