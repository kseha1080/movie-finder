import agent from "./agent";

export default {
  discoverTheater: () => {
    return new global.Promise((resolve, reject) => {
      agent.axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${agent.movieDbApi}&primary_release_date.gte=2019-09-15&primary_release_date.lte=2014-10-22`
        )
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => reject(err));
    });
  }
};

//popular
//          `https://api.themoviedb.org/3/discover/movie?api_key=431af4ad5b14c456b9e7c57f2faa6304&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`

