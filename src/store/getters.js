const getters={
     userCount :state => state.user.count,
     sum:state=>state.user.count * state.user.price
}
export default getters