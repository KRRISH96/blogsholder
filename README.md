# 📝 Blogsholder

A Frontend only Blog Platform Mock using [JSON Placeholder API](https://jsonplaceholder.typicode.com)
<br></br>

## 🔗 Live

<hr></hr>

Deployed on Netlify - [App Link](https://blogsholder.netlify.app/)
<br></br>

## ✨ Features

### Home Page

<hr></hr>

👉 A simple table to display users, with columns as name, company, blog posts link.

👉 A filter for user name and companyname.
<br></br>

### Posts Page

<hr></hr>

👉 Display the list of posts of particular user.

👉 Each of these will have a link to the Post DetailsPage.

👉 Pagination with page and limit control.

👉 A filter for post title text matching.
<br></br>

### Post Details Page

<hr></hr>
👉 Display title and body of post fetched using URL params.

👉 A search term highlighting the text matched in title as well as body.

👉 A link to load comments. Clicking will load comments and show them on this page.

👉 Also, there will be a delete button which will delete the post.

👉 After a successful deletion, will redirect to the Posts page of the respective user again.

> Note: A fake API is used to simulate backend. So, DELETE request wont actually delete the data, it's just a simulation.

<br></br>

## 💡 Further Enhancements (TODO)

<hr></hr>
👉 Option to switch between design layouts in the home screen (listing, cards, expansive panels, etc.)

👉 Theme Options

1. Light
2. Dark
3. System Preferred (Light or Dark)
4. Time Based (Auto sets theme based on time of the day)
   <br></br>

## 💻 Development Setup

1. Fork this Repo
2. Clone to Local
3. Run `yarn install` to install all dependencies
4. Run `yarn start`

<br></br>

## 🙏 Thank You
