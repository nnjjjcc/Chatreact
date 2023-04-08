import axios from 'axios';
import React, { useEffect, useState, memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { allUserRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import styled from "styled-components"
function Chat() {
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)

    const setUser = async () => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login")
        } else {
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        }
    }
    const fincaluser = async () => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                const data = await axios.get(`${allUserRoute}/${currentUser.username}`)
                console.log(data.data)
                setContacts(data.data)
            }
            else {
                navigate("/SetAvatar")
            }
        }
    }
    useEffect(() => {
        setUser()
    }, [])
    useEffect(() => {
        fincaluser()
    }, [currentUser])
    return (
        <Container>
            <div className='container'>
                <Contacts contacts={contacts} currentUser={currentUser}></Contacts>
            </div>
        </Container>
    )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        //@media 规则在媒体查询中用于为不同的媒体类型/设备应用不同的样式。
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat