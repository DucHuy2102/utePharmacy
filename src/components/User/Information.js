import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import { useEffect, useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { GrEdit } from 'react-icons/gr';
import axios from 'axios';
import swal from 'sweetalert';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Information(props) {
    const [images, setImages] = useState([]);
    const [userInfor, setUserInfor] = useState([]);
    const onChange = async (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
        const formData = new FormData();
        formData.append('file', imageList[0].file);
        formData.append('api_key', 174989952789425);
        formData.append('upload_preset', 'iinnk03t');
        const res = await axios.post('https://api.cloudinary.com/v1_1/dd8b69mls/image/upload', formData);
        const sendUpImage = (url) => {
            const data = {
                user_id: sessionStorage.getItem('user_id'),
                url_avt: url,
            };
            axios.post(`${process.env.REACT_APP_BACKEND_ROOT}/api/user/updateImg.php`, data).then((response) => {
                console.log(response);
            });
        };
        await sendUpImage(res.data.url);
    };
    useEffect(() => {
        const fetchUser = async () => {
            const id = sessionStorage.getItem('user_id');
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_ROOT}/api/user/getUser.php?user_id=` + id);
            setUserInfor(res.data.data[0]);
        };
        fetchUser();
    }, []);
    const update = (e) => {
        let newdate = e.target.value;
        console.log('value', e.target.value);
        if (e.target.name === 'date') {
            let date = e.target.value;

            let datearray = date.split('-');
            newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
        }
        setUserInfor({
            ...userInfor,
            [e.target.name]: newdate,
        });
    };
    const onSave = () => {
        let re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(userInfor.email)) {
            NotificationManager.error('Email not true !!!', 'Error Email!', 3000);
            return;
        }
        swal('Completely!', 'Change information success', 'success');
        const data = {
            ...userInfor,
            user_id: sessionStorage.getItem('user_id'),
        };
        console.log('data->>>>>', data);
        axios.post(`${process.env.REACT_APP_BACKEND_ROOT}/api/user/update.php`, data).then((response) => {
            console.log(response);
        });
    };
    return (
        <div>
            <Title>Thông tin người dùng</Title>
            <Line />
            <Container>
                <Row>
                    <ColStyled lg={4}>
                        <ImageUploading value={images} onChange={onChange} dataURLKey='data_url'>
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                <ContainerEdit className='upload__image-wrapper'>
                                    {imageList.length === 0 && (
                                        <ContainerImg>
                                            <ImgProduct src={userInfor['url_avt']} alt='UserImage' />
                                        </ContainerImg>
                                    )}
                                    {imageList.map((image, index) => (
                                        <ContainerImg key={index}>
                                            <ImgProduct src={image.data_url} alt='UserImage' />
                                        </ContainerImg>
                                    ))}
                                    <ButtonEdit
                                        style={isDragging ? { color: 'red' } : null}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        <IconEdit size={'3vw'} />
                                    </ButtonEdit>
                                </ContainerEdit>
                            )}
                        </ImageUploading>
                    </ColStyled>
                    <Col>
                        <Row>
                            <Col sm={3}>
                                <NameInput>Tên người dùng </NameInput>{' '}
                            </Col>
                            <Col sm={9}>
                                <NameInput>{userInfor.username}</NameInput>
                            </Col>
                        </Row>
                        <ContainerInput>
                            <Row>
                                <Col lg={2.5}>
                                    <NameInput>Họ và chữ lót</NameInput>
                                </Col>
                                <Col lg={9.5}>
                                    <Input type='text' name='fName' placeholder={userInfor.fName} onChange={update} />
                                </Col>
                            </Row>
                        </ContainerInput>
                        <ContainerInput>
                            <Row>
                                <Col lg={2.5}>
                                    <NameInput>Tên:</NameInput>
                                </Col>
                                <Col lg={9.5}>
                                    <Input type='text' name='lName' placeholder={userInfor.lName} onChange={update} />
                                </Col>
                            </Row>
                        </ContainerInput>
                        <ContainerInput>
                            <Row>
                                <Col lg={2.5}>
                                    <NameInput type='email'>Email</NameInput>
                                </Col>
                                <Col lg={9.5}>
                                    <Input type='email' name='email' placeholder={userInfor.email} onChange={update} />
                                </Col>
                            </Row>
                        </ContainerInput>
                        <ContainerInput>
                            <Row>
                                <Col lg={2.5}>
                                    <NameInput>Số điện thoại</NameInput>
                                </Col>
                                <Col lg={9.5}>
                                    <Input type='number' name='phone' placeholder={userInfor.phone} onChange={update} />
                                </Col>
                            </Row>
                        </ContainerInput>
                        <Row>
                            <Col lg={2.5}>
                                <NameInput>Ngày sinh</NameInput>
                            </Col>
                            <Col lg={9.5}>
                                <Input
                                    type='date'
                                    id='start'
                                    name='birthday'
                                    value={userInfor.birthday}
                                    min='1990-01-01'
                                    max='2022-12-31'
                                    onChange={update}
                                />
                            </Col>
                        </Row>
                        <NotificationContainer />
                        <ButtonSave onClick={() => onSave()}>Lưu thông tin</ButtonSave>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const Line = styled.hr`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 1px;
    background-color: #cacdd8;
    border-radius: 10%;
`;
const ImgProduct = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fit;
    border-radius: 50%;
`;
const ContainerImg = styled.div`
    border: solid 1px;
    height: 15vw;
    width: 15vw;
    border-radius: 50%;
    border: none;
`;

const ContainerInput = styled.div`
    /* background-color: #F5F7FF; */
    margin-bottom: 5px;
    border-top-right-radius: 15px;
    padding-top: 5px;
`;
const NameInput = styled.span`
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 90%;
    height: 30px;
    line-height: 30px;

    /* background-color: red; */
`;
const Input = styled.input`
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: solid #cccccc 1px;
    padding-left: 2%;
`;
const ColStyled = styled(Col)`
    /* background-color: red; */
`;
const ButtonSave = styled.button`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    border: none;
    float: right;
    margin-top: 20px;
    background-color: #0156ff;
    font-weight: 600;
    color: white;
    transition: all 0.3s;
    :hover {
        background-color: #00369f;
    }
    cursor: pointer;
`;
const Title = styled.div`
    font-weight: 600;
    font-size: 104%;
`;
const IconEdit = styled(GrEdit)`
    background-color: #cccccc;
    border-radius: 50%;
    padding: 6px 6px;
    transition: all 0.5s;
    :hover {
        background-color: #a98f8f;
    }
    border: none;
`;
const ButtonEdit = styled.div`
    position: absolute;
    z-index: 2;
    cursor: pointer;
    border-radius: 50%;
    border: solid 2.5px white;
    left: 2vw;
`;
const ContainerEdit = styled.div`
    display: flex;
    align-items: flex-end;
`;
