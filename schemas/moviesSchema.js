const z = require('zod')
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be string',
    required_error: 'Title is required'
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  rate: z.number().min(0).max(10).optional(),
  duration: z.number().min(0).positive(),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

const validateMovie = (object) => {
  return movieSchema.safeParse(object)
}

const validatePartialMovie = (object) => {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
