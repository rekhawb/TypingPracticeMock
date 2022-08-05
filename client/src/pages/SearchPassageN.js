import React, { useState,useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Modal } from 'react-bootstrap';
import ResultsModal from './ViewResultsModal';
import { saveParaInput,saveParaUser } from '../utils/localStorage';
import { getParaInput,getParaUser } from '../utils/localStorage';


let str = "Springtime and summer are notorious for daily thunderstorms. It is not uncommon for storms to cause fear and anxiety in a child.But if you understand what is happening, that fear can turn into wonder. Nature is amazing!";

function SearchPassage() {
// create state for holding our search field data
const [paragraphInput, setparagraphInput] = useState(str);
const [paragraphUser, setparagraphUser] = useState('');
const [trackTime, setTimer] = useState(60);
const[warningModal,showModal] = useState(false);
const[charCount, setCharCount] = useState(0);


//new use states

const [correctChar,setCorrectChar] = useState(0);
const [inCorrectChar,setInCorrectChar] = useState(0);
const[charTyped, setCharTyped] = useState(0);

let timer;

    useEffect(() => {
        document.title = 'Typing Practice';
      }, []);

 
      const updateTimer = () => {
        timer = !timer && setInterval(() => { setTimer(prevCount => prevCount - 1) // new
        }, 1000)

     if(trackTime === 0){  
      clearInterval(timer);
       showModal (true) 
      console.log(warningModal);
      }

      }
      
      useEffect(() => {
        updateTimer()
        
        return () =>
         clearInterval(timer)
      }, [trackTime,warningModal])


      useEffect(() => {
        return () => 
        {
          saveParaInput(paragraphInput);
          saveParaUser(paragraphUser);
        }
       
      });
      const userInputVaidate = (e) =>{
        let inputStr =JSON.stringify(getParaInput()).slice(1,);
       let userStr = e.target.value;
     //  alert(inputStr);
       //alert(inputStr.substring(0,1))
       //alert(userStr.length);
       findDiff (inputStr, userStr);
       setCharTyped(charTyped+1);
      }

      const findDiff = (inputStr, userStr) => {
        // we will use this to keep an eye on the two strings
            // console.log("finddiff")
       if(userStr.length > 0)
       {
       // alert(userStr.length);
        //alert(inputStr.slice(1,userStr.length));
        if(inputStr.slice(0,userStr.length) === userStr){
            setCorrectChar(correctChar+1);
           // alert(correctChar);
            setparagraphUser(userStr);
        }else{
            setInCorrectChar(inCorrectChar+1);
        }

       }else{

       }

        return;
      };




 {
        return (

       

 <>
 {
     !warningModal ?   
     
     <div className ="container">
     <div className ="row">
         <div className ="col-xs-6 mt-5 mr-2">
            
             <textarea
               name='paragraphInput'
              defaultValue={paragraphInput}               
               type='text'
               spellCheck='false'
               size='lg'
               placeholder=''
               rows={10}
               cols={60}
             />
           </div>
 
           <div className ="col-xs-6 mt-5 ml-2">
           
             <textarea
               name='paragraphUser'
               value={paragraphUser}
               onChange={(e) => userInputVaidate(e)}
               onKeyDown ={(e) => {
                if(e.key != 'Shift' && e.key != 'Backspace' && e.key != 'CapsLock')
                setCharCount(charCount+1) }}
               type='text'
               spellCheck='false'
               size='lg'
               placeholder='Start typing here'
               rows={10}
               cols={60}
             />
           </div>
 
            </div>
 
 
            <div className ="row">
         <div className ="col-xs-6 mt-5 mr-2">
           <button type="button" className="btn btn-primary">Start Timer</button>
          </div>
          <div className ="col-xs-6 mt-5 mr-2">
           <button type="button" className="btn-lg btn-primary">Remaining Time : {trackTime} s</button>
          </div>
 
          </div>
     
          </div>
     : <ResultsModal 
     show={warningModal}
     paragraphInput = {paragraphInput} 
     paragraphUser = {paragraphUser}
     charCount = {charCount}
     correctChar = {correctChar}
     inCorrectChar = {inCorrectChar}
     />
     }
 </>      




       
        );
      }

}


export default SearchPassage;