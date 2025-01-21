import { BrowserRouter } from 'react-router-dom';

import  { useEffect } from 'react';
import Banner from './components/Banner';
import StepScrollComponent from './components/StepScrollComponent';
import Info from './components/Info';
import Specialization from './components/Specialization';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Connect from './components/Connect';
import Footer from './components/Footer';
import './i18n/i18n'; 
import { useTranslation } from 'react-i18next';
import {getLanguageFromStorageOrCookie} from './hook/getLocaleFromStorage'
import Axios from './lib/axios';


export const App = () => {
  const { i18n } = useTranslation();

  

  useEffect(() => {
    const pathLang = window.location.pathname.split('/')[1];
    const storageLang = getLanguageFromStorageOrCookie();
  
    if (!['uz', 'ru'].includes(pathLang)) {
      if (pathLang !== storageLang) {
        window.location.pathname = `/${storageLang}/`;
      }
    } else if (i18n.language !== pathLang) {
      i18n.changeLanguage(pathLang);
    }
  }, []); 
  

  useEffect(() => {
    const recordVisit = async () => {
      try {
         await Axios.post('counter/add?button=VISIT');
      } catch (error) {
        console.error('Error recording visit:', error);
      }
    };

    recordVisit();
  }, []);
 


  return (
    <BrowserRouter>
     <div className="App">
      <Banner />
      <StepScrollComponent />
      <Info />
      <Specialization />
      <Services />
      <Reviews />
      <Connect />
      <Footer />
    </div>
    </BrowserRouter>
   
  );
}

