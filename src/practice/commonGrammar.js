// eslint-disable  이걸 적으면 밑에서 사용하지 않은 변수에 대한 warning을 터미널에 출력해주지 않음.
import React from "react";
import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let post = "오늘의 맛집";

  // 변수 뿐만 아니라 자료를 잠깐 저장할때 쓸 수 있는 state 문법이 있음
  // state는 1. import {useState} 2. useState(보관할 자료) 3. let [작명, 작명]
  let [subtitle, subtitleChange] = useState([
    "오늘의 점심 추천",
    "강남 우동 맛집",
    "파이썬 독학",
  ]);
  // destructuring문법 -> let [a, b] = [1 ,2]이면 a=1, b=2
  // 변수 문법이 있는데도 state문법이 따로 있는 이유는 갑자기 변수의 데이터가 변경이 되었을 경우,
  // html도 같이 변경을 해줘야 하는데 state는 갑자기 변경되면 자동으로 html이 재렌더링 되면서 이 state를 쓰고 있는 변수가 자동으로 바뀌기 때문에 사용함.
  // State 언제 써야함? : 변경시 자동으로 html에 반영되게 만들고 싶으면 쓰면됨, 자주 변경되는 거!!!

  // state는 등호로 변경하려고 하면 바뀌지 않음, 두번째 함수를 이용해 변경해야 바뀜.
  let [like, likeChange] = useState(0); //c는 state 변경 함수

  //모달창 state, false는 닫힘 true는 열림
  let [modal, setModal] = useState(false);

  // 리턴 안에는 무조건 하나의 태그만. 병렬로 2개 이상 태그 금지
  return (
    // 자바스크립트에서 html을 쓰게 만들어주는 JSX 문법
    <div className="App">
      <div className="black-nav">
        <h4>Blog</h4>
      </div>

      <div className="list">
        {/* JSX는 변수를 선언하면 그걸 그냥 변수 쓸때 중괄호{}로 넣을 수 있음, 데이터 바인딩 */}
        {/* onClick내에는 항상 함수만 넣어야 함. 함수 만드는 문법을 넣어도 상관은 없음 */}
        <h4
          onClick={() => {
            modalView();
          }}
        >
          {subtitle[0]}
          <span id="icon" onClick={() => likeChange(like++)}>
            {" "}
            👍🏻{" "}
          </span>{" "}
          {like}{" "}
        </h4>
        <p>2월 12일 발행</p>
      </div>

      <div className="list">
        <h4
          onClick={() => {
            modalView();
          }}
        >
          {subtitle[1]}
        </h4>
        <p>2월 13일 발행</p>
      </div>
      <div className="list">
        <h4
          onClick={() => {
            modalView();
          }}
        >
          {subtitle[2]}
        </h4>
        <p>2월 14일 발행</p>
        <div className="wrap">
          <button
            className="btn"
            onClick={() => {
              // *state변경함수의 특징 : 기존 state == 신규state의 경우 변경 안해줌. 왜? 같으니까.
              // 또한 javascript에서의 array는 배열에 담은 변수의 화살표만 저장함. 변수를 담는게 아님.
              // 그래서 array를 변경하고 싶으면 화살표를 새로 바꾸기 위해 ... 과 같이 점 3개를 쓰면 됨.
              // ... 은 괄호를 벗겨서 다시 씌워주세요 라는 의미임. 그러면 프로그램이 새로운 state구나 해서 변경을 해줌.
              let copy = [...subtitle];
              copy[2] = "여자 코트 추천";
              subtitleChange(copy);
            }}
          >
            다른 주제 선택
          </button>
        </div>
      </div>
      <button
        className="btn"
        onClick={() => {
          let sortArray = [...subtitle];
          sortArray.sort();
          subtitleChange(sortArray);
        }}
      >
        가나다 순으로 정렬
      </button>

      {/* <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div> */}
      {/* 내가 원하는 하나의 기능을 깔끔하게 한 단어로 축약해서 사용할 수 있는 리액트 문법이 있음.
      그걸 component라고 하는데 modal 역시도 한 덩어리로 만들 수 있음. 
      근데 이렇게 하려면 3가지 단계를 요구함.
      1. fuction을 만들고 2. return() 안에 html 담기 3. <함수명></함수명>을 써야함.*/}
      {/* <Modal /> */}

      {/* 모든 array자료형에는 map()을 붙일 수 있는데 이때 소괄호 안에 콜백 함수를 넣을 수 있음.
      [1, 2, 3].map(function(){})
      이런식으로. 그러면 array 안에 있는 갯수만큼 function을 반복해서 실행해줌.
      만약 function(a)를 넣으면 1, 2, 3을 순서대로 사용 할 수 있게 해줌.
      return을 쓰면 return한 값을 배열 갯수만큼 사용 가능. */}
      {
        // 여기서 i를 써도 됨. i는 1씩 증가하는 인자
        subtitle.map(function (num, i) {
          return (
            // 반복문으로 html생성하면 key={html마다 다른 숫자} 추가해줘야함
            <div className="list" key={i}>
              <h4 onClick={() => modalView()}>{num}</h4>
              <p>2월 18일 발행</p>
            </div>
          );
        })
      }

      {modal == true ? <Modal /> : null}
    </div>
  );

  // * 컴포넌트는 언제 쓰면 좋을까? => 1. 반복적으로 출현하는 html, 2. 큰 페이지들, 3. 자주 변경되는 UI들
  function Modal() {
    return (
      <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    );
  }

  // *동적인 UI 만드는 step*
  // 1. html css로 미리 디자인 완성
  // 2. UI의 현재 상태를 state로 저장
  // 3. state에 따라 UI가 어떻게 보일지 작성

  function modalView() {
    if (modal == true) {
      setModal(false);
    } else {
      setModal(true);
    }
  }
}

export default App;
