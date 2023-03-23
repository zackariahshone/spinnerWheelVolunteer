import React, { Fragment, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Customizations as Custom } from "../SpinnerCusomizations/customizations";
import { SpinnerPage } from "../SpinnerPage/spinnerPage";
import { SetUser } from "./Components/SetUser";
import { useSelector } from "react-redux";
import { currentEmployee } from "../../store/Reducers/UserReducers";
import './style.css'
export const Home = () => {
    const whosSpinning = useSelector(currentEmployee);
    console.log(whosSpinning);
    const [page, setPage] = useState('home')
    const [spinnerConfig, setSpinnerConfig] = useState();
    const pageConfig = []
    const {spinnerTitle } = spinnerConfig | {}
    const directPage = (pageInput) => {
        
        switch (pageInput) {
            case 'home':
                return <SetUser setPage={setPage}/>
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
        <Container>

        <Fragment>
            <span
                id="whosSpinning"
            >{whosSpinning ? `${whosSpinning} is currently spinning!`: 'No body is signed in' }</span>
            <div>
                <h1>{spinnerTitle ?spinnerTitle : page.toLocaleUpperCase()}</h1>
                {pageConfig.map((nextPage,x) => {
                    return (
                        <Button
                            key={`button${x}`}
                            style = {{margin: '1%'}}
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
        </Container>


    )
}