import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import Course from "./pages/Course";
import Exaam from "./pages/Exaam";
import Settings from "./pages/Settings";
import Changepass from "./pages/ChangePass";
import Categoryselect from "./pages/Categoryselect";
import AuthContextProvider from "./hooks/useAuth";
import Protected from "./utils/Protected";
import Addcourses from "./pages/Addcourses";
import Addsubject from "./pages/Addsubject";
import { Advertisment } from "./pages/Advertisment";
import { Area } from "./pages/Area";
import CourseSubjects from "./pages/CourseSubjects";
import AdminProfile from "./components/AdminProfile";
import Contact from "./pages/Contact";
import Courses2 from "./pages/Courses2";
import Addblogsdata from "./pages/Addblogsdata";
import Addfiles from "./pages/Addfiles";
import AddSyllabus from "./pages/AddSyallabus";
import SubjectDetail from "./pages/SubjectDetail";
import Messages from "./pages/Messages";
import BlogDetail from "./pages/BlogDetail";
function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="blogs">
          <Route path="" element={<Blogs />}/>
          <Route path=":blogid" element={<BlogDetail/>}/>
          </Route>  
          
          <Route path="contact" element={<Contact />} />
          <Route path="all-courses" element={<Courses2 />} />
          <Route path="all-courses">
            <Route path=":courseid" element={<CourseSubjects />} />
            <Route path=":courseid/:subjectid" element={<SubjectDetail />} />
          </Route>
        </Route>

        <Route element={<Protected />}>
          <Route element={<PrivateLayout />}>
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/exam" element={<Exaam />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/categoryselect" element={<Categoryselect />} />
            <Route path="/changepass" element={<Changepass />} />
            <Route path="/addcourse" element={<Addcourses />} />
            <Route path="/addsubject" element={<Addsubject />} />
            <Route path="/advertisment" element={<Advertisment />} />
            <Route path="/area" element={<Area />} />
            <Route path="/course" element={<Course />} />
            <Route path="/addblogsdata" element={<Addblogsdata />} />
            <Route path="/addfiles" element={<Addfiles />} />
            <Route path="/addsyllabus" element={<AddSyllabus />} />
            <Route path="/" element={<Addblogsdata />} />

            <Route path="course">
              <Route path=":courseid" element={<CourseSubjects />} />
              <Route path=":courseid/:subjectid" element={<SubjectDetail />} />
            </Route>
            <Route path="messages" element={<Messages/>}/>
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
