import styled from 'styled-components';
export const Container = styled.div`
    position: fixed;
    background-color: #297bff;
    height: 100vh;
    transition: 0.5s;
    overflow-x: hidden;
    /* width: 18.75em; */
    width: ${(props) => (props.toogle ? '16em' : '4.8em')};
`;
export const Heading = styled.h2`
    padding-left: 15px;
    font-size: 20px;
    text-align: center;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8em;
    color: white;
    padding: 1em 1em;
    /* border-bottom: 1px solid #ccc; */
`;
export const Img = styled.img`
    height: 1.4em;
    transform: translateX(-7px);
`;
export const List = styled.ul`
    /* position: fixed; */
    padding-left: 0.625em;
    /* padding-right: 0.625em; */
`;

export const Item = styled.li`
    list-style-type: none;
    padding: 1em 1em;
    font-size: 1.2em;
    color: ${(props) => props.color};
    display: flex;
    font-weight: ${(props) => (props.color === 'white' ? 400 : 700)};
    align-items: center;
    /* height: 3.125em; */
    /* transition: 0.1s; */
    position: relative;
    cursor: pointer;

    line-height: 1em;

    &:hover {
        color: ${(props) => (props.color === 'white' ? '#297bff' : props.color)};
        background-color: #f3f3f9;
        border-top-left-radius: 1.875em;
        border-bottom-left-radius: 1.875em;
    }
    &:hover::after {
        content: '';
        position: absolute;
        right: 0px;
        top: -3.125em;
        width: 3.125em;
        height: 3.125em;
        border-radius: 50%;
        box-shadow: 2em 2em 0 10px #f3f3f9;
        background-color: transparent;
    }

    /* &.hovered {
    &:hover::after {
      content: "";
      position: absolute;
      right: 0px;
      top: -3.125em;
      width: 3.125em;
      height: 3.125em;
      border-radius: 50%;
      box-shadow: 2em 2em 0 10px white;
      background-color: transparent;
    }
    &:hover::before {
      content: "";
      position: absolute;
      right: 0;
      bottom: -3.125em;
      width: 3.125em;
      height: 3.125em;
      border-radius: 50%;
      box-shadow: 2em -2em 0px 10px white;
      background-color: transparent;
    }
  } */
    &:hover::before {
        content: '';
        position: absolute;
        right: 0;
        bottom: -3.125em;
        width: 3.125em;
        height: 3.125em;
        border-radius: 50%;
        box-shadow: 2em -2em 0px 10px #f3f3f9;
        background-color: transparent;
    }
`;
export const Title = styled.span`
    padding-left: 1.4em;
    display: inline-block;
    /* text-overflow: ellipsis; */
    /* width: 200px; */
    /* text-align: right; */
    line-height: 0%;
`;
export const Main = styled.div`
    position: absolute;
    transition: 0.5s;
    width: ${(props) => 'calc(100% - ' + parseInt(props.width) + 'px)'};
    left: ${(props) => props.width};
`;
export const Wraper = styled.div`
    /* position: relative; */
`;
export const Search = styled.div`
    /* display: flex; */
    /* align-items: center; */
    /* gap: 10px; */
    position: relative;
    width: 320px;
    background-color: #f3f3f9;
`;
export const Input = styled.input`
    outline: none;
    padding: 10px 20px 10px 30px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    width: 100%;
    background-color: #f3f3f9;
`;
export const IconSearch = styled.div`
    position: absolute;
    top: 7px;
    left: 9px;
    font-size: 0.8em;
`;
export const Avatar = styled.div`
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    width: 40px;
`;
export const ImgAvatar = styled.img`
    height: 40px;
    width: 40px;
    object-fit: cover;
    /* transform: translateY(-8px); */
`;
export const HeaderWrapper = styled.div`
    padding: 8px;
    z-index: 2;
    position: fixed;
    width: inherit;
    /* margin-bottom: 100px; */
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4em;
    background-color: white;
    box-shadow: 0px 0px 6px #b2b2b2;
`;
export const Icon = styled.div``;
export const IconCard = styled.div`
    font-size: 50px;
`;
export const CardContainer = styled.div`
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
`;
export const CardNumber = styled.h3`
    font-size: 28px;
    font-weight: 600;
    color: #297bff;
    margin-bottom: 14px;
    /* &:hover {
      color: inherit;
    } */
`;
export const Card = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 48%;
    cursor: pointer;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0px 0px 6px #b2b2b2;
    background-color: white;
    /* transition: 0.s; */
    &:hover {
        background-color: #297bff;
        color: white;
        ${CardNumber} {
            color: white;
        }
    }
    @media (max-width: 1024px) {
        width: 49%;
    }
    /* @media (max-width: 600px) {
    width: 99%;
  } */
`;
export const CardLeft = styled.div``;
export const CardTitle = styled.span`
    /* &:hover {
    color: white;
  } */
`;
