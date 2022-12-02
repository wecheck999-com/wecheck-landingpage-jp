import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/Layouts/MainLayout';
import {
  ContainerWrapper,
  PageWrapper,
} from '../../components/StyledComponents/CommonStyled';
import { ViewWrapper } from 'components/Home/HomePageStyled';
import {
  FormCommentWrapper,
  TitleChart,
  TitlePhoneNumber,
  ViewChart,
  ViewCommentWrapper,
} from 'components/StyledComponents/PhoneNumberDetailStyled';
import { UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  IDetailPhoneNumber,
  IPayloadComment,
  IPhoneReport,
  ISearchPhoneCommentPayload,
} from 'models/phone-report';
import {
  createCommentPhone,
  getChartPhoneNumber,
  getDetailPhoneNumber,
  getListCommentPhone,
  selectPhoneReport,
} from 'features/phone-report-slice';
import { Column } from '@ant-design/plots';
import {
  Col,
  Input,
  Row,
  Select,
  Tooltip,
  Table,
  Button,
  List,
  Form,
  Comment,
  message,
  Breadcrumb,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import Link from 'next/link'
import Head from 'next/head';
import jsonDataPhone from "../../data/jsonDataPhone.json";
const { TextArea } = Input;
import settings from "../../data/settings.json";
import { wrapper } from 'app/store';
interface IDataChart {
  type: string;
  ratio: number;
}
interface IPagination {
  page: number;
  limit: number;
}
const initDataChart: IDataChart[] = [
  {
    type: '浮気',
    ratio: 0,
  },
  {
    type: 'わざわざ',
    ratio: 0,
  },
  {
    type: 'エージェンシー',
    ratio: 0,
  },
  {
    type: '会費',
    ratio: 0,
  },
  {
    type: '他の',
    ratio: 0,
  },
];

const PhoneNumberDetail = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const {
    loading,
    phoneDetailList,
    phoneCommentList,
    loadingCreateCommentPhone,
  } = useAppSelector(selectPhoneReport);
  const dispatch = useAppDispatch();
  const [data, setData] = useState(initDataChart);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 50,
  });
  const [form] = Form.useForm();
  const config = {
    data,
    xField: 'type',
    yField: 'ratio',
    barWidthRatio: 0.5,
    fill: 'red',
    meta: {
      type: {
        alias: '',
      },
      ratio: {
        alias: 'レベル',
      },
    },
  };

  const columns: ColumnsType<IPhoneReport> = [
    {
      title: '加入者番号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text) => <a>{text}</a>,
      width: 200,
    },
    {
      title: '検索数',
      dataIndex: 'countSearch',
      key: 'countSearch',
      width: 200,
      align: 'center',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'バッキング',
      dataIndex: 'backerBy',
      key: 'backerBy',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '説明',
      dataIndex: 'phoneDesription',
      key: 'phoneDesription',
      render: (text) => <a>{text}</a>,
    },
  ];

  const onFinish = (values: IPayloadComment) => {
    let payloadComment = { ...values };
    if (router.query?.id) {
      payloadComment.phoneSearchId = router.query?.id;
      dispatch(createCommentPhone(payloadComment))
        .unwrap()
        .then((res) => {
          message.success('成功したコメント!');
          let newPayloadPhone: ISearchPhoneCommentPayload = {
            phoneSearchId: router.query?.id,
            page: pagination.page,
            limit: pagination.limit,
          };
          dispatch(getListCommentPhone(newPayloadPhone));
          form.resetFields();
        })
        .catch((error) => {
          message.error('コメントできませんでした!');
          form.resetFields();
        });
    }
  };
  // GET CHART
  useEffect(() => {
    if (!router.query.phoneNumber) {
      router.push('/404')
    };
    let payload = {
      id: router.query?.phoneNumber,
    };
    dispatch(getChartPhoneNumber(payload))
      .unwrap()
      .then()
      .then((res: any) => {
        if (res) {
          let newDataChart: IDataChart[] = [
            {
              type: '浮気',
              ratio: res?.countScam,
            },
            {
              type: 'わざわざ',
              ratio: res?.countBother,
            },
            {
              type: 'エージェンシー',
              ratio: res?.countAgency,
            },
            {
              type: '会費',
              ratio: res?.countDues,
            },
            {
              type: '他の',
              ratio: res?.countSpam,
            },
          ];
          setData(newDataChart);
        }
      });
  }, [router.query?.phoneNumber]);
  //GET DETAIL PHONE NUMBER
  useEffect(() => {
    if (!router.query.id) {
      router.push('/404')
    };
    let payload = {
      id: router.query?.id,
    };
    dispatch(getDetailPhoneNumber(payload));
  }, [router.query?.id]);

  // GET LIST PHONE COMMENTS
  useEffect(() => {
    if (!router.query.id) {
      router.push('/404')
    };
    let payloadPhone: ISearchPhoneCommentPayload = {
      phoneSearchId: router.query?.id,
      page: pagination.page,
      limit: pagination.limit,
    };
    dispatch(getListCommentPhone(payloadPhone));
  }, [router.query?.id]);
  return (
    <>
     <Head>
            <title>{"電話番号アラート "+ router.query?.phoneNumber + " :: " + settings?.titleDomain}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content={"電話番号" + router.query?.phoneNumber} />
            <meta name="news_keywords" content={"電話番号" + router.query?.phoneNumber} />
            <meta name='description' content={settings?.description} />
            <meta name='keywords' content={settings?.keywords} />
            <meta property='og:title' content={settings?.OgTitle} />
            <meta property='og:description' content={settings?.OgDescription} />
            <meta property='og:image' content={settings?.OgIamge} />
            <meta property='og:url' itemProp='url' content={settings?.OgUrl} />
            <meta property='og:type' content='website' />
            <meta name='RATING' content='GENERAL' />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonDataPhone) }}
            />
            <link rel='icon' href='/favicon.ico' />
        </Head>
 
    <PageWrapper>
      <ContainerWrapper>
      <Breadcrumb style={{marginTop:"20px"}}>
        <Breadcrumb.Item><Link href="/">ホームページ</Link></Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/">電話番号</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">{router.query?.phoneNumber}</a>
        </Breadcrumb.Item>
      </Breadcrumb>
        <ViewWrapper>
        
        <TitleChart>警告 浮気</TitleChart> <TitlePhoneNumber>{router.query?.phoneNumber}</TitlePhoneNumber>
          <Table
            rowKey="Id"
            loading={loading}
            columns={columns}
            dataSource={phoneDetailList ? [phoneDetailList] : []}
            pagination={false}
          />
          {/* start chart */}
          <ViewChart>
            <TitleChart>統計チャート</TitleChart>
            <Column {...config} height={200} />
          </ViewChart>
          {/* end chart */}
        </ViewWrapper>
        <ViewCommentWrapper>
          {phoneCommentList && (
            <List
              className='comment-list'
              header={`${phoneCommentList.length}コメント`}
              itemLayout='horizontal'
              dataSource={phoneCommentList}
              renderItem={(item) => (
                <li>
                  <Comment
                    author={item?.nameUser}
                    avatar={item?.avatar}
                    content={<p style={{backgroundColor:'#fff', padding:'10px'}}>{item?.bodyComment}</p>}
                    datetime={
                      <Tooltip title={item?.createdAt}>
                        <span>
                          {moment(item?.createdAt).format(
                            'DD/MM/YYYY HH:mm:ss'
                          )}
                        </span>
                      </Tooltip>
                    }
                  />
                </li>
              )}
            />
          )}
          <Comment
            content={
              <FormCommentWrapper>
                <Form layout={`vertical`} onFinish={onFinish} form={form}>
                  <Form.Item
                    name={'nameUser'}
                    rules={[{ required: true, message: 'お名前を入力してください' }]}
                  >
                    <Input placeholder='名前' prefix={<UserOutlined />}/>
                  </Form.Item>
                  <Form.Item
                    name={'bodyComment'}
                    rules={[
                      {
                        required: true,
                        message: '内容をコメントしてください',
                      },
                    ]}
                  >
                    <TextArea rows={4} placeholder="コメント内容" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType='submit'
                      loading={loadingCreateCommentPhone}
                      type='primary'
                      style={{float:'right'}}
                    >
                     コメント
                    </Button>
                  </Form.Item>
                </Form>
              </FormCommentWrapper>
            }
          />
        </ViewCommentWrapper>
      </ContainerWrapper>
    </PageWrapper>
    </>
  );
};
PhoneNumberDetail.Layout = MainLayout;
PhoneNumberDetail.getInitialProps = wrapper.getInitialPageProps(
  ({ dispatch }) =>
  async (context) => {
  let payload ={
    id: context.query?.id
  }
      await dispatch(getDetailPhoneNumber(payload))
  }
);
export default PhoneNumberDetail;
