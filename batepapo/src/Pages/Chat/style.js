import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';


export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 90%;
    height: 500px;
    margin-top: 20px;
    background-color: #272727;
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
    scroll-margin: 4px;
    overflow-x: hidden; 
    overflow-x: auto;
    padding: 4px;
`;

export const Campo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    height: 50px;
    border-radius: 5px;
    background-color: #272727;
`;

export const IconeEnviar = styled(FaPaperPlane)`
    width: 20px;
    height: 20px;
`;