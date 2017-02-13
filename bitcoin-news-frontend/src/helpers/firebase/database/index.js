import users from './users';

// Modulize
const databaseHelper = (() => {
    return {
        initialize: (database) => {
            // Initialize each database helpers
            users.initialize(database);
        }
    }
})();

export default databaseHelper;
