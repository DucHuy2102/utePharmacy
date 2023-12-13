import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Carousel, Modal } from 'react-bootstrap';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.css';
import { Rating, Breadcrumbs, Link, Typography } from '@mui/material';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { addCart } from '../store/reducers/numCartSlice';

function TableRow(props) {
    return (
        <tr>
            <td style={{ color: 'black', fontWeight: '500' }}>{props.field}</td>
            <td style={{ color: '#666666' }}>{props.value}</td>
        </tr>
    );
}

function CarouselImg(props) {
    return (
        <div className='d-flex align-items-center' style={{ height: '566px', width: '735px' }}>
            <img
                src={props.src}
                alt='slide'
                style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    margin: 'auto',
                    width: 'auto',
                }}
            />
        </div>
    );
}
function Status(props) {
    if (props.amount > 0) {
        return (
            <div
                style={{
                    color: '#78a962',
                    fontSize: '18px',
                    marginRight: '30px',
                    fontWeight: '700',
                }}
            >
                <i className='fa fa-check-circle' aria-hidden='true'></i> Còn hàng
            </div>
        );
    } else {
        return (
            <div
                style={{
                    color: '#f00',
                    fontSize: '18px',
                    marginRight: '30px',
                    fontWeight: '700',
                }}
            >
                <i className='fa fa-ban' aria-hidden='true'></i> out of stock
            </div>
        );
    }
}

const Detail = () => {
    const dispatch = useDispatch();
    let { product_id } = useParams();
    let navigate = useNavigate();

    const [product, setProduct] = useState({});
    const [user, setUser] = useState({});
    const [comment, setComment] = useState([]);
    const [ratingStar, setRatingStar] = useState(4);
    const [ratingInfo, setRatingInfo] = useState({});
    const [userComment, setUserComment] = useState('');
    const [similarProduct, setSimilarProduct] = useState([]);
    const spec_field = ['name', 'product_code', 'brand', 'cpu', 'ram', 'gpu', 'os', 'screen', 'size', 'battery'];
    const displayField = {
        name: 'Tên sản phẩm',
        product_code: 'Product Code',
        brand: 'Xuất sứ',
        cpu: 'Thành phần',
        ram: 'Công dụng',
        gpu: 'Cách dùng',
        os: 'Bảo quản',
        screen: 'Tác dụng phụ',
        size: 'Assembled Product Dimensions (L x W x H)',
        battery: 'Battery',
    };

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        if (sessionStorage.getItem('user_id')) {
            setShowModal(true);
        } else {
            navigate('/login');
        }
    };
    const handleRating = async () => {
        let data = {
            product_id: product_id,
            user_id: sessionStorage.getItem('user_id'),
            comment: userComment,
            rate: ratingStar,
        };
        console.log('data feedback: ', data);
        await axios.post(`${process.env.REACT_APP_BACKEND_ROOT}/api/comment/create.php`, data).then((response) => {
            console.log(response.data);
            if (response.data.message === 0) {
                swal('Fail!', 'Comment fail !', 'error');
            } else if (response.data.message === 1) {
                swal('Completely!', 'Comment success', 'success');
            }
        });
        getComment();

        let data_updateRating = {
            product_id: product_id,
            rating: Math.floor((ratingInfo.total_rating + ratingStar) / (ratingInfo.num_reviewer + 1)),
            num_reviewer: ratingInfo.num_reviewer + 1,
        };
        updateRating(data_updateRating);
        let _rating = {
            total_rating: ratingInfo.total_rating + ratingStar,
            num_reviewer: ratingInfo.num_reviewer + 1,
        };
        setRatingInfo(_rating);

        handleClose();
    };
    const updateRating = async (data_updateRating) => {
        console.log('update rating: ', data_updateRating);
        await axios
            .post(`${process.env.REACT_APP_BACKEND_ROOT}/api/product/updateRating.php`, data_updateRating)
            .then((response) => {
                console.log(response.data);
            });
    };
    const handleClick = (url) => {
        navigate(url);
    };
    const handleAddToCart = async () => {
        if (!sessionStorage.getItem('user_id')) {
            navigate('/login');
            return;
        }
        let data = {
            product_id: product_id,
            user_id: sessionStorage.getItem('user_id'),
            amount: count,
        };
        console.log('data addToCart: ', data);
        await axios.post(`${process.env.REACT_APP_BACKEND_ROOT}/api/cart/addToCart.php`, data).then((response) => {
            console.log(response.data);
            if (response.data.message === 0) {
                swal('Không thể thêm vào giỏ hàng!', 'Thêm không thành công !', 'error');
            } else if (response.data.message === 1) {
                dispatch(addCart(product_id));
                swal('Đã thêm vào giỏ hàng!', 'Thêm hoàn tất', 'success');
            }
        });
    };
    const getComment = useCallback(async () => {
        const res_comment = await axios.get(
            `${process.env.REACT_APP_BACKEND_ROOT}/api/comment/read_single.php?product_id=` + String(product_id)
        );
        console.log('comment: ', res_comment.data);
        let total_rating = res_comment.data.reduce((a, b) => {
            return a + parseInt(b.rate);
        }, 0);
        let _rating = {
            total_rating: total_rating,
            num_reviewer: res_comment.data.length,
        };
        console.log('ratingInfo: ', _rating);
        setComment(res_comment.data);
        setRatingInfo(_rating);
    }, [product_id]);
    const getUser = async () => {
        const user = await axios.get(
            `${process.env.REACT_APP_BACKEND_ROOT}/api/user/getUser.php?user_id=` + sessionStorage.getItem('user_id')
        );
        console.log('user: ', user.data.data[0]);
        setUser(user.data.data[0]);
    };
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(
                `${process.env.REACT_APP_BACKEND_ROOT}/api/product/read_single.php?id=` + String(product_id)
            );
            const res_img = await axios.get(
                `${process.env.REACT_APP_BACKEND_ROOT}/api/imgProduct/read_single.php?id=` + String(product_id)
            );
            let _product = res.data;
            _product['listImg'] = res_img.data;
            console.log('product', _product);
            setProduct(_product);

            getComment();
            getUser();

            const res_similarProduct = await axios.get(`${process.env.REACT_APP_BACKEND_ROOT}/api/product/read.php`);
            console.log('similarProduct: ', res_similarProduct.data.data);
            setSimilarProduct(res_similarProduct.data.data);
        };
        window.scrollTo(0, 0);
        getData();
    }, [getComment, product_id]);

    const [tab, setTab] = useState(0);
    const options = {
        margin: 30,
        responsiveClass: true,
        autoplay: false,
        smartSpeed: 1000,
        responsive: {
            200: {
                items: 1,
            },
            360: {
                items: 2,
            },
            480: {
                items: 3,
            },
            768: {
                items: 5,
            },
            800: {
                items: 5,
            },
            1000: {
                items: 6,
            },
        },
    };

    const [count, setCount] = useState(1);

    const incrementCount = () => {
        if (count >= product.amount) {
            setCount(product.amount);
            console.log('not enough amount');
        } else {
            setCount(count + 1);
        }
    };
    let decrementCount = () => {
        if (count > 1) setCount(count - 1);
    };

    return (
        <div>
            <Header />

            <TabNav>
                <TabItem onClick={() => setTab(0)} bottomBar={tab === 0}>
                    Thông tin sản phẩm
                </TabItem>
                <TabItem onClick={() => setTab(1)} bottomBar={tab === 1}>
                    Thông tin khác
                </TabItem>
            </TabNav>

            <Content>
                <Tab>
                    <Breadcrumbs separator='›' maxItems={3} aria-label='breadcrumb' style={{ margin: '10px 0 0px 0' }}>
                        <Link underline='hover' color='inherit' href='/'>
                            Trang chủ
                        </Link>
                        <Link underline='hover' color='inherit' href='/'>
                            Sản phẩm
                        </Link>
                        <Typography color='text.primary'>{product.brand}</Typography>
                    </Breadcrumbs>

                    <Name>{product.name}</Name>

                    <Rate>
                        <div className='d-flex flex-row align-items-center'>
                            <Rating
                                size='small'
                                name='read-only'
                                value={parseInt(ratingInfo.total_rating / ratingInfo.num_reviewer)}
                                readOnly
                            />
                            <p style={{ fontSize: '13px', color: '#a6a6a6', margin: '0 2px' }}>
                                Đánh giá ({ratingInfo.num_reviewer})
                            </p>
                        </div>
                        <Status amount={product.amount}></Status>
                    </Rate>

                    <TabContent isDisplay={tab === 0} style={{}}>
                        <div>
                            <Field>Danh mục:</Field>
                            <Value>{product.product_code}</Value>
                        </div>
                        <div>
                            <Field>Xuất sứ:</Field>
                            <Value>{product.brand}</Value>
                        </div>

                        <Description>{product.description}</Description>

                        <div style={{ bottom: '0px' }}>
                            <Price>
                                <p className='oldPrice'>
                                    <s>{product.old_price + 'đ/Hộp'}</s>
                                </p>
                                <p className='price'>
                                    <b>{product.price + 'đ/Hộp'}</b>
                                </p>
                            </Price>

                            <div className='d-flex flex-row align-items-center' style={{ margin: '5px' }}>
                                <Input className='d-flex flex-row align-items-center'>
                                    <div style={{ minWidth: '35px', textAlign: 'center' }}>{count}</div>
                                    <div className='d-flex flex-column align-items-center'>
                                        <MdKeyboardArrowUp onClick={incrementCount} />
                                        <MdKeyboardArrowDown onClick={decrementCount} />
                                    </div>
                                </Input>

                                <Button
                                    disabled={parseInt(product.amount) < 1}
                                    style={{
                                        borderRadius: '20px',
                                        padding: '6px 20px',
                                    }}
                                    onClick={handleAddToCart}
                                >
                                    {parseInt(product.amount) > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                                </Button>
                                {/* <p style={{ margin: '0px 20px' }}>
                                    {parseInt(product.amount)}{' '}
                                    {parseInt(product.amount) > 1 ? 'sản phẩm hiện có' : 'còn sản phẩm'}
                                </p> */}
                            </div>
                        </div>
                    </TabContent>

                    <TabContent isDisplay={tab === 1}>
                        <div
                            style={{
                                height: '400px',
                                overflow: 'auto',
                                width: '90%',
                                margin: '0 auto',
                            }}
                        >
                            <table className='table table-striped table-hover'>
                                <tbody style={{ verticalAlign: 'middle', overflow: 'auto' }}>
                                    {spec_field.map((field, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                field={displayField[field]}
                                                value={product[field]}
                                            ></TableRow>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </TabContent>
                </Tab>

                <ImgTab>
                    <Carousel variant='dark' style={{ height: '100%' }} className='d-flex align-items-center'>
                        {product.listImg?.map((img, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <CarouselImg src={img.url}></CarouselImg>
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </ImgTab>
            </Content>

            <Features>
                <h2>Mô tả sản phẩm</h2>
            </Features>

            <InforRow>
                <InforDiv2>
                    <InforText>
                        <h3>Dược lực học</h3>
                        <p>
                            TPO là cytokine chính liên quan đến sự điều hòa việc sản xuất mẫu tiểu cầu
                            (megakaryopoiesis) và sản xuất tiểu cầu, và là phối tử (ligand) nội sinh cho TPO-R.
                            Eltrombopag tương tác với vùng xuyên màng của TPO-R ở người và khởi phát truyền đạt tín hiệu
                            tương tự nhưng không giống hệt với sự truyền đạt tín hiệu của thrombopoietin (TPO) nội sinh,
                            mà điều này kích thích sự tăng sinh và biệt hóa từ các tế bào tiền thân của tủy xương.
                        </p>
                    </InforText>
                    <InforText>
                        <h3>Dược động học</h3>
                        <p>
                            Dữ liệu nồng độ theo thời gian của eltrombopag trong huyết tương được thu thập ở 88 bệnh
                            nhân bị giảm tiểu cầu miễn dịch trong các nghiên cứu TRA100773A và TRA100773B được kết hợp
                            với dữ liệu từ 111 đối tượng người lớn khỏe mạnh trong phân tích dược động học quần thể. Ước
                            tính AUC(0-τ) và Cmax của eltrombopag trong huyết tương đối với bệnh nhân bị giảm tiểu cầu
                            miễn dịch được trình bày .
                        </p>
                    </InforText>
                </InforDiv2>
                <InforDiv2>
                    <div>
                        <img
                            alt='a sample pic'
                            src='https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00008273_zoladex_36mg_3783_6127_large_d3c4d52581.jpg'
                        ></img>
                    </div>
                </InforDiv2>
            </InforRow>

            <InforRow>
                <InforDiv2>
                    <div>
                        <img
                            alt='a sample pic'
                            src='https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00000614_allerphast_180mg_4471_6361_large_d69336d518.jpg'
                        ></img>
                    </div>
                </InforDiv2>
                <InforDiv2>
                    <InforText>
                        <h3>Tương tác dược động học</h3>
                        <p>
                            Dựa vào một nghiên cứu trên người với eltrombopag được gắn đồng vị phóng xạ, sự glucuronid
                            hóa đóng vai trò nhỏ trong sự chuyển hóa của eltrombopag. Các nghiên cứu trên microsome của
                            tế bào gan người xác nhận UGT1A1 và UGT1A3 là các enzyme chịu trách nhiệm glucuronid hóa
                            eltrombopag. Eltrombopag là chất ức chế một số enzyme UGT in vitro. Về mặt lâm sàng, không
                            tiên đoán được trước các tương tác thuốc đáng kể liên quan đến sự glucuronid hóa do sự đóng
                            góp hạn chế của từng enzyme UGT riêng lẻ trong sự glucuronid hóa eltrombopag. Khoảng 21%
                            liều eltrombopag có thể được chuyển hóa bằng cách oxy hóa.
                        </p>
                    </InforText>
                    <InforText>
                        <h3>Cách dùng Thuốc</h3>
                        <p>
                            Dùng đường uống, nên uống viên thuốc ít nhất 2 giờ trước hoặc 4 giờ sau khi dùng bất kỳ sản
                            phẩm nào như thuốc kháng acid, các sản phẩm từ sữa (hoặc các thực phẩm có chứa calci khác),
                            hoặc các chất khoáng bổ sung có chứa cation đa hóa trị (ví dụ sắt, calci, magnesi, nhôm,
                            selen và kẽm).
                        </p>
                    </InforText>
                </InforDiv2>
            </InforRow>

            <InforRow>
                <InforDiv2>
                    <InforText style={{ backgroundColor: '#fff3e1' }}>
                        <h3 style={{ color: 'orange' }}>Lưu ý</h3>
                        <p>Trước khi sử dụng thuốc bạn cần đọc kỹ hướng dẫn sử dụng và tham khảo thông tin bên dưới.</p>
                        <span style={{ fontWeight: 'bold' }}>Nguy cơ độc tính đối với gan</span>
                        <p>
                            Việc dùng Thuốc có thể gây ra bất thường chức năng gan và độc tính đối với gan nặng, có thể
                            đe dọa tính mạng (xem phần Phản ứng bất lợi). Nên đo nồng độ alanine aminotransferase (ALT),
                            aspartate aminotrasferase (AST) và bilirubin huyết thanh trước khi bắt đầu dùng eltrombopag,
                            mỗi 2 tuần trong giai đoạn điều chỉnh liều và mỗi tháng sau khi đã xác định được liều ổn
                            định. Thuốc ức chế UGT1A1 và OATP1B1, có thể dẫn đến tăng bilirubin máu gián tiếp. <br />{' '}
                            Nếu nồng độ bilirubin tăng, nên thực hiện sự phân đoạn. Nên đánh giá xét nghiệm huyết thanh
                            về chức năng gan bất thường bằng xét nghiệm lặp lại trong vòng 3 đến 5 ngày. Nếu xác định
                            các bất thường, cần theo dõi các xét nghiệm huyết thanh về chức năng gan cho đến khi các bất
                            thường hồi phục, ổn định hoặc trở về mức ban đầu. Cần ngừng điều trị bằng eltrombopag nếu
                            nồng độ ALT tăng.
                        </p>
                    </InforText>
                </InforDiv2>
                <InforDiv2>
                    <div>
                        <img
                            alt='a sample pic'
                            src='https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00000614_allerphast_180mg_7132_6361_large_5b8a7a488b.jpg'
                        ></img>
                    </div>
                </InforDiv2>
            </InforRow>

            <Features>
                <h2>Sản phẩm khác</h2>
            </Features>

            <div style={{ width: '80%', margin: '0 auto' }}>
                <SimilarProduct>
                    <OwlCarousel {...options} className='owl-theme' margin={18}>
                        {similarProduct?.map((product, index) => {
                            return (
                                <SimilarItem
                                    key={index}
                                    onClick={() => handleClick('/detail/' + String(product.product_id))}
                                >
                                    <div className='img d-flex flex-row'>
                                        <img
                                            src={product.img_cover}
                                            style={{ margin: '0 auto', width: 'auto' }}
                                            alt='similar product'
                                        />
                                    </div>
                                    <div className='d-flex flex-row align-items-center'>
                                        <Rating
                                            size='small'
                                            name='read-only'
                                            value={parseInt(product.rating)}
                                            readOnly
                                        />
                                        <p
                                            style={{
                                                fontSize: '13px',
                                                color: '#a6a6a6',
                                                margin: '0 5px',
                                            }}
                                        >
                                            {' '}
                                            {product.rating}{' '}
                                        </p>
                                    </div>
                                    <div className='name'>{product.name}</div>
                                    <p className='price' style={{ color: 'gray', margin: '0 0 0 5%' }}>
                                        <s>{product.old_price + 'đ/Hộp'}</s>
                                    </p>
                                    <p className='price' style={{ fontSize: '20px', margin: '0 0 0 5%' }}>
                                        <b>{product.price + 'đ/Hộp'}</b>
                                    </p>
                                </SimilarItem>
                            );
                        })}
                    </OwlCarousel>
                </SimilarProduct>
            </div>

            <Features>
                <h2>Đánh giá sản phẩm</h2>
                <Button variant='primary' onClick={handleShow}>
                    Thêm đánh giá
                </Button>
            </Features>

            <div style={{ width: '70%', margin: '0 auto' }}>
                {comment.map((review, index) => {
                    return (
                        <Review key={index}>
                            <div className='d-flex flex-row'>
                                <img src={review.url_avt} alt='laptop' />
                                <div className='w-100'>
                                    <div className='username'>{review.fName + ' ' + review.lName}</div>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <div className='d-flex flex-row align-items-center'>
                                            <Rating
                                                size='small'
                                                name='read-only'
                                                value={parseInt(review.rate)}
                                                readOnly
                                            />
                                            <p
                                                style={{
                                                    fontSize: '13px',
                                                    color: '#a6a6a6',
                                                    margin: '0 5px',
                                                }}
                                            >
                                                {' '}
                                                {review.rate}{' '}
                                            </p>
                                        </div>
                                        <div className='datetime'>{review.datetime}</div>
                                    </div>
                                    <div className='comment'>{review.comment}</div>
                                </div>
                            </div>
                        </Review>
                    );
                })}
            </div>

            <Footer />

            <Modal show={showModal} onHide={handleClose} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm đánh giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RatingStar>
                        <Star className='fa fa-star' onClick={() => setRatingStar(1)} checked={ratingStar >= 1}></Star>
                        <Star className='fa fa-star' onClick={() => setRatingStar(2)} checked={ratingStar >= 2}></Star>
                        <Star className='fa fa-star' onClick={() => setRatingStar(3)} checked={ratingStar >= 3}></Star>
                        <Star className='fa fa-star' onClick={() => setRatingStar(4)} checked={ratingStar >= 4}></Star>
                        <Star className='fa fa-star' onClick={() => setRatingStar(5)} checked={ratingStar >= 5}></Star>
                    </RatingStar>

                    <form>
                        <div className='form-group'>
                            <textarea
                                className='form-control'
                                id='exampleFormControlTextarea1'
                                rows='3'
                                placeholder='Mời bạn đánh giá sản phẩm ...'
                                onChange={(event) => setUserComment(event.target.value)}
                            ></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant='primary' onClick={handleRating}>
                        Gửi đánh giá
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const RatingStar = styled.div`
    margin: 0px 0px 20px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
const Star = styled.span`
    font-size: 40px;
    color: ${(props) => (props.checked === true ? 'orange' : 'none')};
`;
const Features = styled.div`
    width: 80%;
    margin: 30px auto 20px auto;
    border-bottom: 1px #ccc solid;
    padding-bottom: 6px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h2 {
        font-size: 32px;
        line-height: 39px;
        font-weight: normal;
    }
`;
const InforRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
const InforDiv2 = styled.div`
    max-width: 35%;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div img {
        max-width: 100%;
        max-height: 100%;
    }
`;
const InforText = styled.div`
    margin: 10px 0px;
    h3 {
        font-size: 24px;
        line-height: 24px;
        font-family: 'Lato', Helvetica, Arial, sans-serif;
    }
    p {
        text-align: justify;
        color: #555;
        font-size: 16px;
        line-height: 22px;
        font-family: 'Lato', Helvetica, Arial, sans-serif;
    }
`;

const TabNav = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    padding-left: 4vw;

    position: sticky;
    top: 0;
    z-index: 1071;
    background-color: white;
    border-bottom: 2px solid rgb(231 231 231);
`;
const TabItem = styled.button`
    margin: 0px 20px;
    border: none;
    background: none;
    font-weight: bolder;
    border-bottom: ${(props) => (props.bottomBar === true ? '2px blue solid' : 'none')};
`;
const Content = styled.div`
    border-bottom: 2px solid rgb(231 231 231);
    width: 100%;
    height: 570px;
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
const Tab = styled.div`
    width: 50%;
    background-color: #f5f7ff;
    padding-left: 10%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;
const TabContent = styled.div`
    display: ${(props) => (props.isDisplay === true ? 'block' : 'none')};
    /* min-height: 420px; */
    /* height: 100%; */
    overflow: auto;
`;
const Rate = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;
const Name = styled.p`
    font-weight: 500;
    font-size: 28px;
    margin: 10px 30px 10px 0;
`;
const Field = styled.p`
    font-weight: 200;
    display: inline;
    font-size: 18px;
    line-height: 30px;
    margin-right: 20px;
`;
const Value = styled.p`
    font-weight: 900;
    display: inline;
`;
const Description = styled.p`
    margin: 20px 20px 0 0;
    font-weight: 20;
    font-size: 18px;
    text-align: justify;
`;
const Price = styled.div`
    align-self: flex-end;
    margin-bottom: 10px;
    p {
        margin: 0;
    }
    .oldPrice {
        color: gray;
        font-size: 24px;
    }
    .price {
        font-size: 36px;
    }
`;
const ImgTab = styled.div`
    width: 50%;
    @media (max-width: 768px) {
        display: none;
        width: 100%;
        margin: 30px 0;
    }
`;
const Review = styled.div`
    /* background-color: #eaeaea; */
    margin: 10px 10px 20px 30px;
    padding: 10px;
    /* border-radius: 10px; */
    box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 20px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-top: 10px gray solid;
    border-right: 10px #ccc solid;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;

    img {
        border-radius: 50%;
        max-height: 50px;
        max-width: 50px;
        margin: 0 10px 10px 0;
    }
    .username {
        font-size: 24px;
        font-weight: bold;
    }
    .comment {
        margin: 5px 50px 10px 0px;
    }
    .datetime {
        font-style: italic;
    }
`;
const SimilarProduct = styled.div`
    @media (max-width: 768px) {
        /* display: none; */
    }
`;
const SimilarItem = styled.div`
    height: 250px;
    margin-bottom: 5px;
    /* border: solid 2px gray; */
    /* border-radius: 10px; */
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px 0px;
    /* padding-left: 4px; */
    .img {
        height: 45%;
        /* border: solid 1px red; */
    }
    .name {
        font-size: 12px;
        height: 20%;
        overflow: hidden;
        margin-left: 5%;
    }
    .price {
        margin-left: 5%;
    }
    /* :hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  } */
`;

const Input = styled.div`
    background-color: white;
    border-radius: 5px;
    border: none;
    padding: 3px;
    box-shadow: 0px 4px 4px gray;
    margin-right: 30px;
`;

export default Detail;
