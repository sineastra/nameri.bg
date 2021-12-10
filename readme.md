The repo includes the back-end and the front-end of a React JS app.

The React JS SPA app is written with absolute minimal dependencies besides the one whcih come with the Create-React-App.
Those are:

- React Router v6
- js-cookie for parsing cookies (specifically parsing JWT token cookie)
- JWT-decode - for decoding the JWT token
- styled-components (bonus requirement for the project assign), used for several components just to mark it as done.
- react-icons

- No Components design library, the Whole HTML & CSS is written by me from scratch.
- No libraries for this and that, if not absolutely necessary (like decoding tokens, etc.)

The idea was to write the entire app by myself. Using an external library is the easiest thing to do.

The Express is a usual express REST API.

It is not finished as at present:

- CSS is only written as far as having basic idea of the site layout, TODO - Complete the CSS and add responsive css.
- Add file uploading to AWS S3 logic on the Express App
- Add search logic and a page.
- Code testing and testing on different browsers.

hosted at <a href="https://nameri-bg.vercel.app/"/>https://nameri-bg.vercel.app