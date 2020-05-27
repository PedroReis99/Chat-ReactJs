import styled from 'styled-components';
import { FaRocketchat } from 'react-icons/fa';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    background-color: #01DFA5;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    text-decoration: none;
`;

export const IconeSite = styled(FaRocketchat)`
    width: 50px;
    height: 50px;
    margin-left: 20px;
    color: #FFFFFF;
`;