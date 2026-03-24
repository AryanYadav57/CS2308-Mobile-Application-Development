# Argon - Task Organizer App

This is a React Native mobile application developed for **CIE-2 : Mobile Application Development**. The app provides a sleek and modern user interface, focusing on a premium "Create Account" experience with highly interactive elements.

## Features

- **Home Screen**: A welcoming landing page that smoothly directs users to the account creation flow.
- **Create Account Screen**: A beautifully structured registration form featuring:
  - **Animated Inputs**: Fluid transitions on focus and blur for Name, Email, and Password fields.
  - **Password Strength Indicator**: Real-time visual feedback on password complexity (Weak, Medium, Strong).
  - **Dynamic Theme**: Modern dark mode aesthetics with carefully selected accent colors and subtle background decorations.
  - **Social Logins**: Beautiful placeholders for GitHub and Google authentication integration.
  - **Form Validation**: Robust checks ensuring all required fields are filled and the privacy policy is accepted before form submission.

## Tech Stack

- **Framework**: React Native (0.84.1)
- **Language**: TypeScript
- **State Management**: React Hooks
- **Styling**: React Native StyleSheet with custom animated values.

## Getting Started

### Prerequisites
Make sure you have Node.js and the React Native CLI set up on your machine.

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/AryanYadav57/CS2308-Mobile-Application-Development.git
   cd CS2308-Mobile-Application-Development/CIE2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the App

- **Run on Android**:
   ```bash
   npm run android
   ```
- **Run on iOS**:
   ```bash
   npm run ios
   ```
- **Start the Metro Bundler** (if running separately):
   ```bash
   npm start
   ```

## Design Highlights

The UI relies heavily on a custom color palette for a premium feel:
- **Background (`#111827`)**: Deep dark blue for the main canvas.
- **Accent (`#4f6ef7`)**: A vibrant blue-purple for buttons, active inputs, and interactive elements.
- **Card/Surface (`#1a2342`)**: Slightly lighter blue for floating elements like the social login buttons.
- **Animations**: Subtle scale and color interpolations make the form feel alive.
