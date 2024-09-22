import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const api = axios.create();
const mock = new MockAdapter(api);

mock.onGet('/api/form').reply(200, [
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
]);

export const getFormData = () => api.get('/api/form');