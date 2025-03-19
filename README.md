# Train Scheduler 🚆

## 📌 Overview

The **Train Scheduler** is a real-time train tracking application that allows users to add train schedules and view dynamically updated arrival times. Built with Firebase and JavaScript, this app leverages **Google Authentication** to secure data submission while allowing public read access. The app calculates next arrival times and minutes away based on user inputs and **Moment.js** time calculations.

🔗 **Live Demo:** [Train Scheduler App](https://smart79.github.io/train-scheduler/)

---

## 🏗 Project Structure

```
📂 train-scheduler
├── 📂 assets
│   ├── 📂 css
│   │   ├── style.css
│   ├── 📂 images
│   │   ├── bgimage.jpg
├── index.html
├── script.js
├── README.md
```

---

## ⚙ Installation

### **Clone the Repository**

```sh
 git clone https://github.com/smart79/train-scheduler.git
 cd train-scheduler
```

### **Open in Browser**

Simply open `index.html` in any modern web browser to test locally.

---

## 🚀 Technologies Used

- **HTML5, CSS3, Bootstrap** → Front-end styling & layout
- **JavaScript (ES6)** → Core logic, event handling, API integration
- **Firebase Realtime Database** → Stores & updates train schedules dynamically
- **Moment.js** → Time calculations for next arrival & minutes away
- **Google Authentication** → Secure user-based data submission
- **jQuery** → DOM manipulation & event listeners

---

## 🛠 Skills Demonstrated

**Real-Time Database Integration** using Firebase API
**Asynchronous JavaScript (Promises, Callbacks)**
**Dynamic DOM Updates** without page reload
**Event-Driven Programming** (form handling, real-time updates)
**Authentication & Authorization** with Google Sign-In
**Responsive UI Design** with CSS Media Queries
**Client-Side Storage** (localStorage for user session tracking)

---

## 📌 Features & Functionality

- 🔄 **Real-Time Schedule Updates** → Firebase listens for data changes & updates the UI instantly.
- 🕒 **Live Countdown** → Dynamically updates the minutes away calculation every minute.
- 📅 **Next Train Arrival Calculation** → Uses Moment.js to compute accurate arrival times.
- 🔐 **Secure Data Submission** → Only authenticated users can add train schedules.
- 📱 **Mobile Responsive** → Fully responsive across devices with optimized styles.
- 🏠 **Back to Portfolio Button** → Easy navigation to portfolio homepage.

---

## 📑 Algorithms & Logic

### **1️⃣ Train Time Calculation**

```js
var timeDiff = moment().diff(moment(firstTrain, "HH:mm"), "minutes");
var remainder = timeDiff % frequency;
var minutesAway = frequency - remainder;
var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
```

✔ Computes the **next train arrival** and **time until the next train** dynamically.

### **2️⃣ Google Authentication Handling**

```js
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User signed in:", user.email);
  } else {
    console.log("No user signed in");
  }
});
```

✔ Restricts train schedule submissions **only to logged-in users**.

### **3️⃣ Firebase Real-Time Updates**

```js
database.ref().on("child_added", function (snapshot) {
  var trainData = snapshot.val();
  updateTable(trainData);
});
```

✔ **Automatically updates UI** when new train schedules are added.

---

## 🔮 Future Enhancements

**Admin Panel for Train Management** → Ability to delete or edit train schedules.
**User-Specific Train Entries** → Only allow users to edit their own train schedules.
**Push Notifications** → Alert users when a train is arriving soon.
**Multiple Authentication Providers** → Support for GitHub & email-based login.

---

## 👥 Contributors

👤 **Your Name** – Developer & Project Owner

---

## 🎖 Credits & Acknowledgments

- **Firebase Docs** – Realtime Database & Authentication
- **Moment.js** – Time Calculation Library
- **Bootstrap 4** – UI Components & Styling

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🔗 More Projects & Contact

👀 **More Projects:** [GitHub Portfolio](https://github.com/smart79)
📬 **Contact Me:** [Portfolio Contact Page](https://stephenmartinez.dev/contact.html)

🚀 _Built with passion for real-time applications!_
