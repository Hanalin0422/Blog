import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  let [subtitle, subtitleChange] = useState(['오늘의 점심 추천', '강남 우동 맛집', '파이썬 독학']);
  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);


  return (
    <div className="App">
      <div className="black-nav">
        <h4>Blog</h4>
      </div>

      {
        subtitle.map(function(num ,i){
          return(
            <div className="list" key={i}>
              <h4 className="bestList" onClick={()=> modalView(i)}>{subtitle[i]}</h4>
              <span id="icon" onClick={()=> likefunction(i)}> 👍 </span> {like[i]}
              <p>2월 18일 발행</p>
            </div>
          )
        })
      }
      {
        modal ? <Modal subtitle={subtitle} title={title} subtitleChange={subtitleChange}/> : null
      }

      <button className="btn" onClick={()=>{
        let sortArray = [...subtitle];
        sortArray.sort();
        subtitleChange(sortArray);
      }}>가나다 순으로 정렬</button>
    </div>
  );

  function Modal(props){
    return (
      <div className="modal">
        <h4>{props.subtitle[props.title]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    );
  }

  function modalView(i){
    if(modal == true){
      setModal(false);
    }else{
      setModal(true);
      setTitle(i);
    }
  }

  function likefunction(n){
    let copy = [...like];
    copy[n]++;
    setLike(copy);
  }
}

export default App;
