import { Model, DataTypes} from 'sequelize';
import sequelize from '../db/client.js';


class Comment extends Model{}

Comment.init(
    {
        content:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        note:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        recipe_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        parent_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
        }
    },
    {
        sequelize,
        modelName:"comment",
        tableName: "comment",
        underscored: true,
      }
);

export default Comment;