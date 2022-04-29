const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
    },
    // id_Api: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      //type: DataTypes.DATEONLY,
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DECIMAL,
    },
    platforms: {
      //type: DataTypes.STRING,
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{
    timestamps: false,
  });
};
