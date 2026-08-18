import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';

export class User extends Model {
    // ! -> para não ser obrigada a declarar algo
    // iniciar sem ter nada na variavel
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha_hash!: string;
    // campos de controle
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        senha_hash: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true
    }
);