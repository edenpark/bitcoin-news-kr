import users from './users';
import posts from './posts';
import comments from './comments';
import profile from './profile';

// Modulize
const databaseHelper = (() => {
    return {
        initialize: (database) => {
            // Initialize each database helpers
            users.initialize(database);
            posts.initialize(database);
            comments.initialize(database);
            profile.initialize(database);
        }
    }
})();

export default databaseHelper;
