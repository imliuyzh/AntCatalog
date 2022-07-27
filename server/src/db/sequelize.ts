import { OPEN_READONLY } from 'sqlite3';
import { Sequelize } from 'sequelize';

// Database connection specifications
const sequelize: Sequelize = new Sequelize('sqlite:./src/db/data.db', {
    define: {
        freezeTableName: true,
        timestamps: false
    },
    dialectOptions: { mode: OPEN_READONLY },
    logging: false,
    pool: {
        max: 100,
        min: 30,
        acquire: 10000,
        idle: 10000
    }
});

export default sequelize;
