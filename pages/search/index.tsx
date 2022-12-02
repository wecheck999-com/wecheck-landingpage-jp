import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Tooltip } from "antd";
import { MainLayout } from "components/Layouts/MainLayout"
import { ContainerWrapper, PageWrapper } from "components/StyledComponents/CommonStyled";
import { ActionSearchWrapper, SearchForm, SearchFormItemWrapper, SearchWrapper } from "components/StyledComponents/SearchStyled";
import { NextPageWithLayout } from "models/common"
import {  Table, } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    phoneNumber: string;
    roamingPrice: number;
    type: string;
    phoneType: string;
    status: string;
    tags: string[];
}

const SearchPage: NextPageWithLayout = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: text => <a>{text}</a>,
        },
        {
            title: '加入者番号',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: text => <a>{text}</a>,
        },
        {
            title: 'ローミング料金・料金',
            dataIndex: 'roamingPrice',
            key: 'roamingPrice',
            render: text => <a>{text}</a>,
        },
        {
            title: '加入者の種類',
            dataIndex: 'type',
            key: 'type',
            render: text => <a>{text}</a>,
        },
        {
            title: '数字の種類',
            dataIndex: 'phoneType',
            key: 'phoneType',
            render: text => <a>{text}</a>,
        },
        {
            title: '状態',
            dataIndex: 'status',
            key: 'status',
            render: text => <a>{text}</a>,
        },
    ]
    return <PageWrapper>
        <ContainerWrapper>
            <SearchWrapper>
                <Tooltip placement="bottom" title={'123123123123'}>
                    <div className="guide-search">
                        コードの検索方法 <CaretDownOutlined />
                    </div>
                </Tooltip>
                <SearchForm>
                    <Row gutter={[16, 16]}>
                        <Col md={12}>
                            <SearchFormItemWrapper>
                                <span className="label">所見番号: </span>
                                <Select
                                    placeholder="Đầu số"
                                    style={{ width: 120, marginRight: 10 }}
                                    options={[
                                        {
                                            value: 'all',
                                            label: '全て',
                                        },]}
                                >

                                </Select>
                                <Input placeholder="探す番号" />
                            </SearchFormItemWrapper>
                        </Col>
                        <Col md={12}>
                            <SearchFormItemWrapper>
                                <span className="label">数字の種類: </span>
                                <Select
                                    placeholder="Đầu số"
                                    style={{ width: '100%', marginRight: 10 }}
                                    options={[
                                        {
                                            value: 'all',
                                            label: '全て',
                                        },]}
                                >

                                </Select>

                            </SearchFormItemWrapper>
                        </Col>

                    </Row>
                    <ActionSearchWrapper>
                        <Button type="primary" icon={<SearchOutlined />}>
                            探す
                        </Button>
                    </ActionSearchWrapper>
                </SearchForm>
            </SearchWrapper>
            <ActionSearchWrapper>
                <span>の検索結果</span>
            </ActionSearchWrapper>
            <div>
            <Table  columns={columns} dataSource={[]} />
            </div>



        </ContainerWrapper>

    </PageWrapper>
}

SearchPage.Layout = MainLayout;
export default SearchPage
