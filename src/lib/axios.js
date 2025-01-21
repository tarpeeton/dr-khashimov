import axios from "axios";
import DOMPurify from "dompurify";

// Лимиты запросов
const DAILY_LIMIT_VISIT = 10;
const DAILY_LIMIT_APPLICATION = 3;

// Функция для получения или создания уникального идентификатора устройства
const getDeviceId = () => {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = `device-${Date.now()}-${Math.random()}`;
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
};

// Функция для получения текущего состояния запросов
const getRequestState = () => {
  const deviceId = getDeviceId();
  const state = JSON.parse(localStorage.getItem("requestState")) || {};
  if (!state[deviceId]) {
    state[deviceId] = {};
  }
  return { state, deviceId };
};

// Функция для обновления состояния запросов в localStorage
const updateRequestState = (deviceId, endpoint, count, date) => {
  const state = JSON.parse(localStorage.getItem("requestState")) || {};
  if (!state[deviceId]) {
    state[deviceId] = {};
  }
  state[deviceId][endpoint] = { count, lastRequestDate: date };
  localStorage.setItem("requestState", JSON.stringify(state));
};

// Функция для очистки URL
const sanitizeUrl = (url) => DOMPurify.sanitize(url);

// Создание экземпляра Axios
const Axios = axios.create({
  baseURL: sanitizeUrl("https://pmc-test.mrjtrade.uz/api/"),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Интерцептор запросов
Axios.interceptors.request.use(
  (config) => {
    const { state, deviceId } = getRequestState();
    const today = new Date().toISOString().split("T")[0];

    // Проверка лимита для "counter/add?button=VISIT"
    if (config.url.includes("counter/add?button=VISIT")) {
      const endpoint = "counter/add?button=VISIT";
      const requestInfo = state[deviceId][endpoint] || { count: 0, lastRequestDate: null };

      if (requestInfo.lastRequestDate === today) {
        if (requestInfo.count >= DAILY_LIMIT_VISIT) {
          return Promise.reject({
            message: `Siz bugungi kun uchun ${DAILY_LIMIT_VISIT} marta so'rov yuborishingiz mumkin.`,
          });
        }
      } else {
        // Сброс счётчика для нового дня
        requestInfo.count = 0;
        requestInfo.lastRequestDate = today;
      }

      // Увеличиваем счётчик запросов
      requestInfo.count += 1;
      updateRequestState(deviceId, endpoint, requestInfo.count, today);
    }

    // Проверка лимита для "application/send"
    if (config.url.includes("application/send")) {
      const endpoint = "application/send";
      const requestInfo = state[deviceId][endpoint] || { count: 0, lastRequestDate: null };

      if (requestInfo.lastRequestDate === today) {
        if (requestInfo.count >= DAILY_LIMIT_APPLICATION) {
          return Promise.reject({
            message: `Siz bugungi kun uchun ${DAILY_LIMIT_APPLICATION} marta so'rov yuborishingiz mumkin.`,
          });
        }
      } else {
        // Сброс счётчика для нового дня
        requestInfo.count = 0;
        requestInfo.lastRequestDate = today;
      }

      // Увеличиваем счётчик запросов
      requestInfo.count += 1;
      updateRequestState(deviceId, endpoint, requestInfo.count, today);
    }

    // Добавляем авторизационный ключ в заголовки
    config.headers["auth-key"] = "dcs54csdf8wefsf45232r!sd5af?dff8w7fw8efwefwef8";

    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор ответов
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: DOMPurify.sanitize(error.response.data?.message || "Xatolik yuz berdi."),
        ...DOMPurify.sanitize(error.response.data),
      });
    }

    return Promise.reject({
      message: "Tarmoq xatosi yoki server javob bermadi.",
    });
  }
);

export default Axios;
