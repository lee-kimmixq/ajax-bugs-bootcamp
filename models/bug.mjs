export default function initBugModel(sequelize, DataTypes) {
  return sequelize.define(
    'bug',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      problem: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      errorText: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      commit: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      featureId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'features',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      underscored: true,
    },
  );
}
