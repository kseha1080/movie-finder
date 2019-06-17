import agent from "./agent";

export default {
  getGenre: () => {
    return new global.Promise((resolve, reject) => {
      agent.axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${
            agent.movieDbApi
          }&language=en-US
            `
        )
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => reject(err));
    });
  },
  findByGenre: ({ genreId, currentYear }) => {
    return new global.Promise((resolve, reject) => {
      agent.axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            agent.movieDbApi
          }&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&primary_release_year=${currentYear}&with_genres=${genreId}`
        )
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => reject(err));
    });
  }
};
