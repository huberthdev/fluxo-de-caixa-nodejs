const Sequelize = require('sequelize');

const sequelize = new Sequelize('fluxo_de_caixa_nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexão bem-sucedida!');
    })
    .catch((err) => {
        console.error('Não foi possível conectar ao banco de dados:', err);
});

module.exports = sequelize;
