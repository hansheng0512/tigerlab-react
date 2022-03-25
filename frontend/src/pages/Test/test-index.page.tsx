import {Button, notification, Table} from "antd";
import axios from "axios";
import {Test, TestDetails, TestDtoResponse} from "../../models/dto/test.dto";
import {useEffect, useState} from "react";
import { Modal } from 'antd';
import {TestHistory} from "../../models/test.model";

export const TestIndexPage = () => {

    const [dataSource, setDataSource] = useState<Test[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [testDetails, setTestDetails] = useState<TestDetails[]>([]);

    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: Test, record: Test) => {
                return (
                    <Button onClick={() => {
                        setIsModalVisible(true);
                        setTestDetails(record.tests)
                    }}>Test</Button>
                )
            },
        },
    ];

    const testDetailsColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Route',
            dataIndex: 'route',
            key: 'route',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: TestDetails, record: TestDetails) => {
                return (
                    <Button onClick={() => {
                        runTest(record.route, record.name)
                    }}>Test</Button>
                )
            },
        },
    ];

    const getTestList = () => {
        axios.get('http://localhost:8001/api/v1/tests')
            .then(res => {
                const response: TestDtoResponse = res.data;
                setDataSource(response.tests)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log('finally');
            });
    }

    const onSaveIntoStorage = (result: string, name: string) => {
        const history = localStorage.getItem('history');
        if (history) {
            const historyArray: TestHistory = JSON.parse(history);
            historyArray.push({
                datetime: String(new Date()),
                name: name,
                result: result
            });
            localStorage.setItem('history', JSON.stringify(historyArray));
        }
    }

    const runTest = (route: string, name: string) => {
        axios.post(`http://localhost:8001/api/v1/tests${route}`)
            .then(res => {
                const response: { result: string } = res.data;
                notification.open({
                    message: 'Success',
                    description: 'Result ' + response.result,
                });
                onSaveIntoStorage(response.result, name);
            })
            .catch((err) => {
                notification.open({
                    message: 'Error',
                    description: `Operation Failed ${err}  `,
                });
            })
            .finally(() => {
                console.log('finally');
            });
    }

    useEffect(() => {
        getTestList();
    }, []);

    return (
        <>
            <Table dataSource={dataSource} columns={columns}/>

            <Modal title="Modal" visible={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
                {
                    testDetails.length > 0 && (
                        <Table dataSource={testDetails} columns={testDetailsColumns}/>
                    )
                }
            </Modal>
        </>
    )
}