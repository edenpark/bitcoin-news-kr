const postsHelper = (() => {

    let postsRef, usersRef, commentsRef = null;

    let postsPerPage = 10;

    let data = {
        posts: [],
        currentPage: 1,
        nextPage: true
    };

    let postData = {
        post: {},
        comments: []
    };

    return {
        // Initialize helpers
        initialize: (database) => {
            postsRef = database.ref('posts/');
            usersRef = database.ref('users/');
            commentsRef = database.ref('comments/');
        },

        /* Find */
        getDefaultData() {
            return data;
        },

        async watchPosts(pageNum) {
            data.currentPage = pageNum;

            // +1 extra post to determine whether another page exists
            const returnedData = await postsRef.orderByChild('isDeleted').equalTo(null).limitToLast((data.currentPage * postsPerPage) + 1).once('value');

            if(returnedData) {
                const watchPosts = await this.updatePosts(returnedData);

                return watchPosts
            }

            return false
        },

        stopWatchingPosts() {
            postsRef.off();
        },

        async watchPost(postId) {
            const returnPostData = await postsRef.child(postId).once('value');

            if(returnPostData.val()) {
                let watchPostData = await this.updatePost(returnPostData);

                const returnCommentsData = await commentsRef.orderByChild('postId')
                .equalTo(postId)
                .once('value');

                watchPostData = await this.updateComments(returnCommentsData);

                return watchPostData
            }

            return false
        },

        /* Update */
        updatePosts(postDataObj) {
            // newPosts will be all posts through current page + 1
            let endAt = data.currentPage * postsPerPage;

            // add posts to new array
            let newPosts = [];
            postDataObj.forEach(postData => {
                let post = postData.val();
                post.id = postData.key;
                newPosts.unshift(post);
            });

            // if extra post doesn't exist, indicate that there are no more posts
            data.nextPage = (newPosts.length === endAt + 1);

            // slice off extra post
            data.posts = newPosts.slice(0, endAt);

            return data;
        },

        updatePost(postDataObj) {
            let post = postDataObj.val();

            if (!post) {
                // post doesn't exist
                postData.post = null;
            } else {
                post.id = postDataObj.key;
                postData.post = post;
            }

            return postData;
        },

        updateComments(commentDataobj) {
            let newComments = [];

            commentDataobj.forEach(commentData => {
                let comment = commentData.val();
                comment.id = commentData.key;
                newComments.unshift(comment);
            });

            postData.comments = newComments;
            return postData;
        },

        /* Delete */
        delete: (post) => {
            console.log(post);
            postsRef.child(post.id).set({isDeleted: true}, (error) => {
                if(error) { return; }

                // Delete commentId from user profile
                usersRef.child(`${post.creatorUID}/profile/submitted/${post.id}`).remove();
            });
        },

        /* Create */
        create: (post) => {
            let newPostRef = postsRef.push(post, (error) => {
                if(error) {
                    console.log('createpost error: ', error);
                }

                let postId = newPostRef.key;

                usersRef.child(`${post.creatorUID}/profile/submitted/${postId}`).set(true);
            });

        }
    }

})();

export default postsHelper;
