import { useForm } from "react-hook-form";
import { useTask } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TasksFormPage() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createTask, getTask, updateTask } = useTask();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("tittle", task.tittle);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format,
    };

    if (params.id) {
      updateTask(params.id, dataValid);
      navigate("/tasks");
    } else {
      createTask(dataValid);
      navigate("/tasks");
    }
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-[400px] p-10 bg-[rgba(0,0,0,.5)] shadow-2xl rounded-xl ">
        <h1 className="mb-8 text-center text-3xl font-semibold text-[#03e9f4]">
          Create Task
        </h1>
        <form onSubmit={onSubmit} className="mt-5 flex flex-col items-center">
          <div className="relative mb-8 w-full">
            <input
              type="text"
              {...register("tittle", { required: true })}
              list="autocompleteOff"
              name="tittle"
              required=" "
              autoFocus
              maxLength={40}
              className="w-full py-3 px-0text-[16px] border-solid border-b border-white outline-none bg-transparent"
            />
            <label className="absolute top-0 left-0 py-3 px-0 text-[16px] pointer-events-none duration-700">
              Tittle
            </label>
            {errors.tittle && (
              <p className="text-[10px] mt-2 text-red-500">
                Tittle is required
              </p>
            )}
          </div>
          <div className="relative mb-8 w-full">
            <textarea
              name="description"
              rows="3"
              {...register("description", { required: true })}
              required=" "
              maxLength={94}
              className="w-full py-3 px-0text-[16px] border-solid border-b border-white outline-none bg-transparent max-h-28 resize-none"
            ></textarea>
            <label className="absolute top-0 left-0 py-3 px-0 text-[16px] pointer-events-none duration-700">
              Description
            </label>
            {errors.description && (
              <p className="text-[10px] mt-2 text-red-500">
                Description is required
              </p>
            )}
          </div>
          <div className="relative mb-8 w-full">
            <input
              type="date"
              {...register("date")}
              className=" py-3 px-0 border-solid border-b border-white outline-none bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="light relative inline-block py-3 px-5 text-[#03e9f4] decoration-[none] overflow-hidden mt-6 tracking-[4px] duration-700"
          >
            <span className="absolute block"></span>
            <span className="absolute block"></span>
            <span className="absolute block"></span>
            <span className="absolute block"></span>
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}

export default TasksFormPage;
