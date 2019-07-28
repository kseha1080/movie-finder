import agent from './agent';

export default {
  // Get movies by query
  getMoviesByQuery: title => {
    return new global.Promise((resolve, reject) => {
      agent.axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            agent.movieDbApi
          }&language=en-US&query=${title}&page=1&include_adult=false
            `,
        )
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  // Get movies by reference
  getMovies: ({ ref, pageNum }) => {
    return new global.Promise((resolve, reject) => {
      agent.axios
        .get(
          `https://api.themoviedb.org/3/movie/${ref}?api_key=${
            agent.movieDbApi
          }&language=en-US&page=${pageNum}
            `,
        )
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  // Find similar movies
  getSimilar: ({ movieId, pageNum }) => {
    return new global.Promise((resolve, reject) => {
      agent.axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${
            agent.movieDbApi
          }&language=en-US&page=${pageNum}`,
        )
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
};
