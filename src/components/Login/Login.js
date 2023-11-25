import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import Footer from '../Footer';
import Header from '../Header';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate();
    const [targetTab, settargetTab] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [cfPassword, setCfPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(-1);
    const [msg, setMsg] = useState('');
    const login = () => {
        if (username === '' || password === '') {
            setMsg('Tên đăng nhập hoặc mật khẩu không đúng!');
            setIsSuccess(0);
            return;
        }
        const data = {
            username: username,
            password: password,
        };
        axios
            .post(`${process.env.REACT_APP_BACKEND_ROOT}/api/auth/login.php`, data)
            .then(function (response) {
                console.log(response.data);
                if (response.data.status === 'Success') {
                    sessionStorage.setItem('user_id', response.data.user_id);
                    navigate('/');
                } else if (response.data.status === 'Blocked') {
                    setMsg('Tài khoản của bạn đã bị khóa!');
                    setIsSuccess(0);
                } else {
                    setMsg('Tên đăng nhập hoặc mật khẩu không đúng!');
                    setIsSuccess(0);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const signup = async () => {
        if (password !== cfPassword) {
            setMsg('Password incorrect!');
            setIsSuccess(0);
            return;
        }
        if (username === '' || password === '' || fName === '' || lName === '') {
            setMsg('Missing data required!');
            setIsSuccess(0);
            return;
        }
        const data = {
            username: username,
            password: password,
            fName: fName,
            lName: lName,
            url_avt: 'https://www.seekpng.com/png/full/514-5147412_default-avatar-icon.png',
        };
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_ROOT}/api/auth/register.php`, data);
        console.log(res.data);
        if (res.data.status === 'Success') {
            setMsg('Create account success!');
            setIsSuccess(1);
        } else {
            setMsg('Username already exist!');
            setIsSuccess(0);
        }
    };
    const changeTab = (tab) => {
        setIsSuccess(-1);
        settargetTab(tab);
    };
    const enterLogin = (e) => {
        if (e.code === 'Enter') {
            if (targetTab === 'login') {
                login();
            } else {
                signup();
            }
        }
    };

    return (
        <>
            {props.user && <Navigate to='/' replace={true} />}
            <Header />
            <Container>
                <Head>
                    <h2 style={{ marginTop: '10px', width: '50%' }}>
                        {targetTab === 'login' ? 'Trang đăng nhập' : 'Trang đăng ký'}
                    </h2>
                    <Button
                        className='phone'
                        variant='primary'
                        style={{ borderRadius: '20px' }}
                        onClick={targetTab === 'login' ? () => changeTab(1) : () => changeTab('login')}
                    >
                        {targetTab === 'login' ? 'Sign up' : 'Sign in'}
                    </Button>
                </Head>
                <Content>
                    {targetTab === 'login' ? (
                        <>
                            <Box>
                                <Form>
                                    <Title style={{ display: 'flex', justifyContent: 'center' }}>Đăng nhập</Title>
                                    <Form.Label>Nếu bạn đã có tài khoản, mời đăng nhập.</Form.Label>
                                    {isSuccess === 0 && (
                                        <Alert variant='danger' onClose={() => setIsSuccess(-1)} dismissible>
                                            <Alert.Heading>Đăng nhập thất bại!</Alert.Heading>
                                            <p>{msg}</p>
                                        </Alert>
                                    )}
                                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                        <Label>
                                            Tên người dùng <span style={{ color: 'red' }}>*</span>
                                        </Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Tên đăng nhập'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            onKeyUp={(e) => enterLogin(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                        <Label>
                                            Mật khẩu <span style={{ color: 'red' }}>*</span>
                                        </Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Mật khẩu của bạn'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyUp={(e) => enterLogin(e)}
                                        />
                                    </Form.Group>
                                </Form>
                                <TextLink>Quên mật khẩu?</TextLink>
                                <Button
                                    variant='primary'
                                    style={{
                                        width: '200px',
                                        borderRadius: '20px',
                                        margin: '0px auto',
                                    }}
                                    onClick={login}
                                >
                                    Đăng nhập
                                </Button>
                            </Box>
                            <Box className='intro' style={{ backgroundColor: '#fff3e1' }}>
                                <Title style={{ textAlign: 'center' }}>Đăng ký</Title>
                                <Form.Label>Đăng ký tài khoản để nhận những ưu đãi sau:</Form.Label>
                                <ul>
                                    <li>Nhận những ưu đãi đặc biệt khi mua hàng</li>
                                    <li>Tư vấn trực tiếp</li>
                                    <li>Được ưu tiên các mã giảm giá</li>
                                    <li>Hướng dẫn sử dụng khi giao hàng</li>
                                </ul>
                                <Button
                                    variant='primary'
                                    style={{
                                        width: '200px',
                                        borderRadius: '20px',
                                    }}
                                    onClick={() => changeTab(1)}
                                >
                                    Đăng ký tài khoản
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box>
                                <Form>
                                    <Title style={{ display: 'flex', justifyContent: 'center' }}>Đăng ký</Title>
                                    <Form.Label>Mời bạn điền đầy đủ thông tin để đăng ký tài khoản.</Form.Label>
                                    {isSuccess === 0 && (
                                        <Alert variant='danger' onClose={() => setIsSuccess(-1)} dismissible>
                                            <Alert.Heading>Đăng ký tài khoản thất bại!</Alert.Heading>
                                            <p>{msg}</p>
                                        </Alert>
                                    )}
                                    {isSuccess === 1 && (
                                        <Alert variant='success' onClose={() => setIsSuccess(-1)} dismissible>
                                            <Alert.Heading>Đăng ký thành công!</Alert.Heading>
                                            <p>{msg}</p>
                                        </Alert>
                                    )}
                                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                        <Label>
                                            Tên người dùng<span style={{ color: 'red' }}>*</span>
                                        </Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Tên đăng nhập của bạn'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            onKeyUp={(e) => enterLogin(e)}
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Form.Group
                                            style={{ marginRight: '5px' }}
                                            className='mb-3'
                                            controlId='exampleForm.ControlInput1'
                                        >
                                            <Label>
                                                Họ và chữ lót <span style={{ color: 'red' }}>*</span>
                                            </Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Họ và chữ lót'
                                                value={fName}
                                                onChange={(e) => setFName(e.target.value)}
                                                onKeyUp={(e) => enterLogin(e)}
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                            <Label>
                                                Tên <span style={{ color: 'red' }}>*</span>
                                            </Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Tên'
                                                value={lName}
                                                onChange={(e) => setLName(e.target.value)}
                                                onKeyUp={(e) => enterLogin(e)}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                        <Label>
                                            Mật khẩu <span style={{ color: 'red' }}>*</span>
                                        </Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Mật khẩu'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyUp={(e) => enterLogin(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                        <Label>
                                            Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>
                                        </Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Xác nhận mật khẩu'
                                            value={cfPassword}
                                            onChange={(e) => setCfPassword(e.target.value)}
                                            onKeyUp={(e) => enterLogin(e)}
                                        />
                                    </Form.Group>
                                </Form>
                                <Button
                                    variant='primary'
                                    style={{
                                        width: '200px',
                                        borderRadius: '20px',
                                        margin: '0px auto',
                                    }}
                                    onClick={signup}
                                >
                                    Đăng ký tài khoản
                                </Button>
                            </Box>
                            <Box className='intro' style={{ backgroundColor: '#fff3e1' }}>
                                <Title style={{ textAlign: 'center' }}>Đăng nhập</Title>
                                <Form.Label>Đăng nhập tài khoản để nhận những ưu đãi sau:</Form.Label>
                                <ul>
                                    <li>Nhận những ưu đãi đặc biệt khi mua hàng</li>
                                    <li>Tư vấn trực tiếp</li>
                                    <li>Được ưu tiên các mã giảm giá</li>
                                    <li>Hướng dẫn sử dụng khi giao hàng</li>
                                </ul>
                                <Button
                                    variant='primary'
                                    style={{ width: '200px', borderRadius: '20px' }}
                                    onClick={() => changeTab('login')}
                                >
                                    Đăng nhập
                                </Button>
                            </Box>
                        </>
                    )}
                </Content>
            </Container>
            <Footer />
        </>
    );
};

const TextLink = styled.span`
    color: #477bff;
    cursor: pointer;
    text-align: right;
    margin-bottom: 10px;
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
`;
const Label = styled(Form.Label)`
    font-weight: bold;
`;
const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    & .intro {
        @media (max-width: 768px) {
            display: none;
        }
    }
`;
const Box = styled.div`
    background-color: #f5f7ff;
    display: flex;
    flex-direction: column;
    width: 45%;
    margin: 10px;
    padding: 30px 50px;
    @media (max-width: 768px) {
        width: 100%;
        padding: 10px 20px;
        margin: 0px;
    }
`;
const Head = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    & .phone {
        display: none;
        @media (max-width: 768px) {
            display: block;
        }
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    @media (max-width: 1024px) {
        width: 100%;
        padding: 10px;
    }
    @media (max-width: 768px) {
        padding: 10px;
    }
`;

export default Login;
