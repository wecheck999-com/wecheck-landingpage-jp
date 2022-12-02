import { MainLayout } from '../../components/Layouts/MainLayout';
import {
  ContainerWrapper,
  PageWrapper,
} from '../../components/StyledComponents/CommonStyled';
import { NextPageWithLayout } from '../../models/common';
import { Col, Input, Row, Select, Tooltip, Table, Button, Image } from 'antd';
import {
  ActionSearchWrapper,
  SearchForm,
  SearchFormItemWrapper,
  SearchWrapper,
} from 'components/StyledComponents/SearchStyled';
import {
  CaretDownOutlined,
  SearchOutlined,
  SettingOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { ViewWrapper } from 'components/Home/HomePageStyled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getPhoneReportList,
  getSearchReportList,
  updatePhoneSearch,
} from 'features/phone-report-slice';
import { IPhoneReport, ISearchPhonePayload } from 'models/phone-report';
import { getAppReportList, selectAppReport } from 'features/app-report-slice';
import { IAppReport } from 'models/app-report';

interface DataType {
  key: string;
  phoneNumber: string;
  roamingPrice: number;
  type: string;
  phoneType: string;
  status: string;
  tags: string[];
}
interface IPagination {
  page: number;
  limit: number;
}

const AppReport: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, appReportList } = useAppSelector(selectAppReport);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 50,
  });
  const [search, setSearch] = useState<string>('');
  const columns: ColumnsType<IAppReport> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 80,
      align: 'center',
      render: (text, object, index) =>
        (pagination.page - 1) * pagination.limit + index + 1,
    },
    {
      title: 'App',
      dataIndex: 'appName',
      key: 'appName',
      render: (text, record) => (
        <div>
          <Image
            width={50}
            src={record?.appImage}
          />
          <a style={{marginLeft: '20px'}}>{text}</a>
        </div>
      ),
    },
    {
      title: '説明',
      dataIndex: 'appDescription',
      key: 'appDescription',
      render: (text) => <a>{text}</a>,
    },
    // {
    //     title: <SettingOutlined />,
    //     dataIndex: 'action',
    //     key: 'action',
    //     width:200,
    //     render: (_, record,) => <a  onClick={()=>router.push({
    //         pathname:`/phone-number-details/${record.id}`,
    //         query: { phoneNumber: record.appName }
    //     })}>詳細を見る</a>,
    // },
  ];

  const onChangePagination = (page: number, pageSize: number) => {
    setPagination({ page: page, limit: pageSize });
  };

  useEffect(() => {
    var payload: ISearchPhonePayload = {
      page: pagination.page,
      limit: pagination.limit,
    };
    dispatch(getAppReportList(payload));
  }, []);

  const handleSearch = () => {
    var payload: ISearchPhonePayload = {
      phoneNumber: search ? search : '0',
      page: pagination.page,
      limit: pagination.limit,
    };
    dispatch(getSearchReportList(payload));
    if (search) {
      dispatch(updatePhoneSearch({ phoneNumber: search }));
    }
  };
  const handleClear = () => {
    setPagination({ page: 1, limit: 50 });
    let payload: ISearchPhonePayload = {
      page: 1,
      limit: 50,
    };
    dispatch(getPhoneReportList(payload));
  };
  return (
    <PageWrapper>
      <ContainerWrapper>
        <SearchWrapper>
          <Tooltip
            placement='bottom'
            title={
              '検索ボックスに検索したい名前のアプリを入力します。 ボタンをクリックしてアプリに進みます'
            }
          >
            <div className='guide-search'>
              コードの検索方法 <CaretDownOutlined />
            </div>
          </Tooltip>
          <SearchForm>
            <Row gutter={[16, 16]}>
              <Col md={12}>
                <SearchFormItemWrapper>
                  <span className='label'>アプリを探す: </span>
                  {/* <Select
                                        placeholder="Đầu số"
                                        style={{ width: 120, marginRight: 10 }}
                                        options={[
                                            {
                                                value: 'all',
                                                label: '全て',
                                            },]}
                                    >

                                    </Select> */}
                  <Input
                    size='large'
                    placeholder='探すアプリ'
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </SearchFormItemWrapper>
              </Col>
              {/* <Col md={12}>
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
                            </Col> */}
            </Row>
            <ActionSearchWrapper>
              <Button
                type='primary'
                loading={loading}
                icon={<SearchOutlined />}
                onClick={() => handleSearch()}
              >
                探す
              </Button>
              <Button icon={<ReloadOutlined />} onClick={() => handleClear()}>
                リフレッシュ
              </Button>
            </ActionSearchWrapper>
          </SearchForm>
        </SearchWrapper>
        <ActionSearchWrapper>
          <span>の検索結果</span>
        </ActionSearchWrapper>
        <ViewWrapper>
          <Table
            loading={loading}
            columns={columns}
            dataSource={appReportList ? appReportList : []}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              onChange: onChangePagination,
            }}
          />
        </ViewWrapper>
      </ContainerWrapper>
    </PageWrapper>
  );
};

AppReport.Layout = MainLayout;

export default AppReport;
