import styled from 'styled-components';
import { FiLoader } from 'react-icons/fi';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const Icone = styled(FiLoader)`
    width: 100px;
    height: 100px;
    margin-top: 200px;
    color: black;
`;
