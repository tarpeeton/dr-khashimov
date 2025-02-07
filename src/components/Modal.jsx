import { useState } from "react";
import ReactDOM from "react-dom";
import toast, { Toaster } from 'react-hot-toast';
import Axios from "../lib/axios"; 
import { useTranslation } from 'react-i18next';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const Modal = ({ closeModal }) => {
  const { t } = useTranslation();
  const [data, setData] = useState({ name: "", phone: "", message: "" , countryCode: "" });

  const handleInputChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: data.name,
      phone: `${data.phone}`, 
      message: data.message,
    };
    console.log(body , "")
    try {
      const response = await Axios.post("application/send", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  const handlePhoneChange = (value, country) => {
    setData((prevData) => ({
      ...prevData,
      phone: value,
      countryCode: `+${country.name}`,
    }));
  };




  return ReactDOM.createPortal(
    <div
      id="modal"
      className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-white bg-opacity-80 backdrop-blur"
    >
      <Toaster />
      <div className="h-[70%] w-[400px]">
        <div className="w-full flex justify-end">
          <button
            onClick={closeModal}
            className="font-extrabold text-3xl text-blue-700 h-[40px] w-[40px]"
          >
            X
          </button>
        </div>
        <h2 className="text-3xl text-center font-extrabold mb-2 text-blue-700">
          {t('connect.title')}
        </h2>
        <p className="text-lg mb-4">
         
          {t('connect_modal_description')}
        </p>
        <form onSubmit={handleSubmit} method="post">
        <input
                placeholder={t('connect.placeholder.name')}
                className="h-[50px] w-full pl-5 pb-1 mb-10 items-center border-2 border-blue-900 rounded-[10px]"
                required
                value={data.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
           <PhoneInput
                    country={'us'}
                    placeholder="+7 (999) 999-99-99"
                    inputClass="w-full "
                    value={data.phone}
                    onChange={handlePhoneChange}

                    containerClass="w-full rounded-lg  mb-10 border-2 border-blue-900  "
                    inputStyle={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                    }}
                  />

<textarea
                placeholder={t('connect.placeholder.message')}
                name="message"
                required

                className="h-[50px] w-full pl-5 pt-[10px] pb-1 mb-10 items-center border-2 border-blue-900 rounded-[10px]"
                value={data.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />

          <button
            type="submit"
            className="h-[50px] w-full pl-5 pb-1 items-center text-center text-lg text-white font-bold border-2 bg-blue-900 rounded-[10px]"
          >
            {t("connect.button")}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
