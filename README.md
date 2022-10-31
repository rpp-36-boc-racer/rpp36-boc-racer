# PawPrints

> A mobile web app that you can safely share pet photos with friends. Sending awkward photos? Don't worry, they will disappear.

## Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white)
![Github-Actions](https://img.shields.io/badge/Github%20Actions-2088FF?style=for-the-badge&logo=Github-Actions&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-Testing%20Library-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-fff.svg?style=for-the-badge&logo=Socket.io&logoColor=black)
![MUI](https://img.shields.io/badge/MUI-007FFF.svg?style=for-the-badge&logo=MUI&logoColor=white)
![Eslint](https://img.shields.io/badge/Eslint-E6E6FA?style=for-the-badge&logo=eslint&logoColor=4B32C3)

## Feature Demos

#### Authentication
built by [Paul Watson](https://github.com/pewiii)

#### Chat List
built by [Ai Lam](https://github.com/ai-lam)


#### Instant Message 
built by [Danting Huang](https://github.com/sdhlyhb)

- Users can start real-time chat with friends with text messages and photos
- Send is disable if no message is entered
- Both receiver and sender can view the photo in a modal for a zoomed version
- A download button allows the receiver to download the photo shared by friends (right click "save image as..." option is disabled)
- Upon clicking the download button, the photo will be download to local and a alert message will appear showing that the receiver has saved the photo
- Click download button will also trigger email notification showing the photo has been saved by receiver (implemented by [Paul Watson](https://github.com/pewiii))  

#### Sending photos and photo expiration
built by [Ziqian Li](https://github.com/zxl3269117)

- Users can take a photo using camera or upload a picture from local device
- Send is disabled when no image is selected
- A preview allows user to confirm image that is to be sent
- Snap button is disabled when there is an image selected
- After sent, image will disappear after 10 minutes since receiver opens the message

Send photos | Photo expiration
--- | ---
![send-photos](https://media.giphy.com/media/ovnEGJHbQ9qR56Y3cy/giphy.gif "Send photos") | ![photo-expiration](https://media.giphy.com/media/CTXZt7JE8CoPpvRT4c/giphy.gif "Photo expiration")

#### Search and add friends
built by [Noelle Tian](https://github.com/nuot)

#### Friends List
built by [Amrinder Singh](https://github.com/amrinder1650)

## Install

1. Fork the project and clone to your local repository
2. Install all the packages and dependencies by running:

```jsx
npm install
```

3. Run webpack at local development mode:

```jsx
npm run build
```

4. Start server:

```jsx
npm start
```

5. create `.env` file and add the following varialbles:
```jsx
SECRET="abc"
AWS_BUCKET_NAME=YOUR_BUCKET_NAME
AWS_BUCKET_REGION=YOUR_BUCKET_REGION
AWS_ACCESS_KEY=YOUR_ACCESS_KEY
AWS_SECRET_KEY=YOUR_SECRET_KEY
EMAIL="pawprints.notification@gmail.com"
EMAIL_PASSWORD="lpenritakquzjohk"
S3_BUCKET=YOUR_S3_BUCKET
REGION=YOUR_REGION
ACCESS_KEY=YOUR_ACCESS_KEY
SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
```
6. Visit [http://localhost:3000](http://localhost:3000) to start the page

## Project Description

This is a month long project where our team completed an MVP full stack application for an external user.

- Each week is a sprint.
- First sprint is planning, design and code skeleton, CI/CD set up.
- Second and third week is Agile developement
- Last week is app polish including bug fixes and UI finalization
- Personal goals as following:
  - Ai Lam: Message List
  - Amrinder Singh: Friends list
  - Danting Huang: Instant messaging
  - Noelle Tian: Add Friends
  - Paul Watson: Authentication feature
  - Ziqian Li: Build routing and picture upload, image expiration features.

## Technical Challenges and research you anticipated

#### instant messaging

> Without refreshing page to send instant messages between 2 users. Research on socket.io.

#### Consistent Styling

> Quick and effectively style the app as a mobile-friendly web app. Research on Material UI.

## Contributors

- [Ai Lam](https://github.com/ai-lam) (Software Engineer)
- [Amrinder Singh](https://github.com/amrinder1650) (Software Engineer)
- [Danting Huang](https://github.com/sdhlyhb) (UI Owner & Software Engineer)
- [Noelle Tian](https://github.com/nuot) (Software Engineer)
- [Paul Watson](https://github.com/pewiii) (Architecture Owner & Software Engineer)
- [Ziqian Li](https://github.com/zxl3269117) (Product Manager & Software Engineer)
