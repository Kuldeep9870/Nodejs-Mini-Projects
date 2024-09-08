import jwt from 'jsonwebtoken'
const secret="kuldeep123";

function setUser(user){
    return jwt.sign({
        id:user._id,
        email:user.email,
        password:user.password,
    },secret);
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secret);
}

export {setUser,getUser};