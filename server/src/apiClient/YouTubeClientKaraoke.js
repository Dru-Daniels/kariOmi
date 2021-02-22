import got from "got"
import dotenv from 'dotenv'

dotenv.config()

const youTubeApiKey = process.env.youTubeApiKey

class YouTubeClientKaraoke {
  static async searchKaraoke(userInput) {  
    let karaokeQuery = `karaoke ${userInput}`
  
      try {
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=relevance&q=${karaokeQuery}&type=video&videoDefinition=high&key=${youTubeApiKey}`
        const response = await got(url)
        const responseBody = response.body
        const parsedKaraokeBody = JSON.parse(responseBody)
        return parsedKaraokeBody
      } catch(err) {
        return {error}
      }

  }  
  
}

export default YouTubeClientKaraoke