import { Slider } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import CloseIcon from '@mui/icons-material/Close';

const Filter = (props) => {
    const minDistance = 1;
    function valuetext(value) {
        return `${value}°C`;
    }
    const targetRam = (ram) => {
        if (!props.ramFilter.includes(ram)) {
            props.setRamFilter([...props.ramFilter, ram]);
        } else {
            props.setRamFilter(props.ramFilter.filter((r) => r !== ram));
        }
    };
    const targetBrand = (brand) => {
        if (!props.brandsTaget.includes(brand.name)) {
            props.setBrandsTaget([...props.brandsTaget, brand.name]);
        } else {
            props.setBrandsTaget(props.brandsTaget.filter((brandName) => brandName !== brand.name));
        }
    };
    const applyFilter = () => {
        props.setShow(0);
        props.applyFilter();
    };
    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            props.setValue([Math.min(newValue[0], props.value[1] - minDistance), props.value[1]]);
        } else {
            props.setValue([props.value[0], Math.max(newValue[1], props.value[0] + minDistance)]);
        }
    };
    const changeMin = (e) => {
        props.setValue([e.target.value, props.value[1]]);
    };
    const changeMax = (e) => {
        props.setValue([props.value[0], e.target.value]);
    };

    return (
        <Container>
            <Row>
                <Title>Bộ lọc</Title>
                {props.show === 1 && <CloseIcon onClick={() => props.setShow(0)} />}
            </Row>
            <Button type='transparent' text='Xóa bộ lọc' onClick={() => props.clearFilter()} />
            {/* <TypeFilter>Xuất sứ</TypeFilter>
            <Brands>
                {props.brands.map((brand, idx) => {
                    return (
                        <Brand
                            key={idx}
                            className={props.brandsTaget.includes(brand.name) ? 'active' : ''}
                            src={brand.img}
                            alt='brand'
                            id={brand.id}
                            onClick={() => targetBrand(brand)}
                        />
                    );
                })}
            </Brands> */}
            <TypeFilter>Thuốc cần kê toa</TypeFilter>
            <Ram>
                <input
                    type='checkbox'
                    name='4gbram'
                    id='4gbram'
                    value='4GB'
                    checked={props.ramFilter.includes('4GB')}
                    onChange={() => targetRam('4GB')}
                />
                <label>
                    <span>Có</span>
                    <span></span>
                </label>
            </Ram>
            <Ram>
                <input
                    type='checkbox'
                    name='8gbram'
                    id='8gbram'
                    value='8GB'
                    checked={props.ramFilter.includes('8GB')}
                    onChange={() => targetRam('8GB')}
                />
                <label>
                    <span>Không</span>
                    <span></span>
                </label>
            </Ram>
            {/* <Ram>
                <input
                    type='checkbox'
                    name='16gbram'
                    id='16gbram'
                    value='16GB'
                    checked={props.ramFilter.includes('16GB')}
                    onChange={() => targetRam('16GB')}
                />
                <label>
                    <span>16GB</span>
                    <span></span>
                </label>
            </Ram> */}
            <TypeFilter>Giá tiền (VND)</TypeFilter>
            <Slider
                style={{ width: '90%', margin: '0 5%' }}
                getAriaLabel={() => 'Minimum distance'}
                value={props.value}
                max={100000}
                onChange={handleChange}
                valueLabelDisplay='auto'
                getAriaValueText={valuetext}
                disableSwap
            />
            <Row>
                {/* <p style={{ fontSize: '20px', color: 'gray' }}></p> */}
                <Input
                    style={{ width: '80px', textAlign: 'center' }}
                    type='text'
                    value={props.value[0]}
                    onChange={(e) => changeMin(e)}
                ></Input>
                <p style={{ fontSize: '25px', color: 'gray', paddingTop: '10px' }}>-</p>
                <Input
                    style={{ width: '80px', textAlign: 'center' }}
                    type='text'
                    value={props.value[1]}
                    onChange={(e) => changeMax(e)}
                ></Input>
            </Row>
            <br />
            <Button text='Tiến hành lọc' onClick={applyFilter} />
        </Container>
    );
};

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const Input = styled.input`
    width: 70px;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    height: 25px;
    padding: 5px;
`;
const Ram = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 0;
    & input {
        flex: 1;
        transform: scale(1.4);
    }
    & label {
        width: 85%;
        display: flex;
        justify-content: space-between;
    }
`;
const Brand = styled.img`
    width: 48%;
    margin: 1%;
    height: 60px;
    background-color: white;
    padding: 5px 10px;
    &.active {
        border: 1px solid #0156ff;
    }
    :hover {
        cursor: pointer;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }
    @media (max-width: 768px) {
        width: 24%;
        margin: 0.5%;
        box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    }
`;
const Brands = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const TypeFilter = styled.p`
    font-weight: bold;
    margin: 10px 0;
    border-top: 1px solid #e5e5e5;
    padding-top: 10px;
`;

const Title = styled.p`
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
`;
const Container = styled.div`
    margin-top: 57px;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: #f5f7ff;
    height: fit-content;
    @media (max-width: 768px) {
        background-color: white;
    }
`;

export default Filter;
