import { useState, useRef, useEffect } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import gsap from "gsap";
import Serdce from "../assets/serdce.png";
import LikeStep from "../assets/like-step.png";
import GradCap from "../assets/grad-cap.png";
import { useTranslation } from 'react-i18next';

export default function ProgressMobileStepper() {
  const {t} = useTranslation();

  const [activeStep, setActiveStep] = useState(0);
  const contentRef = useRef();
  const maxSteps = 4; 

  const handleStep = (step) => () => {
    setActiveStep(step);
  };



  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          // ease: "",
        }
      );
    }
  }, [activeStep]);


  
  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div
            className="relative -top-[100px] h-[400px] max-w-[950px] flex justify-between"
            id="content1"
          >
            <div className="h-[100px] md:h-full w-[200px] md:w-[350px] flex justify-center items-center">
              <div>
                <ol className="list-disc leading-1  text-gray-200 text-[10px] md:text-xl">
                  <li className="md:mb-3">
                    {t("achievements.1")}
                  </li>
                  <li className="md:mb-3">
                    {t("achievements.2")}
                  </li>
                  <li>
                    {t("achievements.3")}
                  </li>
                </ol>
              </div>
            </div>
            <div className="max-h-[200px] md:h-full md:w-auto">
              <img
                className="relative md:-top-20 md:-right-20 w-[100px] md:w-full"
                src={Serdce}
                alt='serdce'
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div
            className="relative -top-[100px] lg:mt-[100px] h-[400px] max-w-[950px] flex justify-between"
            id="content2"
          >
            <div className="h-[100px] md:h-full w-[200px] md:w-[350px] flex justify-center items-center">
              <div>
                <ol className="list-decimal leading-1 md:text-xl lg:text-[18px] text-gray-200 text-[10px] ">
                  <li className="md:mb-3">
                   
                    {t('experience.1')}
                  </li>
                  <li className="md:mb-3">
                   
                    {t('experience.2')}

                  </li>
                  <li className="md:mb-3">
                    
                    {t('experience.3')}

                  </li>
                  <li>
                    {t('experience.4')}
                  </li>
                  <li>
                    {t('experience.5')}
                  </li>
                </ol>
              </div>
            </div>
            <div className="max-h-[200px] md:h-full md:w-auto">
              <img
                className="relative md:-top-20 md:-right-20 w-[100px] md:w-full"
                src={LikeStep}
                alt='like'
              />
            </div>
          </div>
        );
        case 2:
          return (
            <div
              className="relative -top-[100px] h-[400px] lg:mt-[20px] max-w-[950px] flex justify-between"
              id="content3"
            >
              <div className="h-[100px] md:h-full w-[200px] md:w-[350px] flex justify-center items-center">
                <div>
                  <ol className="list-disc leading-1 text-gray-200 text-[10px] md:text-xl">
                    <li className="md:mb-3">
                      
                      {t('education.1')}
                    </li>
                    <li className="md:mb-3">
                     
                      {t('education.2')}
                    </li>
                    <li>{t('education.3')}</li>
                  </ol>
                </div>
              </div>
              <div className="max-h-[200px] md:h-full md:w-auto">
                <img
                  className="relative md:-top-20 md:-right-20 w-[100px] md:w-full"
                  src={GradCap}
                  alt='grad'
                />
              </div>
            </div>
          );
      case 3:
        return (
          <div
            className="relative  flex justify-between"
            id="content3"
          >
            <div className="h-[100px] md:h-full w-[200px] md:w-[350px] flex justify-center items-center">
              <div>
                <ol className="list-disc leading-1 text-gray-200 text-[10px] md:text-[18px]">
                  <li className="md:mb-2">
                    {t('stajirofkaData.1')}
                  </li>
                  <li className="md:mb-2">
                    {t('stajirofkaData.2')}
                  </li>
                  <li>{t('stajirofkaData.3')}</li>
                  <li>{t('stajirofkaData.4')}</li>
                  <li>{t('stajirofkaData.5')}</li>
                  <li>{t('stajirofkaData.6')}</li>
                  <li>{t('stajirofkaData.7')}</li>
                  <li>{t('stajirofkaData.8')}</li>
                </ol>
              </div>
            </div>
            <div className="max-h-[200px] md:h-full md:w-auto">
              <img
                className="relative md:-top-20 md:-right-20 w-[100px] md:w-full"
                src={GradCap}
                alt='grad'
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className=" w-full relative h-[650px] lg:h-[1200px] flex-col bg-customBlue flex justify-start items-center shadow-md"
      style={{ boxShadow: "0px -31px 40px 4px rgba(0,73,150,0.77)" }}
    >
      <div className=" w-full bg-customBlue lg:mt-[20px] flex justify-center  items-center">
        <div className="flex flex-col justify-center mt-[20px] items-center w-full px-4">
          <MobileStepper
            variant="progress"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              width: "150%",
              flexGrow: 1,
              backgroundColor: "transparent",
              flexDirection: "column",
              "& .MuiLinearProgress-barColorPrimary": {
                backgroundColor: "#777676",
              },
              "& .MuiMobileStepper-dot": {
                backgroundColor: "black", // Задает цвет неактивных точек
              },
              "& .MuiMobileStepper-dotActive": {
                backgroundColor: "white", // Задает цвет активной точки
              },
              "@media (max-width: 768px)": {
                display: "none",
              },
            }} // Установка фона лоадера в прозрачный
            classes={{
              root: "w-full",
              dot: "bg-white",
              dotActive: "bg-sky-200",
            }} // Кастомные классы для точек лоадера
          />
          <div className=" relative  md:top-0 flex justify-around w-full text-center">
            {" "}
            {/* Установка ширины на 100% и центрирование текста */}
            <Button
              onClick={handleStep(0)}
              sx={{
                fontSize: "16px",
                color: "white",
                "@media (max-width:600px)": {
                  fontSize: "8px", // размер шрифта для экранов шире 600px
                },
              }}
              className={`flex flex-col w-10 md:text-xl text-[8px] gap-[10px] leading-5 md:leading-8 md:-top-[43px] lg:left-[50px] ${
                activeStep === 0 ? "text-white" : "text-gray-500"
              }`}
            >
              <div className="hidden md:block">
                <svg
                  width="26"
                  height="23"
                  viewBox="0 0 26 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 23L25.9904 0.5H0.00961876L13 23Z"
                    fill={`${activeStep === 0 ? "#fff" : "#8E8D8D"}`}
                  />
                </svg>
              </div>
               {t('my_achievements')}
            </Button>
            <Button
              onClick={handleStep(1)}
              sx={{
                fontSize: "16px",
                color: "white",
                "@media (max-width:600px)": {
                  fontSize: "8px", // размер шрифта для экранов шире 600px
                },
              }}
              className={`flex flex-col w-10 md:text-xl text-[8px] leading-5 md:leading-8 gap-[10px]  md:-top-[43px] lg:left-[20px] ${
                activeStep === 1 ? "text-white" : "text-gray-500"
              }`}
            >
              <div className="hidden md:block">
                <svg
                  width="26"
                  height="23"
                  viewBox="0 0 26 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 23L25.9904 0.5H0.00961876L13 23Z"
                    fill={`${activeStep === 1 ? "#fff" : "#8E8D8D"}`}
                  />
                </svg>
              </div>
              
              {t('work_experience')}
            </Button>
            <Button
              onClick={handleStep(2)}
              sx={{
                fontSize: "16px",
                color: "white",
                "@media (max-width:600px)": {
                  fontSize: "8px", // размер шрифта для экранов шире 600px
                },
              }}
              className={`flex flex-col w-10 md:text-xl text-[8px] leading-5 gap-[10px]  md:leading-8 md:-top-[55px] lg:left-[20px] ${
                activeStep === 2 ? "text-white" : "text-gray-500"
              }`}
            >
              <div className="hidden md:block">
                <svg
                  width="26"
                  height="23"
                  viewBox="0 0 26 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 23L25.9904 0.5H0.00961876L13 23Z"
                    fill={`${activeStep === 2 ? "#fff" : "#8E8D8D"}`}
                  />
                </svg>
              </div>
              
              {t('education.title')}
            </Button>
            <Button
              onClick={handleStep(3)}
              sx={{
                fontSize: "16px",
                color: "white",
                "@media (max-width:600px)": {
                  fontSize: "8px", // размер шрифта для экранов шире 600px
                },
              }}
              className={`flex flex-col w-10 md:text-xl text-[8px] leading-5 md:leading-8 gap-[10px] md:-top-[55px] right-0 lg:right-[10px] ${
                activeStep === 3 ? "text-white" : "text-gray-500"
              }`}
            >
              <div className="hidden md:block">
                <svg
                  width="26"
                  height="23"
                  viewBox="0 0 26 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 23L25.9904 0.5H0.00961876L13 23Z"
                    fill={`${activeStep === 3 ? "#fff" : "#8E8D8D"}`}
                  />
                </svg>
              </div>
              
              {t('stajirofka')}
            </Button>
          </div>
        </div>
      </div>

      <div className="relative mt-[200px]  md:mt-[100px]" ref={contentRef}>
        {renderContent()}
      </div>
    </div>
  );
}
