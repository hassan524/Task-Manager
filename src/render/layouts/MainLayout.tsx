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
          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(
              setUser({
                name: docSnap.data().name,
                email: docSnap.data().email,
              })
            );
          } else {
            console.error("User document not found.");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        navigate("/"); 
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <>
      <Header /> {/* Fixed header */}
      <SidebarProvider >
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
