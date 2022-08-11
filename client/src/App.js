import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import SearchPassage from './pages/SearchPassage';
import SearchPassage from './pages/SearchPassageN';
import SavedProgress from './pages/SavedProgress';
import SelectParagraph from './pages/SelectParagraph';
import Donation from './pages/DonationPage';
import ResultsModal from './pages/ViewResultsModal';
import AchievementModal from './pages/UserAchievement';
import Navbar from './components/Navbar';
import Home from './components/HomePage'

import { ThemeProvider } from 'styled-components'
import Header from './components/styles/Header'
import Footer from './components/styles/Header'
import Card from './components/styles/Header'
import { Container } from './components/styles/Header'
import GlobalStyles from  './components/styles/Header'

const httpLink = createHttpLink({
  uri: '/graphql',
});


const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#003333',
  },
  mobile: '768px',
}
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {

    return (

  
      <ApolloProvider client={client}>      
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route 
              path='/search' 
              element={<SelectParagraph />} 
            />
              <Route 
              //path='/search/:id' 
              path='/starttyping' 
              element={<SearchPassage />} 
            />
            <Route 
              path='/saved' 
              element={<SavedProgress />} 
            />
            <Route 
              path='/achievement' 
              element={<AchievementModal />} 
            />
              <Route 
              path='/donate' 
              element={<Donation/>} 
            />
         
            <Route  path='*'
           element={<Home />} 
           //  element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
      </ApolloProvider>
      
    );
  }
  
  export default App;