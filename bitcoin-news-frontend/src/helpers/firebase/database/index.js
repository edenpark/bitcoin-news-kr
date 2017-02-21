import users from './users';
import posts from './posts';

// Modulize
const databaseHelper = (() => {
    return {
        initialize: (database) => {
            // Initialize each database helpers
            users.initialize(database);
            posts.initialize(database);
        }
    }
})();

export default databaseHelper;
