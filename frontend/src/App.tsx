import React, {useEffect} from 'react';
import './App.css';
import {
    BrowserRouter,
    Route,
    Routes, Navigate
} from "react-router-dom";
import {TestIndexPage} from "./pages/Test/test-index.page";
import {LayoutIndex} from "./layout/layout-index";
import {TestHistoryPage} from "./pages/Test/History/test-history.page";

function App() {

    useEffect(() => {
        if (localStorage.getItem("history") === null) {
            localStorage.setItem("history", JSON.stringify([]));
        }
    }, []);


    return (
        <>
            <BrowserRouter>
                {
                    <Routes>
                        <Route path="/" element={<LayoutIndex/>}>
                            <Route path="/test" element={<TestIndexPage/>}/>
                            <Route path="/history" element={<TestHistoryPage/>}/>
                        </Route>
                        <Route
                            path="*"
                            element={
                                <main style={{padding: "1rem"}}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Routes>
                }
            </BrowserRouter>
        </>
    );
}

export default App;
