module.exports = (sequelize, DataTypes) => sequelize.define(
    'Question',
    {
      body: DataTypes.TEXT,
      user: DataTypes.INTEGER
    },
  );
  