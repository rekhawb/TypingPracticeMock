import React, { useState,useEffect } from 'react';
import { useParams, Link, useLocation} from 'react-router-dom';
import { useMutation,useQuery,useLazyQuery } from '@apollo/client';
import { Modal } from 'react-bootstrap';
import ResultsModal from './ViewResultsModal';
import SelectParagraphs from './SelectParagraph';
import { saveParaInput,saveParaUser } from '../utils/localStorage';
import { getParaInput,getParaUser } from '../utils/localStorage';
import {GET_ATEXT} from '../utils/queries';
import { SAVE_PROGRESS } from '../utils/mutations';
import {Container} from '../components/styles/Container';
import { StyledCard } from '../components/styles/Card';
import {StyledHeader, StyledHeader1 } from '../components/styles/Header';
import { Flex } from'../components/styles/Flex';
import {Button}  from'../components/styles/Button'
import ViewResults from './ViewResultsOnly';
import { format } from 'date-fns'

let str = "Springtime and summer are notorious for daily thunderstorms. It is not uncommon for storms to cause fear and anxiety in a child.But if you understand what is happening, that fear can turn into wonder. Nature is amazing!";

const SearchPassage =  (props) =>{

  //let {id} = useParams();
  //const {loading,data} = useQuery(GET_ATEXT,{
    //variables: {_id:id},    
  //});

  //use location to capture values sent from searchPassageN
  const location = useLocation();
const { state } = location;

// if the user types /starttyping route manually, then standard str will be populated.

// blank page or errors will not be displayed

const paraInput = state === null ? str :state.paraInput;
const paraId = state === null ? 'abc123' :state.idInput;
const paraTitle = state === null ? 'Random Text' :state.titleInput;

str =  paraInput
//id//data?.selectParagraph.paragraphDesc || str;
let id =paraId// stateId;
let title = paraTitle
//save progress to db
const [saveProgress, {  error }] = useMutation( SAVE_PROGRESS);

str = JSON.stringify(str).slice(1,);

// create state for holding our search field data
const [paragraphInput, setparagraphInput] = useState(str);



const [paragraphUser, setparagraphUser] = useState('');
const [trackTime, setTimer] = useState(65);
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
      // handleUpdateProgress is called even when showModal is false. showModal === false implie, user typing session is still on
      // warningModal === true prevents calling handleUpdateProgress when  useEffect  is called twice
      if(warningModal === true && charCount >=20) {
      handleUpdateProgress(id);
      }

      clearInterval(timer);
      
       showModal (true) 
      //console.log(warningModal);

      // donot show results if char typed are less than 30 characters, 30/5 atleast 6 words

   
      }

      }

      // save data to DB

      const handleUpdateProgress = async(textId) =>{

        //console.log("save progress to DB")
    
      const {data} = await saveProgress({
        // variables: { bookData: {...bookToSave}},
        variables: { progressData: {
          textId: id,
          passageTitle:title,
          attemptedOn:format(new Date(), 'MM/dd/yyyy'),
          grossWPM:(Math.round(charTyped/5)).toString(),
          netWPM:((Math.round((charTyped-inCorrectChar)/5))).toString(),
          accuracy:(Math.round(((correctChar/charCount)*100))).toString()
        
        
        }},
         //variables: {bookToSave}
       });  
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

      //update useStates accordingly, charCout, incorrect chars, correct chars, userString, for downstream calcs - gross wpm, net wpm, accuracy

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
        // user typed string is matched with input string, if there is a match,  state is updated with user string, else state is not updated, the incorrect characters are counted. 

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

//selected text is ready for typing


 {
        return (

       

 <>
 {
     !warningModal ?   
     
   <Container>
    <Flex>
     <StyledCard>
            <h6><span style={{color:'Orange',fontWeight: 'bold'}}>You can get an extra 5 seconds to start typing.</span></h6>
            <h6><span style={{color:'Orange',fontWeight: 'bold'}}> Page redirects to scores as soon as timer hits 60 secs</span></h6>
            <h6> <span style={{color:'Orange',fontWeight: 'bold'}}>Scores for all practice lessons are saved under Achievement Board</span></h6>
            <StyledHeader> Start typing in the blank box below</StyledHeader><br></br>
             <textarea
               name='paragraphInput'
              defaultValue={paragraphInput} 
               type='text'
               spellCheck='false'
               size='lg'
               placeholder=''
               rows={5}
               cols={100}
               disabled={true}
             />
        </StyledCard>
        </Flex>
        <StyledCard>
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
               rows={5}
               cols={100}
             />
           </StyledCard>
 
 
            <StyledCard>
           <Button>Remaining Time : {trackTime} s</Button>
          </StyledCard>
     
          </Container>
     :  warningModal && charCount < 20 ? 
    <ViewResults />



     :

           <ResultsModal 
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