import agent from "./agent";

export default {
  searchMovie: () => {
    return new global.Promise((resolve, reject) => {
      agent.axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            agent.movieDbApi
          }&language=en-US&query=avengers&page=1&include_adult=true&video=true`
        )
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => reject(err));
    });
  }
};
