import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/main/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { setUser } from '@/redux/slices/CurrentUserSlice';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const onWindowLoad = () => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const docRef = doc(db, 'users', firebaseUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              dispatch(setUser({
                name: docSnap.data().name,
                email: docSnap.data().email,
              }));
            } else {
              console.error('User document not found.');
            }
          } catch (error) {

            console.error('Error fetching user document:', error);
          }
        } else {
          navigate('/')
        }
      });

      return () => unsubscribe();
    };

    onWindowLoad();
  }, [dispatch]);

  return (
    <>
      <Header />
    </>
  );
};

export default MainLayout;


{/* <header className="w-full max-w-[1440px] mx-auto">
<Card className="h-[100px] bg-gradient-to-b from-[rgb(247,248,252)] from-[49.12%] to-[rgb(61,108,255)] to-100% border-0 rounded-none shadow-none"></Card>
</header> */} 