import styled from 'styled-components';
import { MdReport } from 'react-icons/md';

export const Icone = styled(MdReport)`
    width: 300px;
    height: 300px;
    color: #FF0000;
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 24px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 720px;
    height: 400px;
    margin-top: 120px;
    border-radius: 10px;
    background-color: #FFFFFF;
`;