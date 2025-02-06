import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Banner from "./components/Banner";
import StepScrollComponent from "./components/StepScrollComponent";
import Info from "./components/Info";
import Specialization from "./components/Specialization";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import Connect from "./components/Connect";
import Footer from "./components/Footer";
import "./i18n/i18n";
import { getLanguageFromStorageOrCookie } from "./hook/getLocaleFromStorage";
import Axios from "./lib/axios";

export const App = () => {
  const { i18n } = useTranslation();

  const seoText = {
    uz: {
      title: "Kardioxirurg Hashimov Hayrullo | xalqaro darajadagi mutaxassis",
      description:
        "Kardioxirurg Hashimov Hayrullo Rahmatullaevich — koronarografiya, aortal klapan almashinuvi va IYB davolash bo‘yicha ekspert. Toshkentning eng yaxshi kardio markazlarida konsultatsiya va operatsiyalar. Xizmatlar narxini bilib oling: EKG, AKSh, annuloplastika. Yurak salomatligi — ishonchli qo‘llarda.",
      phone: "+998 33 303 77 99",
      address: "Toshkent shahri, Mirobod tumani, 5-uy",
    },
    ru: {
      title: "Кардиохирург Хашимов Хайрулло | специалист международного уровня",
      description:
        "Кардиохирург Хашимов Хайрулло Рахматуллаевич — эксперт в коронарографии, замене аортального клапана и лечении ИБС. Консультации и операции в лучших кардиоцентрах Ташкента. Узнайте стоимость услуг: ЭКГ, АКШ, аннулопластика. Здоровье сердца — в надежных руках.",
      phone: "+998 33 303 77 99",
      address: "г. Ташкент, Мирабадский район, дом 5",
    },
  };
  

  useEffect(() => {
    const pathLang = window.location.pathname.split("/")[1];
    const storageLang = getLanguageFromStorageOrCookie();

    if (!["uz", "ru"].includes(pathLang)) {
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
        await Axios.post("counter/add?button=VISIT");
      } catch (error) {
        console.error("Error recording visit:", error);
      }
    };

    recordVisit();
  }, []);

  const currentLang = i18n.language || "uz";
  const currentSEO = seoText[currentLang] || seoText.uz;

  return (
    <BrowserRouter>
      <Helmet>
        <title>{currentSEO.title}</title>
        <meta name="description" content={currentSEO.description} />
        <meta name="phone" content={currentSEO.phone} />
        <meta name="address" content={currentSEO.address} />
      </Helmet>
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
};
