import { Col, Divider, Row } from "antd";
import { ContainerWrapper } from "components/StyledComponents/CommonStyled";
import React from "react";
import { BoxLinkWrapper, Coppyright, FooterWrapper } from './FooterStyled';
export const Footer = () => {

    return (
        <FooterWrapper>
            {/* <BoxInfoWrapper>
                <div className="box-info">
                    <div className="info-content">
                        <div className="content-left">
                            <Image src={emailIcon.src} width={100} height={100} alt='' />
                            <span>info@youremail.com</span>
                        </div>

                        <div className="content-right"><Image src={callIcon.src} width={100} height={100} alt='' /> <span>+880 321 655 9985</span></div>
                    </div>
                </div>
            </BoxInfoWrapper> */}
            <BoxLinkWrapper>
                <ContainerWrapper>
                    <Row justify="center" gutter={[8, 8]}>
                        <Col xs={24} md={8}>
                            <div className="footer-title">
                            <img style={{ width: "20%" }} src={"https://wecheck999.s3.ap-southeast-1.amazonaws.com/Tele-modified.png"} alt='wecheck999' />
                            </div>
                            <p></p>
                            <p>Kiểm tra thông tin 浮気, kiểm tra 電話番号 có phải 浮気, エージェンシー, 会費 hay không. kiểm tra các thông tin 会費 hoặc các đơn vị わざわざ</p>
                        </Col>
                        <Col xs={24} md={8}>   <div className="footer-title">
                            Điều hướng
                        </div>
                            <p>ホームページ</p>
                            <p>Ứng dụng nguy hiểm</p>
                            <p>Liên kết gây hại</p>
                            <p>Dạng 浮気 mới</p>
                        </Col>
                        <Col xs={24} md={8}>   <div className="footer-title">
                            Đóng góp
                        </div>
                            <p><a href= "mailto:telesaleapp@gmail.com?subject = Feedback&body = Message">Mọi ý kiến đóng góp xin gửi về telesaleapp@gmail.com</a></p></Col>
                    </Row>
                    <Divider style={{ color: '#fff', borderColor: '#fff' }} />
                    <Coppyright>Copyright 2022 .TL Group. All Right Reserved.</Coppyright>
                </ContainerWrapper>
            </BoxLinkWrapper>
        </FooterWrapper>
    );
};