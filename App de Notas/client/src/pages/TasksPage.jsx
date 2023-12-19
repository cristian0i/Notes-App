import { useEffect } from "react";
import { useTask } from "../context/TasksContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TasksPage() {
  const { getTasks, tasks, deleteTask } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {tasks.length === 0 && (
        <div className="flex flex-col space-y-9 justify-center items-center text-center p-10 h-[75vh]">
        <h1 className="font-bold text-4xl">
          No tasks yet, please add a new task
        </h1>
        <button className="px-10 py-4 sm:px-4 sm:py-2 min-w-max text-3xl sm:text-lg bg-[#03e9f4] text-white rounded-[10px] hover:translate-y-[5px]">
          <Link to={"/tasks/add"}>Create Task</Link>
        </button>
      </div>
      
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center  gap-2 px-5">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="relative bg-[rgba(0,0,0,.5)] max-w-md md:w-[300px] h-[200px] max-h-[200px] p-5 rounded-md m-3"
          >
            <h1 className="text-2xl font-bold break-all">{task.tittle}</h1>
            <p className="text-slate-300 break-all">{task.description}</p>
            <div className="">
              <Link to={`/tasks/${task._id}`}>
                <button className="absolute flex justify-center items-center w-16 right-20 bottom-0 px-3 py-[5px] m-3 mx-6 bg-green-400 rounded-md">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => {
                  deleteTask(task._id);
                }}
                className="absolute flex justify-center items-center w-16 right-0 bottom-0 px-3 py-[5px] m-3 mx-6 bg-red-400 rounded-md"
              >
                Delete
              </button>
            </div>
            <p className="absolute mt-5 bottom-2 left-4 text-sm">
              {dayjs(task.date).utc().format("DD/MM/YYYY")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TasksPage;
