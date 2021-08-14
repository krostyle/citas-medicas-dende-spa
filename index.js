const axios = require('axios');
const express = require('express');
const uuid = require('uuid');
const _ = require('lodash');
const moment = require('moment');
const chalk = require('chalk');

const dataUser = []

const instanceAxios = axios.create({
    baseURL: 'https://randomuser.me/api/',
});

const getUser = async() => {
    const { data } = await instanceAxios.get();
    const user = {
        id: uuid.v4(),
        name: data.results[0].name.first,
        last_name: data.results[0].name.last,
        registered: moment(data.results[0].registered.date).format('LLLL')
    }
    return user
}
app = express();

app.get('/add-user', async(req, res) => {
    const user = await getUser();
    console.log(user);
    res.send(`Usuario ${user.name} Agregado Correctamente`);
    console.log(`Usuario ${user.name} Agregado Correctamente`);
    dataUser.push(user);
});

app.get('/get-user', async(req, res) => {
    let data = ''

    _.forEach(dataUser, (user, i) => {
        data += `${i+1}. Nombre: ${(user.name)} -  Apellido: ${user.last_name} - ID : ${user.id} - TimeStamp : ${user.registered}<br>`
        console.log(chalk.blue.bgWhite(`${i+1}. Nombre: ${(user.name)} -  Apellido: ${user.last_name} - ID : ${user.id} - TimeStamp : ${user.registered}`));
    });
    res.send(data);

});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});