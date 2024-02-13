import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  let [subtitle, subtitleChange] = useState(['오늘의 점심 추천', '강남 우동 맛집', '파이썬 독학']);
  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [inputValue, setInputValue] = useState('');

  let now = new Date();
  let month = ('0' + (now.getMonth() + 1)).slice(-2);
  let day = ('0' + now.getDate()).slice(-2);
  let hours = ('0' + now.getHours()).slice(-2); 
  let minutes = ('0' + now.getMinutes()).slice(-2);
  let seconds = ('0' + now.getSeconds()).slice(-2); 

  let [times, setTimes] = useState([]);

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
              <p>{times[i]}</p>
              <button className='btn clear' onClick={()=>{
                  let copy=[...subtitle];
                  let copyLike=[...like];
                  copy.splice(i, 1);
                  copyLike.splice(i, 1);
                  subtitleChange(copy);
                  setLike(copyLike);
              }}>삭제</button>
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

      {/* onChange는 사용자가 입력을 할때마다 입력한 함수가 실행됨, 유사품으로 onInput()이 있음 
      e는 보통 event 객체를 말함. 보통 인수는 e를 많이 사용
      내 상위 요소의 이벤트 버블링을 없애는 방법은 e.stopPropagation()
      */}
      <input id="textInput" onChange={(e)=>{
        setInputValue(e.target.value);
      }} />
      <button id="btn--input" onClick={()=>{
        if(inputValue== ''){
          alert('내용을 입력해 주세요!');
        }else{
          let copy = [...subtitle];
          let copyLike = [...like];
          copy.unshift(inputValue);
          copyLike.unshift(0);
          subtitleChange(copy);
          setLike(copyLike);

          let time = month + '월 ' + day + '일 ' + hours + ':'+ minutes + ':' + seconds + ' 발행';
          let copyTime = [...times];
          copyTime.unshift(time);
          setTimes(copyTime);

        }
      }}> 글 추가하기 </button>


    </div>
  );

  function Modal(props){
    return (
      <div className="modal">
        <h4>{props.subtitle[props.title]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button className='btn' onClick={()=>{
          props.subtitleChange(['여자코트 추천', '강남 우동 맛집', '파이썬 독학']);
        }}>글수정</button>
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
