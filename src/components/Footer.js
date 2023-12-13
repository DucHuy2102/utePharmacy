import React from 'react';
import styled from 'styled-components';
import { Facebook, Instagram, GitHub, YouTube } from '@mui/icons-material';
import { Home, Email, LocalPhone, AccessTime } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';

const Footer = () => {
    return (
        <div>
            <Row>
                <Logo
                    src={require('./images/logo_UTE.png')}
                    alt='Logo HCMUTE'
                    style={{ width: '200px', height: '200px' }}
                />
                <Infor>
                    <InforTitle>Thành viên nhóm</InforTitle>
                    <InforIcon>
                        <PersonIcon />
                        <InforItem>Nguyễn Đức Huy - 20110332</InforItem>
                    </InforIcon>
                    <InforIcon>
                        <PersonIcon />
                        <InforItem>Lưu Đặc Vũ - 20110044</InforItem>
                    </InforIcon>
                    <InforIcon>
                        <PersonIcon />
                        <InforItem>Huỳnh Lê Huy - 20110493</InforItem>
                    </InforIcon>
                </Infor>
                <Infor>
                    <InforTitle>Thông tin liên hệ</InforTitle>
                    <InforIcon>
                        <Home />
                        <InforItem>Thành phố Hồ Chí Minh</InforItem>
                    </InforIcon>
                    <InforIcon>
                        <LocalPhone />
                        <InforItem>(+84)979 657 587</InforItem>
                    </InforIcon>
                    <InforIcon>
                        <AccessTime />
                        <InforItem>Thứ 2 - Thứ 7: 7:00 AM - 7:00 PM</InforItem>
                    </InforIcon>
                    <InforIcon>
                        <Email />
                        <InforItem>utephamarcy@gmail.com</InforItem>
                    </InforIcon>
                </Infor>
                <div>
                    <Infor>
                        <InforTitle>Mạng xã hội</InforTitle>
                        <InforIcon style={{ marginLeft: '22px' }}>
                            <Facebook />
                            <InforItem>Facebook.com/utePharmacy</InforItem>
                        </InforIcon>
                        <InforIcon style={{ marginLeft: '22px' }}>
                            <Instagram />
                            <InforItem>Instagram.com/utePharmacy</InforItem>
                        </InforIcon>
                    </Infor>
                    <Infor style={{ marginTop: '7px' }}>
                        <InforTitle>Hỗ trợ thanh toán</InforTitle>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', fontSize: '22px' }}>
                            <i className='fa fa-cc-paypal'></i>
                            <i className='fa fa-cc-visa'></i>
                            <i className='fa fa-cc-mastercard'></i>
                            <i className='fa fa-credit-card-alt'></i>
                            <i className='fa fa-cc-jcb'></i>
                        </div>
                    </Infor>
                </div>
            </Row>
            <SubRow style={{ height: '40px' }}>
                <Copyright style={{ fontWeight: 'bold' }}>Nhóm 6 © 2023 UTE Pharmacy</Copyright>
            </SubRow>
        </div>
    );
};
const Row = styled.div`
    background-color: #2167dd;
    width: 100%;
    min-height: 290px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding-top: 50px;
    @media (max-width: 480px) {
        flex-direction: column;
    }
`;
const Logo = styled.img`
    height: 20vw;
    @media (max-width: 480px) {
        height: 80vw;
        margin: auto;
    }
`;
const Infor = styled.div`
    width: 300px;
    color: white;
    @media (max-width: 480px) {
        width: 80vw;
        margin: auto;
        margin-top: 20px;
        justify-content: center;
    }
`;
const InforTitle = styled.div`
    color: white;
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    margin-bottom: 20px;
    @media (max-width: 480px) {
        text-align: center;
        margin-bottom: 10px;
    }
`;
const InforItem = styled.p`
    color: white;
    font-weight: 400;
    font-size: 14px;
    line-height: 30px;
    margin: 5px 0 5px 10px;
    @media (max-width: 480px) {
        text-align: center;
    }
`;
const InforIcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const SubRow = styled.div`
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: none;
    border-top: white solid 1px;
    i {
        font-size: 40px;
        margin: auto 4px;
    }
`;
const Copyright = styled.div`
    margin: auto 0px;
    @media (max-width: 768px) {
        display: none;
    }
`;
export default Footer;
