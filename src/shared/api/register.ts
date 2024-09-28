import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {CurrentValues} from "../types/register/types.ts";

const api = axios.create();
const mock = new MockAdapter(api);
const data = [
    {
        "type": "string",
        "label": "Ваш ФИО",
        "required": true,
        "name": "name"
    },
    {
        "type": "email",
        "label": "Ваш email",
        "name": "email"
    },
    {
        "type": "password",
        "label": "Ваш пароль",
        "name": "password1",
        "required": true,
    },
    {
        "type":"password",
        "label":'Повторите пароль',
        "name":"password2",
        "required": true,
    },
    {
        "type": "select",
        "label": "Выберите пункт из списка",
        "name": "select1",
        "required":true,
        "placeholder": "Выбор",
        "options": [
            { title: "Выбор1", value: "Выбор1" },
            { title: "Выбор2", value: "Выбор2" }
        ]
    }
    // {
    //     "type":"phone",
    //     "label":'Телефон',
    //     "name":"phone",
    //     "required": true,
    // },
]

const withDelay = <T>(delay: number, response: T): (() => Promise<T>) => {
    return (): Promise<T> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, delay);
        });
    };
}
mock.onGet('/api/form').reply(withDelay(1000,[200,data]))
mock.onPost('/api/auth').reply(function(config) {
    const { data} = config
    const parsedData = JSON.parse(data)
    return new Promise(function(resolve,) {
        setTimeout(function() {
            if(parsedData.email.length < 10) resolve([402, `Ошибка, ${parsedData.email} должен быть больше 10 символов!`])
            resolve([200,parsedData])
        }, 2000);
    });
});
export const getFormData = () => api.get('/api/form');
export const postFormData = (data:CurrentValues) => api.post('/api/auth',data);