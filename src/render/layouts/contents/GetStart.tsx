import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/main/firebase';
import AOS from 'aos';
import 'aos/dist/aos.css';

const GetStart: React.FC = () => {
    const [isUserLogin, setIsUserLogin] = useState<User | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const onloadWindowFunction = async () => {
            AOS.init();
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                setIsUserLogin(user);
                setIsAuthReady(true);
            });
            return () => unsubscribe();
        };

        onloadWindowFunction();
    }, []);

    const handleAccount = async () => {
        if (!isAuthReady) {
            console.log('Auth state is not ready yet. Please wait...');
            return;
        }

        if (contentRef.current) {
            contentRef.current.setAttribute('data-aos', 'zoom-in');
            AOS.refresh();
        }
        localStorage.setItem('IsHandlingAcount', 'true');

        setTimeout(() => {
            navigate(isUserLogin ? '/home' : '/login');
        }, 1000);
    };

    return (
        <div ref={contentRef} className="Start-content leading-10">
            <div>
                <h1 className="font-semibold custom-md:text-[48px] text-[35px]" data-aos="fade-down" data-aos-duration="1000">
                    Welcome to
                </h1>
                <h1 className="text-primary font-semibold custom-md:text-[48px] text-[35px]" data-aos="fade-down" data-aos-duration="1200">
                    Task Manager
                </h1>
            </div>
            <button
                onClick={handleAccount}
                className="bg-primary rounded-3xl mt-5 px-4 py-2 font-semibold text-slate-50"
                data-aos="fade-down"
                data-aos-duration="1400"
                disabled={!isAuthReady}
            >
                Get Started
            </button>
        </div>
    );
};

export default GetStart;
