export const create_user = `
mutation{
  createUser(
    options:{
    firstName:"Sachin",
    lastName:"Tendulkar",
    age:40
  }
  ){
    id
    firstName
    lastName
    age
  }
}
`

export const update_user = `
  mutation{
  updateUser(id:1
  input:{
    firstName:"Steven"
  })
}`

export const delete_user = `
    mutation{
  deleteUser(id:1)
}
`

export const select_user = `{
  users{
    id
    firstName
    lastName
    age
  }
}`