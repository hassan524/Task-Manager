import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from 'react-redux';
import { Separator } from '@/components/ui/separator';
import useFetchComplete from '@/hooks/fetch-complete-hook';
import useFetchPending from '@/hooks/fetch-pending';
import CreateNote from '@/methods/CreateNote';
import MyContext from '@/contexts/context';
import { db } from '@/main/firebase';
import { doc, setDoc, query, collection, where, onSnapshot } from 'firebase/firestore';
import CreateTodo from '@/methods/CreateTodo';
import fetchTodos from '@/hooks/fetch-todos';
import fetchNotes from "@/hooks/fetch-Notes";

const Home = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [Title2, setTitle2] = useState('');
  const [Text2, setText2] = useState('');
  const [Notes, SetNotes] = useState([]);
  const [SelectNoteForTodo, SetSelectNoteForTodo] = useState(null);
  console.log(SelectNoteForTodo)

  const myData = useSelector((state) => state.user);
  const [identity, setIdentity] = useState<string | number | null>(null);
  const { setIsNoteOpen, IsTodoOpen, SetIsTodoOpen } = useContext(MyContext);
  const { pendingProjects, pendingGroups, pendingTasks } = useFetchPending();
  const { completedProjects, OnGoingProjects, completedGroups, completedTasks } = useFetchComplete();
  const [IsSetDefaultTodo, SetIsDefaultTodo] = useState(false);

  const todos = fetchTodos();
  const notes = fetchNotes();

  useEffect(() => {
    if (myData?.name) setIdentity(myData.name.charAt(0));
  }, [myData]);

  useEffect(() => {
    if (!myData?.id) return;
    const noteRef = doc(db, 'defaultNoteText', myData.id);
    const unsubscribe = onSnapshot(noteRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setTitle(data.title || '');
        setText(data.text || '');
      } else {
        console.warn(`No notes found for user ID: ${myData.id}`);
      }
    });
    return () => unsubscribe();
  }, [myData?.id]);

  useEffect(() => {
    if (!myData?.id) return;

    const notesQuery = query(
      collection(db, 'Notes'),
      where('Authorid', '==', myData.id)
    );

    const unsubscribe = onSnapshot(notesQuery, (querySnapshot) => {
      const fetchedNotes = [];
      querySnapshot.forEach((doc) => {
        fetchedNotes.push({ id: doc.id, ...doc.data() });
      });
      SetNotes(fetchedNotes);
    });

    return () => unsubscribe();
  }, [myData?.id]);

  useEffect(() => {
    if (!IsTodoOpen && IsSetDefaultTodo) {
      SetIsDefaultTodo(false);
    }
  }, [IsTodoOpen, IsSetDefaultTodo]);

  useEffect(() => {
    if (!IsTodoOpen && SelectNoteForTodo) {
      SetSelectNoteForTodo(null);
    }
  }, [IsTodoOpen]);

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (myData?.id) {
      try {
        const noteRef = doc(db, 'defaultNoteText', myData.id);
        await setDoc(noteRef, { title: newTitle, text }, { merge: true });
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
  };

  const handleTextChange = async (e) => {
    const newText = e.target.value;
    setText(newText);
    if (myData?.id) {
      const noteRef = doc(db, 'defaultNoteText', myData.id);
      await setDoc(noteRef, { title, text: newText }, { merge: true });
    }
  };

  const handleTitleChange2 = async (id, e) => {
    const newText = e.target.value;
    setTitle2(newText);
    const noteRef = doc(db, 'Notes', id);
    await setDoc(noteRef, { title: newText, text: Text2 }, { merge: true });
  };

  const handleTextChange2 = async (id, e) => {
    const newText = e.target.value;
    setText2(newText);
    const noteRef = doc(db, 'Notes', id);
    await setDoc(noteRef, { title, text: newText }, { merge: true });
  };

  const HandleDefaultTodo = () => {
    SetIsTodoOpen(true);
    SetIsDefaultTodo(true);
  };

  const HandleTodoForNote = (note) => {
    SetSelectNoteForTodo(note);
    SetIsTodoOpen(true);
  };

  useEffect(() => {
    console.log(SelectNoteForTodo);
  }, [SelectNoteForTodo]);

  const gradientColors = [
    { from: '#93C5FD', to: '#E5E7EB' },
    { from: '#D8B4FE', to: '#E5E7EB' },
    { from: '#FBCFE8', to: '#E5E7EB' },
    { from: '#A7F3D0', to: '#E5E7EB' },
  ];

  const colors = ['#93c5fd', '#d8b4fe', '#fbbf24', '#6ee7b7'];

  return (
    <div className="wrapper flex flex-col gap-10 mt-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="bi bi-houses-fill text-primary text-lg"></i>
          <span className="font-bold text-primary text-lg">Home</span>
        </div>
        <div className="w-10 h-10 rounded-full border border-gray-200 cursor-pointer flex justify-center items-center bg-gray-100 shadow-md">
          <span className="opacity-70 font-medium">{identity || ' '}</span>
        </div>
      </div>

      <Separator className="bg-gray-200" />

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {[{ label: 'Total Completed Projects', count: completedProjects.length }, { label: 'Ongoing Projects', count: OnGoingProjects.length }, { label: 'Completed Group Tasks', count: completedGroups.length }, { label: 'Completed Tasks', count: completedTasks.length }].map((card, index) => (
          <div
            key={index}
            className="text-white p-6 rounded-2xl text-center shadow-md hover:shadow-lg transition-all ease-in-out duration-300 transform hover:-translate-y-1"
            style={{ backgroundColor: colors[index] }}
          >
            <div className="text-4xl font-extrabold">{card.count}</div>
            <div className="mt-2 text-md font-semibold">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {[{ title: 'Pending Projects', data: pendingProjects }, { title: 'Pending Group Tasks', data: pendingGroups }, { title: 'Pending Tasks', data: pendingTasks }].map((section, index) => (
          <div
            key={index}
            className="relative h-[40vh] max-h-[60vh] w-full rounded-2xl shadow-lg overflow-hidden p-3"
          >
            <div
              className="absolute inset-x-0 top-0 h-10 flex items-center px-5"
              style={{ background: `linear-gradient(90deg, ${gradientColors[index]?.from} 0%, ${gradientColors[index]?.to} 100%)` }}
            >
              <span className="text-white font-medium">{section.title}</span>
            </div>
            <div className="mt-10 flex flex-col gap-4 overflow-y-auto">
              {section.data.length > 0 ? (
                section.data.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md"
                  >
                    <span className="font-medium text-gray-800">
                      {item.ProjectName || item.GroupName || item.TaskName}
                    </span>
                    <span className="text-sm text-gray-500">{item.DueDate || 'No due date'}</span>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center">
                  <img src="/public/nofound.png" alt={`No ${section.title}`} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex items-center justify-between mt-8">
        <div className="flex items-center gap-2">
          <i className="bi bi-file-earmark-check-fill text-primary"></i>
          <span className="font-bold text-primary text-lg">Notes</span>
        </div>
        <button
          className="bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-opacity-90 shadow-md"
          onClick={() => setIsNoteOpen(true)}
        >
          Create Note
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="w-full h-[42vh] rounded-2xl overflow-hidden bg-gray-50 shadow-lg">
          <div className="h-[7vh] flex bg-[#CDF5F6] items-center justify-between">
            <input
              className="h-full opacity-95 text-gray-600 tracking-wide px-3 w-[90%] outline-none bg-transparent"
              type="text"
              placeholder="Title"
              onChange={handleTitleChange}
              value={title}
            />
          </div>

          <textarea
            className="text-area w-full outline-none h-[calc(100%-7vh)] resize-none overflow-auto p-3"
            placeholder="Type your content here..."
            onFocus={(e) => (e.target.scrollTop = 0)}
            onChange={handleTextChange}
            value={text}
          ></textarea>
        </div>

        <div className="w-full h-[42vh] rounded-2xl overflow-hidden bg-gray-50 shadow-lg">
          <div className="h-[7vh] bg-[#F9EBDF] flex items-center text-gray-600 px-3">
            <div onClick={HandleDefaultTodo} className="flex items-center gap-1 cursor-pointer">
              <button>Add Todo</button>
              <i className="bi bi-plus text-xl"></i>
            </div>
          </div>
          <div className="">
            {todos.map((todo) => {
              return <div key={todo.id}>{todo.name}</div>;
            })}
          </div>
        </div>

        {Notes.map((note) => (
          <div className="w-full h-[42vh] rounded-2xl overflow-hidden bg-gray-50 shadow-lg" key={note.id}>
            <div className="h-[7vh] bg-[#F9EBDF] flex items-center text-gray-600 px-3">
              {note.type === "Text" ? (
                <input
                  className="h-full opacity-95 text-gray-600 tracking-wide px-3 w-[90%] outline-none bg-transparent"
                  type="text"
                  placeholder="Title"
                  onChange={(e) => handleTitleChange2(note.id, e)}
                  value={note.title}
                />
              ) : (
                <div
                  onClick={() => HandleTodoForNote(note)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <button>Add Todo</button>
                  <i className="bi bi-plus text-xl"></i>
                </div>
              )}
            </div>
            {note.type === "Text" ? (
              <textarea
                className="text-area w-full outline-none h-[calc(100%-7vh)] resize-none overflow-auto p-3"
                placeholder="Type your content here..."
                onFocus={(e) => (e.target.scrollTop = 0)}
                onChange={(e) => handleTextChange2(note.id, e)}
                value={note.text}
              ></textarea>
            ) : (
              // Check if note.todos is defined and an array
              Array.isArray(note.todos) && note.todos.length > 0 ? (
                note.todos.map((todo) => (
                  <div key={todo.id} className="">
                    {todo.name}
                  </div>
                ))
              ) : (
                <div>No Todos</div>
              )
            )}
          </div>
        ))}

      </div>

      <CreateNote />
      <CreateTodo DefaultTodo={IsSetDefaultTodo} NoteForTodo={SelectNoteForTodo} />
    </div>
  );
};

export default Home;
