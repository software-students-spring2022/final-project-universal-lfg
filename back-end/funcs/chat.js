function createPostLobby(client, user, post){
    return new Promise(async function(resolve, reject){
        try {
            let userId = user._id.toString();
            let channelId = post._id.toString();
            console.log('User: ' + userId)
            console.log('ChannelID' + channelId)
            let newChannel = await client.channel('messaging', channelId, {
                name: post.title,
                members: [userId],
                created_by_id: userId
            })
            await newChannel.create()
            await newChannel.assignRoles([{user_id: userId, channel_role:"channel_moderator"}])
            resolve(channelId)
        } catch(err){
            reject(err)
        }
    })
}

module.exports = {
    createPostLobby: createPostLobby
}