import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  let [subtitle, subtitleChange] = useState(['오늘의 점심 추천', '강남 우동 맛집', '파이썬 독학']);
  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);


  return (
    <div className="App">
      <div className="black-nav">
        <h4>Blog</h4>
      </div>

      {
        subtitle.map(function(num ,i){
          return(
            <div className="list" key={i}>
              <h4 className="bestList" onClick={()=> modalView()}>{subtitle[i]}</h4>
              <span id="icon" onClick={()=> likefunction(i)}> 👍 </span> {like[i]}
              <p>2월 18일 발행</p>
            </div>
          )
        })
      }
      {modal ? <Modal subtitle={subtitle} subtitleChange={subtitleChange}/> : null}
      <button className="btn" onClick={()=>{
        let sortArray = [...subtitle];
        sortArray.sort();
        subtitleChange(sortArray);
      }}>가나다 순으로 정렬</button>
    </div>
  );

  // props를 이용하여 부모 -> 자식 state를 전송할 수 있음, 오로지 부모->자식만 가능.
  // 부모 -> 자식 state 전송하는 법
  // 1. <자식 컴포넌트 작명={state이름}>
  // 2. props 파라미터 등록후 props.작명 사용

  function Modal(props){
    return (
      <div className="modal">
        <h4>{props.subtitle[0]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button className='btn' onClick={()=>{
          props.subtitleChange(['여자코트 추천', '강남 우동 맛집', '파이썬 독학']);
        }}>글수정</button>
      </div>
    );
  }

  function modalView(){
    if(modal == true){
      setModal(false);
    }else{
      setModal(true);
    }
  }

  function likefunction(n){
    let copy = [...like];
    copy[n]++;
    setLike(copy);
  }
}

export default App;
