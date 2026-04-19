import { Model, DataTypes} from 'sequelize';
import sequelize from '../db/client.js';


class Likes extends Model{}

Likes.init(
    {
        recipe_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },
    {
        sequelize,
        modelName:"likes",
        tableName: "likes"
      }
);

export default Likes;