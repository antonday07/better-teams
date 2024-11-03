import Pocketbase from 'pocketbase'

const pb = new Pocketbase('http://127.0.0.1:8090')

const authData = await pb.admins.authWithPassword('adam.tong.0507@gmail.com', 'admin123456')

function getAvatarUrl(user) {
    return `${pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}`;
}

export {
    pb,
    getAvatarUrl
}
