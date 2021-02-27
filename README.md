# KariOmi

**Author:** Dru Daniels

**Heroku:** https://kariomi.herokuapp.com/ 

## Description
KariOmi is a karaoke app where users can save and rate karaoke performances, keep track of “go-to” songs, and easily learn new songs. Users can rate a new performance using a custom Icon ratings form, and CSS animations to show fun song stats. It also uses AWS-S3 to store a user’s video performances within popups right on the performance list. The Youtube API is integrated into a Node.js web app with PostgreSQL database with Knex and Objection, to create customizable song cards that hold a karaoke and lyric video. MusixMatch API adds lyrics when available. The app uses a Foundation front-end with custom CSS. It incorporates the react ratings library and react elastic carousel to give the site a seamless look.

## Site Features
- Allows people to add new songs to learn with custom picked karaoke and lyric videos, and adds song lyrics when available.
- Leave Practice Notes that can be updated and saved to the song being worked on.
- Keeps a list of songs sorted by artist.
- Allows people to add songs to their performance list once ready.
- Rate a performance and keep track of performance history and overall song score.
- Delete a performance or remove a song from the performance list
- Keep videos and notes of a performance.

## Techologies in the project
- React frontend framework
- Express backend routers
- Custom CSS Icon Ratings, Ipod design, and Animations throughout
- SQL database that is set up with Objection
- Nodejs backend framework
