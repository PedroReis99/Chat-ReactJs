import styled from 'styled-components';
import { FaPowerOff, FaUserCog, FaCommentDots,  FaBuromobelexperte  } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';

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

export const Icone = styled(FaPowerOff)`
    margin-left: 5px;
`;

export const UserIcon = styled(FaUserCog)`
    color: #FFFFFF;
    margin-left: 5px;
`;

export const ChatIcon = styled(FaCommentDots)`
    color: #FFFFFF;
    margin-left: 5px;
`;

export const DashPost = styled(FaBuromobelexperte)`
    color: #FFFFFF;
`;

export const IconePerfil = styled(MdPerson)`
    width: 50px;
    height: 50px;
    background-color: #FFFFFF;
    color: #585858;
    border-radius: 50px;
    border: none;
    margin-left: 15px;
    margin-top: 5px;
`;