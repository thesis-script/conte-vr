// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AppProvider } from "./context/AppContext";
// import { DataProvider } from "./context/DataContext";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Home from "./pages/student/Home";
// import Login from "./pages/student/Login";
// import StorySelect from "./pages/student/StorySelect";
// import StoryExperience from "./pages/student/StoryExperience";
// import Quiz from "./pages/student/Quiz";
// import Profile from "./pages/student/Profile";

// import Dashboard from "./pages/teacher/Dashboard";
// import Students from "./pages/teacher/Students";
// import Stories from "./pages/teacher/Stories";
// import Quizzes from "./pages/teacher/Quizzes";
// import TeacherProfile from "./pages/teacher/Profile";

// export default function App() {
//   return (
//     <DataProvider>
//     <AppProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/connexion" element={<Login />} />

//           <Route
//             path="/eleve/accueil"
//             element={
//               <ProtectedRoute role="eleve">
//                 <StorySelect />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/eleve/histoires"
//             element={
//               <ProtectedRoute role="eleve">
//                 <StorySelect />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/eleve/histoire/:storyId"
//             element={
//               <ProtectedRoute role="eleve">
//                 <StoryExperience />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/eleve/quiz/:storyId"
//             element={
//               <ProtectedRoute role="eleve">
//                 <Quiz />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/eleve/profil"
//             element={
//               <ProtectedRoute role="eleve">
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/enseignant/tableau-de-bord"
//             element={
//               <ProtectedRoute role="enseignant">
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/enseignant/eleves"
//             element={
//               <ProtectedRoute role="enseignant">
//                 <Students />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/enseignant/histoires"
//             element={
//               <ProtectedRoute role="enseignant">
//                 <Stories />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/enseignant/evaluations"
//             element={
//               <ProtectedRoute role="enseignant">
//                 <Quizzes />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/enseignant/profil"
//             element={
//               <ProtectedRoute role="enseignant">
//                 <TeacherProfile />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="*" element={<Home />} />
//         </Routes>
//       </BrowserRouter>
//     </AppProvider>
//     </DataProvider>
//   );
// }
