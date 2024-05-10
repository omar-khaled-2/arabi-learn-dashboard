import {
  deleteQuestion,
  getQuestion,
  updateQuestion,
} from "@/actions/questions";
import { getSkills } from "@/actions/skills";
import FormControl from "@/components/FormControl";
import getObjectUrl from "@/utilities/getObjectUrl";
import { NextPage } from "next";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";


interface EditQuestionPageProps {
  params: {
    id: string;
  };
}

const EditQuestionPage: NextPage<EditQuestionPageProps> = async ({
  params: { id },
}) => {
  const question = await getQuestion(id);
  const skills = await getSkills({});

  const deleteQuestionHandler = async () => {
    "use server";
    await deleteQuestion(id);
    redirect("/dashboard/questions");

    
  };

  const updateQuestionHandler = async (formData: FormData) => {
    "use server";
    await updateQuestion(id, formData);
    revalidatePath(`/dashboard/questions/${id}`);
  };

  return (
    <form
      className="flex flex-col align-stretch flex-1 gap-10"
      action={updateQuestionHandler}
    >
      <p className="text-3xl text-onBackground">Edit Question</p>
      <FormControl label="id" id="id">
        <p className="text-onBackground">{id}</p>
      </FormControl>

      {question.image != null && <FormControl label="image" id="image">
        <Image src={getObjectUrl(question.image)} width={100} height={100} alt="question image" />
      </FormControl>}
      <FormControl label="text" id="text">
        <input
          type="text"
          className="input"
          name="text"
          defaultValue={question.text}
          id="text"
        />
      </FormControl>

      {question.placeholder != null && <FormControl label="Placeholder" id="placeholder">
        <Image src={getObjectUrl(question.placeholder)} width={100} height={100} alt="question image" />
        <input type="file" name="placeholder"  />
      </FormControl>}
      <FormControl label="difficulty" id="difficulty">
        <input
          className="input"
          type="number"
          name="difficulty"
          defaultValue={question.difficulty}
          id="difficulty"
        />
      </FormControl>
      <FormControl id="skill" label="Skill">
        <select
          name="skillId"
          id="skill"
          defaultValue={question.skillId}
          required
          className="select"
        >
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      </FormControl>

      <div className="flex flex-row justify-between items-center">
        <button
          type="submit"
          className="btn bg-error"
          formAction={deleteQuestionHandler}
          value="delete"
        >
          Delete
        </button>

        <button type="submit" className="btn bg-primary" value="save">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditQuestionPage;
