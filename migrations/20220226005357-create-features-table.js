module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('features', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
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

    const featuresList = [
      {
        name: 'login',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'gameplay',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'store',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('features', featuresList);

    await queryInterface.addColumn('bugs', 'feature_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'features',
        key: 'id',
      },
    });

    await queryInterface.sequelize.query('UPDATE bugs SET feature_id = 1');
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('bugs', 'feature_id');
    await queryInterface.dropTable('features');
  },
};
