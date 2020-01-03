const Blog = require('../models/blog')

// const initialNotes = [
//   {
//     content: 'HTML is easy',
//     important: false
//   },
//   {
//     content: 'Browser can execute only Javascript',
//     important: true
//   }
// ]

// const nonExistingId = async () => {
//   const note = new Note({ content: 'willremovethissoon' })
//   await note.save()
//   await note.remove()

//   return note._id.toString()
// }

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  blogsInDb
}