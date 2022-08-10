import React, { useState,useEffect } from 'react';
import { useMutation,useQuery } from '@apollo/client';
import { getParaInput,getParaUser } from '../utils/localStorage';
import { Container } from  '../components/styles/Container';
import { StyledCard } from '../components/styles/Card';
import { Flex } from'../components/styles/Flex';
import { StyledHeader } from '../components/styles/Header';

import '../index.css'
import { SAVE_PROGRESS } from '../utils/mutations';

const ResultsModal = ({show,paragraphInput,paragraphUser,charCount,correctChar,inCorrectChar}) => {


  

let str1 =JSON.stringify( getParaInput());
let str2 = JSON.stringify(getParaUser());
   

    const para1 =str1.split("");
    const para2 = str2.split("");

   // console.log(str1);
let wordPara1 = str1.match(/\b(\w+)\b/g);
let wordPara2 = str2.match(/\b(\w+)\b/g);


    const [isHighlightActive, setIsHighlightActive] = useState(false);
    const [wrongCharIndexes] = useState(new Set());
    const [wrongWordIndexes,setWord] = useState(0);
    const [gWPM, setgWPM] = useState(0);
    const [nWPM, setnWPM] = useState(0);
    const [tAccrcy, setTAccrcy] = useState(0);

    useEffect(() => {
        findDiff(str1, str2);
      }, [str1,str2]);

      useEffect(() => {
        wordDiff(wordPara1, wordPara2);
      }, [wordPara1,wordPara2]);

      useEffect(() => {
        setIsHighlightActive((prev) => !prev)
      },[]);

      useEffect(() => {
        charCount  !== 0 ?
        setgWPM(Math.round(charCount/5) ): setgWPM(0)
      },[]);

      useEffect(() => {
        charCount  !== 0 ?
        setnWPM((Math.round(charCount/5))-inCorrectChar): setnWPM(0)
      },[]);

      useEffect(() => {
        charCount  !== 0 ?
        setTAccrcy(Math.round(((correctChar/charCount)*100)) ): setTAccrcy(0)
      },[]);


     
        const wordDiff  = (a1, a2) => {
            const wordMatch = wordPara2.filter(v => wordPara1.includes(v)).length;
            setWord(wordMatch);
        }
   

    const findDiff = (str1, str2) => {
        // we will use this to keep an eye on the two strings
        let index = 0;
       // console.log("finddiff")
    
        while (index < str1.length || index < str2.length) {
          const left_char = str1[index];
          const right_char = str2[index];
          if (left_char === right_char) {
            wrongCharIndexes.add(index);
          }
          index++;
        }
        //console.log(wrongCharIndexes) ;
        
        /*while (index < wordPara1.length || index < wordPara2.length) {
            const left_char = wordPara1[index];
            const right_char = wordPara2[index];
            if (left_char === right_char) {
              wrongWordIndexes.add(index);
            }
            index++;
          }*/


    
        return;
      };



  return (

    <Container>
    {isHighlightActive ? (
      // map through the two strings and render the highlighted character or regular character
      <>
        <StyledHeader>
          Text selected to practice
        </StyledHeader>

      <StyledCard>
            
         
          {para1.map((char, index) => {
            return wrongCharIndexes.has(index) ? (
              <span className="highlighted">{char}</span>
            ) : (
              <>{char}</>
            );
          })}
        
        </StyledCard>

        <StyledHeader>
          Your response
        </StyledHeader>

           <StyledCard>
           
          {para2.map((char, index) => {
            return wrongCharIndexes.has(index) ? (
              <span className="highlighted">{char}</span>
            ) : (
              <>{char}</>
            );
          })}
    </StyledCard>
    
    <StyledHeader>
          Score
        </StyledHeader>
  
    
    <StyledCard>
           Word Matches:  {wrongWordIndexes}
           </StyledCard>
           <StyledCard>         
           Key Strokes:  {charCount}
           </StyledCard>
           <StyledCard>      
           Gross WPM:  {gWPM}  WPM
           </StyledCard>
           <StyledCard>
         <div className ="col-xs-4 mt-5 mr-2">
           Net WPM:  {nWPM} WPM
         </div>
         <div className ="col-xs-4 mt-5 mr-2">
           Incorrect Char:  {inCorrectChar}
         </div>
         <div className ="col-xs-4 mt-5 mr-2">
           Accuracy:  {tAccrcy} %
         </div>
         <div className ="col-xs-4 mt-5 mr-2">
           CorrectChar:  {correctChar}
         </div>
         <div className ="col-xs-4 mt-5 mr-2">
           TotalChar: {charCount}
         </div>
     </StyledCard>

            </>
    ) : (
      
        <div className ="row">
         <div className ="col-xs-6 mt-5 mr-2">
        {para1}
        </div>
        <div className ="col-xs-6 mt-5 mr-2">
        {para2}
        </div>
        
      </div>

    )}
  </Container>
  );
};

export default ResultsModal;