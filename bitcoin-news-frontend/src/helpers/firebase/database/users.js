const usersHelper = (() => {

    let users = null;

    return {
        // Initialize helpers
        initialize: (database) => {
            users = database.ref('users/');
        },

        /* Find */
        findProfileById: (uid) => {
            return users.child('profiles').child(uid).once('value');
        },

        findProfileByIdSync: (uid, callback) => {
            const ref = users.child('profiles').child(uid);
            ref.on('value', callback)
            return ref;
        },

        findSettingById: (uid) => {
            return users.child('settings').child(uid).once('value');
        },

        findSettingByUsername: (username) => {
            return users.child('settings').orderByChild('username')
                                        .equalTo(username)
                                        .once('child_added');
        },

        checkUsername: async (username) => {
            const data = await users.child('usernames').child(username).once('value');
            return { available: !data.exists() };
        },

        /* Update */

        /* Create */
        claimUsername: ({uid, username}) => {
            return users.child('usernames').child(username).set(uid);
        },

        create: ({uid, username, displayName, email, thumbnail}) => {
            const profiles = users.child('profiles').child(uid).set({
                username,
                displayName,
                thumbnail: 'https://firebasestorage.googleapis.com/v0/b/bitcoin-news-kr.appspot.com/o/static%2FBNK_user_icon.jpg?alt=media&token=c6ec960c-596f-4e3c-976e-366af723b4f6',
            });

            const settings = users.child('settings').child(uid).set({
                email
            });

            return Promise.all([profiles, settings, username]);

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
