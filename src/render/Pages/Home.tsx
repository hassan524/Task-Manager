import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from 'react-redux';
import { Separator } from '@/components/ui/separator';
import useFetchComplete from '@/hooks/fetch-complete-hook';
import useFetchPending from '@/hooks/fetch-pending';
import CreateNote from '@/methods/CreateNote';
import MyContext from '@/contexts/context';
import { db } from '@/main/firebase';
import { doc, setDoc, query, collection, where, onSnapshot, deleteDoc } from 'firebase/firestore';
import CreateTodo from '@/methods/CreateTodo';
import fetchTodos from '@/hooks/fetch-todos';
import fetchNotes from "@/hooks/fetch-Notes";
import { Checkbox } from "@/components/ui/checkbox";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import CountUp from 'react-countup';



const Home = () => {

  // AOS.init() 

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [Title2, setTitle2] = useState('');
  const [Text2, setText2] = useState('');
  const [Notes, SetNotes] = useState([]);
  const [SelectNoteForTodo, SetSelectNoteForTodo] = useState(null);
  console.log(SelectNoteForTodo)

  const myData = useSelector((state) => state.user);
  const [identity, setIdentity] = useState<string | number | null>(null);
  const { SetIsNoteOpen, IsTodoOpen, SetIsTodoOpen, DefaultTodoComplete, NotesTodoComplete } = useContext(MyContext);
  const { pendingProjects = [], pendingGroups = [], pendingTasks = [] } = useFetchPending();
  const { completedProjects = [], OnGoingProjects = [], completedGroups = [], completedTasks = [] } = useFetchComplete();
  const [IsSetDefaultTodo, SetIsDefaultTodo] = useState(false);

  const todos = fetchTodos();
  const notes = fetchNotes();

  useEffect(() => {
    if (myData?.name) setIdentity(myData.name.charAt(0).toUpperCase());
  }, [myData]);

  console.log(myData.id)

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

  function HandleDefaultTodoComplete(todo) {
    DefaultTodoComplete(todo)
  }

  function HandleNotesTodoComplete(todo, docid) {
    NotesTodoComplete(todo, docid)
  }

  // function HandleNote() {
  //   setIsNoteOpen(true)
  // }

  async function deleteNote(id) {
    await deleteDoc(doc(db, "Notes", id));
  }

  const gradientColors = [
    { from: '#93C5FD', to: '#E5E7EB' },
    { from: '#D8B4FE', to: '#E5E7EB' },
    { from: '#CCEEBC', to: '#E5E7EB' },
    { from: '#A7F3D0', to: '#E5E7EB' },
  ];

  const colors = ['#C4D7FF', '#CDC1FF', '#FFC6C6', '#CCEEBC'];

  return (
    <div className="wrapper flex flex-col gap-10"  >
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
        {[
          { label: 'Total Completed Projects', count: completedProjects?.length || 0 },
          { label: 'Ongoing Projects', count: OnGoingProjects?.length || 0 },
          { label: 'Completed Group Tasks', count: completedGroups?.length || 0 },
          { label: 'Completed Tasks', count: completedTasks?.length || 0 },
        ].map((card, index) => (
          <div
            key={index}
            className="text-white p-6 rounded-2xl text-center shadow-md hover:shadow-lg"
            style={{ backgroundColor: colors[index] }}
            data-aos="fade-down"
            data-aos-delay={index * 200}
            data-aos-duration={1000}
          >
            <div className="text-4xl font-extrabold">
              <CountUp end={card.count} duration={3} />
            </div>
            <div className="mt-2 text-md font-semibold">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-14">
        {[{ title: 'Pending Projects', data: pendingProjects }, { title: 'Pending Group Tasks', data: pendingGroups }, { title: 'Pending Tasks', data: pendingTasks }].map((section, index) => (
          <div
            data-aos="fade-down"
            data-aos-duration={1000}
            key={index}
            className="relative h-auto min-h-[50vh] w-full rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Content goes here */}
            <div
              className="absolute inset-x-0 top-0 h-10 flex items-center px-5"
              style={{ background: `linear-gradient(90deg, ${gradientColors[index]?.from} 0%, ${gradientColors[index]?.to} 100%)` }}
            >
              <span className="text-white font-medium">{section.title}</span>
            </div>
            <div className="mt-10 flex flex-col overflow-y-auto">
              {section.data.length > 0 ? (
                section.data.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between w-full p-2 bg-white border border-gray-200 shadow-sm hover:shadow-md"
                    data-aos="fade-down"
                    data-aos-delay={index * 100}
                    data-aos-duration={1000}
                  >
                    <div className="flex items-center gap-3">
                      {item.type === 'project' ? (
                        <i className="bi bi-folder text-[#93C5FD] text-xl"></i>
                      ) : item.type === 'Groups' ? (
                        <i className="bi bi-folder2-open text-[#D8B4FE] text-xl"></i>
                      ) : item.type === 'Task' ? (
                        <i className="bi bi-check2-square text-[#CCEEBC] text-xl"></i>
                      ) : null}
                      <span className="font-semibold text-gray-800 text-[14px]">
                        {item.projectName || item.GroupName || item.TaskName}
                      </span>
                    </div>
                    <div className="">
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='30' height='30'><circle fill='#3D6CFF' stroke='#C4D7FF' strokeWidth='15' r='15' cx='40' cy='100'><animate attributeName='opacity' calcMode='spline' dur='1.3s' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4s'></animate></circle><circle fill='#3D6CFF' stroke='#3D6CFF' stroke-width='15' r='15' cx='100' cy='100'><animate attributeName='opacity' calcMode='spline' dur='1.3s' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2s'></animate></circle><circle fill='#3D6CFF' stroke='#3D6CFF' stroke-width='15' r='15' cx='160' cy='100'><animate attributeName='opacity' calcMode='spline' dur='1.3s' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0s'></animate></circle></svg>
                    </div>
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

      <div className="w-full flex items-center justify-between mt-8" data-aos="fade-down"
        data-aos-duration={1000}>
        <div className="flex items-center gap-2">
          <i className="bi bi-file-earmark-check-fill text-primary"></i>
          <span className="font-bold text-primary text-lg"  >Notes</span>
        </div>
        <button
          className="bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-opacity-90 shadow-md"
          onClick={() => {
            console.log("Button clicked");
            SetIsNoteOpen(true);
          }}
        >
          Create Note
        </button>

      </div>

      <div className="grid lg:grid-cols-2 gap-5">

        {/* Note Taking Section */}
        <div className="w-full h-[42vh] rounded-2xl overflow-hidden bg-white shadow-md"        data-aos="fade-down"
           data-aos-duration={1000}> 
          <div className="h-[7vh] flex bg-[#FCFFC1] items-center px-3">
            <input
              className="h-full w-full text-gray-700 font-semibold text-lg outline-none bg-transparent placeholder-gray-500"
              type="text"
              placeholder="Enter title here..."
              onChange={handleTitleChange}
              value={title}
            />
          </div>
          <textarea
            className="text-area w-full outline-none h-[calc(100%-7vh)] resize-none overflow-auto p-3 text-md tracking-wide leading-8 text-gray-500"
            placeholder="Type your content here..."
            onChange={handleTextChange}
            value={text}
          ></textarea>
        </div>

        {/* Todo Section */}
        <div className="w-full h-[42vh] rounded-2xl overflow-hidden bg-white shadow-md"        data-aos="fade-down"
           data-aos-duration={1000}>
          <div className="h-[7vh] bg-[#FFE2E2] flex items-center px-3">
            <button
              onClick={HandleDefaultTodo}
              className="flex items-center gap-2 text-gray-700 font-semibold"
            >
              Add Todo
              <i className="bi bi-plus text-xl"></i>
            </button>
          </div>
          <div className="p-3 text-gray-700 text-md">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div key={todo.id} className="py-1 flex items-center gap-2 font-semibold" >
                  <Checkbox checked={todo.IsCompleted} onClick={() => HandleDefaultTodoComplete(todo)} className='text-slate-500 data-[state=checked]:bg-[#C4D7FF]' />
                  <span>{todo.name}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-400">No Todos Yet</div>
            )}
          </div>
        </div>

        {/* Notes Section */}
        {/* Notes Section */}
        {Notes.map((note, index) => (
          <div
            className="w-full h-[42vh] rounded-2xl overflow-hidden bg-white shadow-md"
            key={note.id}
            data-aos="fade-down"
            data-aos-duration={1000}

          >
            {/* Note Header */}
            <div
              className="h-[7vh] flex items-center justify-between px-4"
              style={{ backgroundColor: colors[index] }}
            >
              {note.type === "Text" ? (
                <>
                  <input
                    className="flex-grow h-full text-gray-700 font-semibold outline-none bg-transparent placeholder-gray-500"
                    type="text"
                    placeholder="Enter title here..."
                    onChange={(e) => handleTitleChange2(note.id, e)}
                    value={note.title}
                  />
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-white flex-shrink-0"
                  >
                    <i className="bi bi-trash text-xl"></i>
                  </button>
                </>
              ) : (
                <div className="w-full flex items-center justify-between">
                  <button
                    onClick={() => HandleTodoForNote(note)}
                    className="flex items-center gap-2 text-gray-700 font-semibold"
                  >
                    Add Todo
                    <i className="bi bi-plus text-xl"></i>
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-white flex-shrink-0"
                  >
                    <i className="bi bi-trash text-xl"></i>
                  </button>
                </div>
              )}
            </div>

            {/* Note Content */}
            {note.type === "Text" ? (
              <textarea
                className="w-full outline-none h-[calc(100%-7vh)] resize-none p-3 text-md tracking-wide leading-8 text-gray-500"
                placeholder="Type your content here..."
                onChange={(e) => handleTextChange2(note.id, e)}
                value={note.text}
              ></textarea>
            ) : note.todos && note.todos.length > 0 ? (
              <div className="p-3 text-gray-700 text-md space-y-2">
                {note.todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={todo.IsCompleted}
                        onClick={() => HandleNotesTodoComplete(todo, note.id)}
                        className="text-slate-500 data-[state=checked]:bg-[#C4D7FF]"
                      />
                      <span>{todo.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[calc(100%-7vh)] flex items-center justify-center text-gray-300">
                No Todos Yet
              </div>
            )}
          </div>
        ))}

      </div>


      <CreateNote />
      <CreateTodo DefaultTodo={IsSetDefaultTodo} NoteForTodo={SelectNoteForTodo} />


    </div >
  );
};

export default Home;
