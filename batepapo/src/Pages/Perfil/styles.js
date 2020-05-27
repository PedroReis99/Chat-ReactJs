import styled from 'styled-components';
import { FaRegPlusSquare } from 'react-icons/fa';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column; 
    align-items: center;
    margin-top: 30px;
    font-size: 16px;
`;

export const IconAdd = styled(FaRegPlusSquare)`
    color: #FFFFFF;
    margin-left: 5px;
`;