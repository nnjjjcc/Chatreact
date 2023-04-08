import React, { useEffect, useState, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import { ToastContainer, toast } from "react-toastify"
//ToastContainer 是一个应用程序的容器，你需要包括根组件。这必须被加载到DOM树中。然而，这些并不要求在每个组件中添加它。
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { loginRoute } from '../utils/APIRoutes';
function Login() {
    const navigate = useNavigate()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    const stateMessage = {
        usernameOrEmail: "",

        password: "",
    }
    const [values, setValues] = useState(stateMessage)
    const handleValidation = () => {
        //信息判断
        const { password, usernameOrEmail } = values
        if (password === "") {
            toast.error(
                "密码不能为空",

                toastOptions
            );
            return false;
        } else if (usernameOrEmail === "") {


            toast.error(
                "用户名不能为空",
                toastOptions
            );
            return false;
        }
        return true;


    }
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate('/')
        }
    }, [])
    const handleSubmit = async (event) => {
        try {
            // 该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。
            // 如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，通过调用该方法，可以阻止提交表单。
            event.preventDefault();
            //提交验证
            if (handleValidation()) {
                const { password, usernameOrEmail } = values


                //传递数据后，进行验证
                const { data } = await axios.post(loginRoute
                    , {
                        usernameOrEmail,
                        password,

                    });
                localStorage.setItem('chat-app-user', JSON.stringify(data.userData))
                toast.success("登录成功", toastOptions)
                navigate("/");
            }
        }
        catch (err) {
            console.log(err)
            toast.error("用户名或密码错误", toastOptions)

        }
    }


    const handleChange = (event) => {
        //更改后保存

        setValues({ ...values, [event.target.name]: event.target.value })


    };
    return (
        <>
            <FormContainer>
                <form action="" onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>xin-su 即时通讯</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="输入用户名或邮箱"
                        name="usernameOrEmail"
                        onChange={(e) => handleChange(e)}
                    />

                    <input
                        type="password"
                        placeholder="输入密码"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">登录</button>
                    <span>
                        没有账户 ? <Link to="/Register">点此注册</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer></ToastContainer>


        </>

    )
}
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
gap: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #131324;
.brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
}
form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
}
input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
}
button{
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
}
span {
    align-items:center;
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
    }
img{
    border: 0.1rem solid #997af0;
    border-radius: 0.4rem;
}
`
export default Login