const jsSha = require('jssha');

const SALT = process.env.MY_ENV_VAR || 'bugs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    const user1Sha = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });
    user1Sha.update(`user1-${SALT}`);

    const user2Sha = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });
    user2Sha.update(`user2-${SALT}`);

    const usersList = [
      {
        email: 'user1',
        password: user1Sha.getHash('HEX'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'user2',
        password: user2Sha.getHash('HEX'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', usersList);

    await queryInterface.addColumn('bugs', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    });

    await queryInterface.sequelize.query('UPDATE bugs SET user_id = 1');
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('bugs', 'user_id');
    await queryInterface.dropTable('users');
  },
};
