import  { useEffect } from 'react';
import Section1 from './components/Section1';
import StepScrollComponent from './components/StepScrollComponent';
import Section3 from './components/Section3';
import Specialization from './components/Specialization';
import Services from './components/Services';
import Otzivi from './components/Otzivi';
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
         const res = await Axios.post('counter/add?button=VISIT');
         console.log(res)
      } catch (error) {
        console.error('Error recording visit:', error);
      }
    };

    recordVisit();
  }, []);
 


  return (
    <div className="App">
      <Section1 />
      <StepScrollComponent />
      <Section3 />
      <Specialization />
      <Services />
      <Otzivi />
      <Connect />
      <Footer />
    </div>
  );
}

