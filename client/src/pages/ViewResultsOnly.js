import React, { useState,useEffect } from 'react';
import { Container } from  '../components/styles/Container';
import { StyledCard } from '../components/styles/Card';
import { Flex } from'../components/styles/Flex';
import { StyledHeader } from '../components/styles/Header';

import { UList} from '../components/styles/List';

const ViewResults = () =>{
return(

<>
<Container>
    <Flex>
<StyledCard>
<StyledHeader>
Nice try! Keep practicing. 
</StyledHeader>
<UList>
    <li>
For more practice, click  Select Texts
</li>
<li>
To Return to Home Page, click Home
</li>
<li>
To look at your progress, click Achievement board
</li>

</UList>

</StyledCard>
</Flex>
</Container>
</>

)


}


export default ViewResults;