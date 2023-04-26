import React from "react";
import { useState } from "react"; // useState 하나만 구조분해해서 가져온다
import { useNavigate } from "react-router-dom";
import imgLogo from "../images/tier_logo.png"; // images 파일 안에 있는 로고파일을 import
import styled from "styled-components";
import AxiosApi from "./AxiosApi";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;

  .item1 {
    margin-top: 100px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item2 {
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .item3 {
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    font-size: 14px;
  }

  .hint {
      display: flex;
      margin-top: -5px;
      margin-bottom: 10px;
      margin-right: 40px;
      justify-content:right;
      align-items:center;
      font-size: 12px;
      color: #999;
  }
  .success {
    color: royalblue;
  }
  .error {
    color: red;
  }

  .enable-button {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: orange;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
    font-weight: 700;
  }
  .enable-button:active {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
    font-weight: 700;
  }
  .disable-button {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 13px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
  }
`;

const Input = styled.input`
  margin-left: 30px;
  margin-right: 30px;
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const Login = () => {
  const navigate = useNavigate(); // 라우터 이동을 하기 위해서 useNavigate 사용. stack 개념(FILO)

  // 키보드 입력
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  // 오류 메세지 출력
  const [idMsg, setIdMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState("");
  const [isPw, setIsPw] = useState("");

  const onChangeId = (e) => {
    const regexId = /^\w{5,20}$/; // 정규식 체크
    setInputId(e.target.value);
    if(!regexId.test(e.target.value)) { // useState 로 입력 값을 받을 때 setInputId로 설정한 inputId를 체크하지말고, e.target.value 로 입력값을 받을 것 (setter가 바로 읽는 것이 아니라 어느 시점 렌더링 되면서 읽기 때문. 변수가 아님)
      setIdMsg("5자리 이상 20자리 미만으로 입력해 주세요.");
      setIsId(false);
    } else {
      setIdMsg("올바른 형식 입니다.");
      setIsId(true);
    }
  }
  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent)
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
      setIsPw(false);
    } else {
      setPwMsg('안전한 비밀번호에요 : )');
      setIsPw(true);
    }
  }

  const onClickLogin = async() => { // 로그인을 위한 axios 호출
    const response = await AxiosApi.memberLogin(inputId, inputPw);
    console.log(response.data);
    if(response.data === true) { // 데이터 값이 있는 경우 /Home 페이지로 자동 이동
      navigate("/Home");
    } else {
      console.log("로그인 에러");
    }
  }

  return (
    <Container>
      <div className="item1">
        <img src={imgLogo} alt="" />
      </div>
      <div className="item2">
        <Input placeholder="이름" value ={inputId} onChange={onChangeId}/>
      </div>
      <div className="hint">
        {inputId.length > 0 && <span className={`${isId ? 'success' : 'error'}`}>{idMsg}</span>}
      </div>
      <div className="item2">
        <Input placeholder="패스워드" value ={inputPw} onChange={onChangePw}/>
      </div>
      <div className="hint">
        {inputPw.length > 0 && (
          <span className={`${isPw ? 'success' : 'error'}`}>{pwMsg}</span>)}
      </div>
      <div className="item2">
        {(isId && isPw) ?
            <button className="enable-button" onClick={onClickLogin}>SING IN</button>  : // 조건식이 참일 경우
            <button className="disable-button" >SING IN</button>}
      </div>
    </Container>
  );
}

export default Login;