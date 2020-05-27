import styled from 'styled-components';
import { FaRocketchat } from 'react-icons/fa';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
`;

export const Informacao = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    width: 600px;
    height: 450px;
    background-color: #FFFFFF;
    border-radius: 10px;
`;

export const Icone1 = styled(FaRocketchat)`
    margin-top: 10px;
    margin-bottom: 40px; 
    width: 200px;
    height: 200px;
`;

export const Header = styled.div`
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