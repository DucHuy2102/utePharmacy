import React from 'react';
import { FiEye } from 'react-icons/fi';
import styled from 'styled-components';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CardContainer, Card, CardLeft, CardNumber, CardTitle, IconCard } from './style';
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    @media (max-width: 1024px) {
        flex-wrap: wrap;
        width: 100%;
    }
`;
const data = [
    {
        name: 'month 1',
        sell: 2400,
        amt: 2400,
    },
    {
        name: 'month 2',

        sell: 1398,
        amt: 2210,
    },
    {
        name: 'month 3',

        sell: 9800,
        amt: 2290,
    },
    {
        name: 'month 4',

        sell: 3908,
        amt: 2000,
    },
    {
        name: 'month 5',

        sell: 4800,
        amt: 2181,
    },
    {
        name: 'month 6',

        sell: 3800,
        amt: 2500,
    },
    {
        name: 'month 7',

        sell: 4300,
        amt: 2100,
    },
];
const CardBox = () => {
    return (
        <Wrapper>
            <CardContainer>
                <Card>
                    <CardLeft>
                        <CardNumber>1,504</CardNumber>
                        <CardTitle>Daily Views</CardTitle>
                    </CardLeft>
                    <IconCard>
                        <FiEye />
                    </IconCard>
                </Card>

                <Card>
                    <CardLeft>
                        <CardNumber>1,504</CardNumber>
                        <CardTitle>Daily Views</CardTitle>
                    </CardLeft>
                    <IconCard>
                        <FiEye />
                    </IconCard>
                </Card>

                <Card>
                    <CardLeft>
                        <CardNumber>1,504</CardNumber>
                        <CardTitle>Daily Views</CardTitle>
                    </CardLeft>
                    <IconCard>
                        <FiEye />
                    </IconCard>
                </Card>

                <Card>
                    <CardLeft>
                        <CardNumber>1,504</CardNumber>
                        <CardTitle>Daily Views</CardTitle>
                    </CardLeft>
                    <IconCard>
                        <FiEye />
                    </IconCard>
                </Card>
            </CardContainer>
            <div
                style={{
                    position: 'static',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    padding: '4px 2px',
                    boxShadow: '0px 0px 6px #B2B2B2',
                }}
            >
                <ResponsiveContainer width={'99%'} height={300}>
                    <LineChart
                        // width={500}
                        // width={700}
                        // height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type='monotone' dataKey='sell' stroke='#8884d8' activeDot={{ r: 8 }} />
                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Wrapper>
    );
};

export default CardBox;
