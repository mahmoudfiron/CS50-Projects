StreamFit - Online Fitness Platform
Video Demo: https://www.youtube.com/watch?v=8XdSiZqWd74
Description:
StreamFit is a web application designed to connect users with fitness instructors for live, interactive training sessions. The platform allows users to sign up, view available courses, join classes, and track their fitness progress. Instructors, on the other hand, can create, manage, and update their courses, interact with participants during live sessions, and offer personalized training sessions. StreamFit aims to provide a seamless, engaging, and efficient fitness experience.

Features:

User Registration and Authentication: Users can sign up and log in using Firebase authentication, with different roles for regular users, instructors, and admins.
Instructor Course Management: Instructors can create, edit, and delete courses. Each course can include scheduled classes, course details, and multimedia.
Classroom Page: Participants can join live classes, view the class schedule, and communicate with instructors.
Real-Time Interaction: Using integration with platforms like Zoom, participants and instructors can interact in real-time during live training sessions.
User and Course Rating: After completing a course, users can rate the instructor and course, helping others make informed decisions.
Technologies Used:

Frontend: React, HTML5, CSS3
Backend: Firebase (for authentication and data storage)
Live Class Integration: Zoom API (for live sessions and real-time interaction)
State Management: React Context API for managing global states like user roles and course data
Libraries and Tools: Material-UI for styling, React Router for navigation, and custom hooks for managing user authentication and course management.
How it Works:

User Registration: After signing up, users can select their roles (either a regular user, instructor, or admin).
Course Management: Instructors can create a course, add lessons, and set up live sessions.
Joining Classes: Participants can join available live sessions based on their course enrollment.
Notifications and Alerts: Users receive notifications regarding class schedules and instructor messages.
Ratings and Feedback: After completing a course, users can rate their experience, providing valuable feedback to instructors.
Challenges and Design Decisions:

Real-Time Interaction: Integrating real-time communication between instructors and participants was a major challenge. I decided to use the Zoom API for simplicity and scalability.
User Roles: Differentiating between user roles (instructor, participant, and admin) required dynamic routing and careful role-based access control. I implemented this using Firebase authentication, which simplifies role management.
UI/UX: I focused on creating an intuitive and responsive UI, with Material-UI components for faster development and a more modern look and feel.
