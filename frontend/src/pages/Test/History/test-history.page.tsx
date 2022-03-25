import {useEffect, useState} from "react";
import {TestHistory} from "../../../models/test.model";
import {Table} from "antd";

export const TestHistoryPage = () => {

    const [testHistory, setTestHistory] = useState<TestHistory>([]);

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Datetime',
            dataIndex: 'datetime',
            key: 'datetime',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
        }
    ];

    useEffect(() => {
        const history = localStorage.getItem('history');
        if (history) {
            const historyArray: TestHistory = JSON.parse(history);
            setTestHistory(historyArray);
        } else {
            setTestHistory([]);
        }
    }, []);

    return (
        <Table dataSource={testHistory} columns={columns} />
    )
}