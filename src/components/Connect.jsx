import  { useState } from "react";

import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { PatternFormat } from "react-number-format";
import Axios from '../lib/axios'


const Connect = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({ name: "", phone: "", message: "" });

  const handleInputChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // JSON formatidagi ma'lumotlar
    const body = {
      name: data.name,
      phone: data.phone,
      message: data.message,
    };
  
    try {
      const response = await Axios.post(
        "application/send",
        JSON.stringify(body), 
        {
          headers: {
            "Content-Type": "application/json", // JSON format uchun header
          },
        }
      );
  
      if (response.status === 201) {
        toast.success(t("connect.success"));
        setData({ name: "", phone: "", message: "" });
      } else {
        throw new Error("Failed to send form data.");
      }
    } catch (error) {
      toast.error(t("connect.error"));
      console.log(error)
    }
  };
  


  return (
    <div
      id="connect"
      className="bg-white w-full md:h-[550px] lg:h-[600px] flex justify-center items-center"
    >
      <Toaster />
      <div className="w-[90%] h-[80%] flex flex-wrap justify-between">
        <div>
          <div className="md:mt-0 mt-8 h-full md:w-[500px]">
            <div className="w-full flex justify-end"></div>
            <h2 className="text-3xl text-center font-extrabold mb-2 text-blue-700">
              {t('connect.title')}
            </h2>
            <p className="text-lg mb-4">
             
              {t('connect.description')}

            </p>
            <form onSubmit={handleSubmit} method="post">
              <input
                placeholder={t('connect.placeholder.name')}
                className="h-[50px] w-full pl-5 pb-1 mb-10 items-center border-2 border-blue-900 rounded-[10px]"
                value={data.name}
                required
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
             <PatternFormat
                format="+998 ## ###-##-##"
                mask="_"
                placeholder={t("connect.placeholder.phone")}
                className="h-[50px] w-full pl-5 pb-1 mb-10 items-center border-2 border-blue-900 rounded-[10px]"
                required

                value={data.phone}
                onValueChange={(values) => handleInputChange("phone", values.value)}
              />

              <textarea
                placeholder={t('connect.placeholder.message')}
                name="message"
                className="h-[50px] w-full pl-5 pt-[10px] pb-1 mb-10 items-center border-2 border-blue-900 rounded-[10px]"
                value={data.message}
                required

                onChange={(e) => handleInputChange('message', e.target.value)}
              />

              <button
                type="submit"
                className="h-[50px] w-full pl-5 pb-1 items-center text-center text-lg text-white font-bold border-2 bg-blue-900 rounded-[10px]"
              >
                {t('connect.button')}
              </button>
            </form>
          </div>
        </div>
        <div className="w-full border-2 border-black md:border-o md:my-0 my-6 md:w-1/2 h-full rounded-[20px] overflow-hidden">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.5932881958515!2d69.30316248688548!3d41.25241641621109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae5fc23dbbb961%3A0x6ffc673d87ae391a!2zWWFuZ2kgUW8neWxpcSBrbydjaGFzaSAxNiwg0KLQvnNoa2VudCwgVG9zaGtlbnQsINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1sru!2s!4v1738042823969!5m2!1sru!2s" width="600" height="450"  allowfullscreen="" loading="lazy" ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Connect;
