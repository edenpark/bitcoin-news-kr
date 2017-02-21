const postsHelper = (() => {

    let postsRef, usersRef = null;

    let postsPerPage = 10;

    let data = {
        posts: [],
        currentPage: 1,
        nextPage: true
    };

    let postData = {
        post: {},
        // comments: []
    };

    return {
        // Initialize helpers
        initialize: (database) => {
            postsRef = database.ref('posts/');
            usersRef = database.ref('users/');
        },

        /* Find */
        getDefaultData() {
            return data;
        },

        async watchPosts(pageNum) {
            data.currentPage = pageNum;
            // +1 extra post to determine whether another page exists
            // const dataObj = await postsRef.orderByChild('note').limitToLast((data.currentPage * postsPerPage) + 1);
            //
            // console.log(dataObj);
            // dataObj.on('value', this.updatePosts);
            const returnedData = await postsRef.orderByChild('creatorUID').limitToLast((data.currentPage * postsPerPage) + 1).once('value');
            const postsData = await this.updatePosts(returnedData);
            return postsData
        },

        async watchPost(postId) {
            const returnPostData = await postsRef.child(postId).once('value')
            const postData = await this.updatePost(returnPostData)
            return postData
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

        stopWatchingPosts() {
            postsRef.off();
        },


        /* Create */
        create: (post) => {
            let newPostRef = postsRef.push(post, (error) => {
                if(error) {
                    console.log('createpost error: ', error);
                }

                let postId = newPostRef.key;

                usersRef.child(`${post.creatorUID}/posts/${postId}`).set(true);
            });

        }
    }

})();

export default postsHelper;
