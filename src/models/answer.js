module.exports = (sequelize, DataTypes) => sequelize.define(
    'Answer',
    {
      body: DataTypes.TEXT,
    },
  );