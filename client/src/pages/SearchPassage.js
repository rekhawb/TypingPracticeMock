import React, { useState,useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Modal } from 'react-bootstrap';
import ResultsModal from './ViewResultsModal';
import { saveParaInput,saveParaUser } from '../utils/localStorage';


let str = "Springtime and summer are notorious for daily thunderstorms. It is not uncommon for storms to cause fear and anxiety in a child.But if you understand what’s happening, that fear can turn into wonder. Nature is amazing!";

function SearchPassage() {
// create state for holding our search field data
const [paragraphInput, setparagraphInput] = useState(str);
const [paragraphUser, setparagraphUser] = useState('');
const [trackTime, setTimer] = useState(5);
const[warningModal,showModal] = useState(false);
const[charCount, setCharCount] = useState(0);

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
               onChange={(e) => setparagraphUser(e.target.value)}
               onKeyDown ={() => setCharCount(charCount+1) }
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
           <button type="button" className="btn-lg btn-primary" onClick={setTimer}>Remaining Time : {trackTime} s</button>
          </div>
 
          </div>
     
          </div>
     : <ResultsModal 
     show={warningModal}
     paragraphInput = {paragraphInput} 
     paragraphUser = {paragraphUser}
     charCount = {charCount}
     />
     }
 </>      




       
        );
      }

}


export default SearchPassage;