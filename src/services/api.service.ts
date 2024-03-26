import axios from "axios"
export class MovieApiService {
    private apiKey: string = 'c41d5514fd7d90f73e3462fd4f52bf2b';

    //fetch popular movies from TMDb api using Axios
    async getPopularMovies(): Promise<any> {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
          params: { api_key: this.apiKey }
        });
        return this._getPosterFullPath(data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
      }
    }
  
    //search for movies by keywords from TMDb api
    async searchMoviesByKeyword(keywords: Array<string>): Promise<any> {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: { 
            api_key: this.apiKey,
            query: keywords.join('+') 
          }
        });
        return this._getPosterFullPath(data.results);
      } catch (error) {
        console.error(`Error searching for '${keywords.join('+')}' movies:`, error);
        return [];
      }
    }

    private async _getPosterFullPath(data){
        data.forEach(element => {
            element.poster_path = `https://image.tmdb.org/t/p/w300${element.poster_path}`
        });
        return data
    }
  }