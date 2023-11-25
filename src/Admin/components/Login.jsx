import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { GiPadlock } from 'react-icons/gi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
const Wraper = styled.div`
    /* display: flex;
  justify-content: center;
  align-items: center;
  padding: -20px -40px;
  height: 100vh;
  width: 100vw; */
    background-color: #ccc;
    height: 100vh;
    overflow: hidden;
`;
const InputLeft = styled.div`
    padding: 0 40px;
    min-width: 500px;
`;
const Img = styled.div`
    background-color: #000;
    border-radius: 10px;
`;
const Heading = styled.h3`
    font-size: 28px;
    margin-bottom: 14px;
`;
const Container = styled.div`
    margin: 20px 0;
`;
const Label = styled.label`
    color: #aaa;
`;
const Icon = styled.div`
    position: absolute;
    top: 2px;
`;
const InputWrap = styled.div`
    /* display: flex; */
    position: relative;
`;
const Input = styled.input`
    border: none;
    outline: none;
    border-bottom: 1px solid #000;
    padding: 2px 20px;
    width: 100%;
`;
const ImgSrc = styled.img`
    width: 100%;
    object-fit: cover;
    /* border-radius: 10px; */
`;
const Remember = styled.div``;
const ContainerBottom = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LabelRemember = styled.span`
    display: inline-block;
`;
const A = styled.a`
    text-decoration: none;
`;
const InputRemember = styled.input`
    margin-right: 4px;
`;
const ContainerButton = styled.div`
    margin-top: 14px;
    display: flex;
    justify-content: center;
`;
const Button = styled.button`
    color: white;
    background-color: #000;
    border-radius: 14px;
    padding: 10px 100px;
    border: 1px solid #ccc;
    font-size: 20px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        color: #000;
        background-color: white;
    }
`;
const Title = styled.h3`
    color: white;
    font-size: 8px;
    padding: 10px 4px;
    text-align: center;
`;
const ContainerWraper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 40px;
    margin: 14px;
    height: 400px;
    width: 932px;
    margin: 130px auto;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 6px #b2b2b2;
`;
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (sessionStorage.getItem('admin')) {
            navigate('/admin');
        }
    }, [navigate]);
    const handleLogin = async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_ROOT}/api/auth/loginAdmin.php`, {
            username: username,
            password: password,
        });
        if (res.data.status === 'OK') {
            swal('Login success', 'Administrative welcome', 'success');
            sessionStorage.setItem('admin', res.data.admin_id);
            navigate('/admin');
        } else {
            swal('Your username or email incorrect', '', 'warning');
            setPassword('');
            setUsername('');
        }
    };
    return (
        <Wraper>
            <ContainerWraper>
                <InputLeft>
                    <Heading>Admin Login</Heading>
                    <Container>
                        <Label>User name</Label>
                        <InputWrap>
                            <Icon>
                                <AiOutlineUser />
                            </Icon>
                            <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                        </InputWrap>
                    </Container>
                    <Container>
                        <Label>Password</Label>
                        <InputWrap>
                            <Icon>
                                <GiPadlock />
                            </Icon>
                            <Input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Input>
                        </InputWrap>
                    </Container>
                    <ContainerBottom>
                        <Remember>
                            <InputRemember type='checkbox'></InputRemember>
                            <LabelRemember>Remember me</LabelRemember>
                        </Remember>
                        <Remember>
                            <A href=''>Forgot password?</A>
                        </Remember>
                    </ContainerBottom>
                    <ContainerButton>
                        <Button onClick={() => handleLogin()}>Login</Button>
                    </ContainerButton>
                </InputLeft>
                <Img>
                    <ImgSrc src='https://toscaleblog.co.uk/wp-content/uploads/elementor/thumbs/Saly-10-p5irc3tooikkemk635karj2rc4plfa69aa5g3d59s4.png'></ImgSrc>
                    <Title>Easy product management, as long as you have a network</Title>
                </Img>
            </ContainerWraper>
        </Wraper>
    );
};

export default Login;
