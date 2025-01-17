import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/main/firebase";
import { getDoc, doc } from "firebase/firestore";
import { setUser } from "@/redux/slices/CurrentUserSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userUID = firebaseUser.uid; // Get the user's UID
          console.log("User UID:", userUID);

          // Fetch user data from Firestore
          const docRef = doc(db, "users", userUID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // Dispatch the user data to Redux
            dispatch(
              setUser({
                name: docSnap.data().name,
                email: docSnap.data().email,
                id: userUID
              })
            );
          } else {
            console.error("User document not found.");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        navigate("/"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, [dispatch, navigate]);

  return (
    <>
      <Header /> {/* Fixed header */}
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="md:hidden" />

        {/* Main content */}
        <div className="w-full m-5"> {/* Content starts after header */}
          <Outlet />
        </div>
      </SidebarProvider>
    </>
  );
};

export default MainLayout;
