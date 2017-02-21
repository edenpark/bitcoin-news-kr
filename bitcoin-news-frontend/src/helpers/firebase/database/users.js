const usersHelper = (() => {

    let users = null;

    return {
        // Initialize helpers
        initialize: (database) => {
            users = database.ref('users/');
        },

        /* Find */
        findProfileById: (uid) => {
            return users.child(uid).child('profile').once('value');
        },

        findProfileByIdSync: (uid, callback) => {
            const ref = users.child(uid).child('profile');
            ref.on('value', callback)
            return ref;
        },

        checkUsername: async (username) => {
            // const data = await users.child('usernames').child(username).once('value');
            const data = await users.orderByChild('usernames').equalTo(username).once('value');
            return { available: !data.exists() };
        },

        /* Update */

        /* Create */
        create: ({uid, username, displayName, email, thumbnail}) => {
            const profile = users.child(uid).child('profile').set({
                username,
                displayName,
                thumbnail: thumbnail || 'https://firebasestorage.googleapis.com/v0/b/bitcoin-news-kr.appspot.com/o/static%2FBNK_user_icon.jpg?alt=media&token=c6ec960c-596f-4e3c-976e-366af723b4f6',
            });

            const setting = users.child(uid).child('setting').set({
                email
            });

            return Promise.all([profile, setting]);

        }
    }

})();

export default usersHelper;

// import * as firebase from 'firebase';
// export function findUserById(uid) {
//     return firebase.database().ref('/users/' + uid).once('value');
// }
//
// export function findUserByUsername(username) {
//     const usersRef = firebase.database().ref('/users/');
//     return usersRef.orderByChild('username').equalTo(username).once('child_added')
// }
//
// export function createUserData({uid, email}) {
//     return firebase.database().ref('users/' + uid).set({
//         email,
//     });
// }
//
// // export function updateProviderData({uid, providerData}) {
// //     const updates = {
// //         ['users/' + uid + '/providerData']: providerData
// //     };
// //     return firebase.database().ref().update(updates);
// // }
