import CardBox from './CardBox';
import MainContent from './MainContent';
import styled from 'styled-components';
const Wraper = styled.div`
    padding: 14px 12px 30px;
    background-color: #f3f3f9;
`;
const Home = () => {
    return (
        <Wraper>
            <CardBox />
            <MainContent />
        </Wraper>
    );
};

export default Home;
