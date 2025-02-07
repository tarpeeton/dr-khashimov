import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Axios from "../lib/axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Connect = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({ name: "", phone: "", message: "" , countryCode: ""  });

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
    

    console.log(body , 'sss')
   

    try {
      const response = await Axios.post("application/send", JSON.stringify(body), {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        toast.success(t("connect.success"));
        setData({ name: "", phone: "", message: "" });
      } else {
        throw new Error("Failed to send form data.");
      }
    } catch (error) {
      toast.error(t("connect.error"));
      console.error(error);
    }
  };


  const handlePhoneChange = (value, country) => {
    setData((prevData) => ({
      ...prevData,
      phone: value,
      countryCode: `+${country.name}`,
    }));
  };

  return (
    <div id="connect" className="bg-white w-full flex justify-center items-center py-10">
      <Toaster />
      <div className="w-[90%] max-w-2xl">
        <h2 className="text-3xl text-center font-extrabold mb-2 text-blue-700">
          {t("connect.title")}
        </h2>
        <p className="text-lg mb-4">{t("connect.description")}</p>

        <form onSubmit={handleSubmit} method="post">
          <input
            placeholder={t("connect.placeholder.name")}
            className="h-[50px] w-full pl-5 mb-4 border-2 border-blue-900 rounded-lg"
            value={data.name}
            required
            onChange={(e) => handleInputChange("name", e.target.value)}
          />

                  <PhoneInput
                    country={'us'}
                    placeholder="+7 (999) 999-99-99"
                    inputClass="w-full "
                    value={data.phone}
                    onChange={handlePhoneChange}

                    containerClass="w-full rounded-lg mb-4 border-2 border-blue-900  "
                    inputStyle={{
                      width: '100%',
                      height: '42px',
                      borderRadius: '8px',
                    }}
                  />
                  
         

          <textarea
            placeholder={t("connect.placeholder.message")}
            name="message"
            className="h-[80px] w-full pl-5 pt-2 mb-4 border-2 border-blue-900 rounded-lg"
            value={data.message}
            required
            onChange={(e) => handleInputChange("message", e.target.value)}
          />

          <button
            type="submit"
            className="h-[50px] w-full text-lg text-white font-bold bg-blue-900 rounded-lg"
          >
            {t("connect.button")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Connect;
