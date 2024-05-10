import { createQuestion } from "@/actions/questions";
import { getSkills } from "@/actions/skills";
import { questionTypes } from "@/app/constants/questionTypes";
import Checkbox from "@/components/Checkbox";
import FormControl from "@/components/FormControl";
import McqInput from "@/components/McqInput";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

interface AddQuestionPageProps {
  searchParams: {
    type: string;
  };
}



export const metadata: Metadata = {
  title: "Add Question",
};

const AddQuestionPage: React.FC<AddQuestionPageProps> = async (props) => {
  const type = props.searchParams.type || "writing";

  const skills = await getSkills({});

  const save = async (formData: FormData) => {
    "use server";

    formData.append("type", type)
    const question = await createQuestion(formData)
    redirect(`/dashboard/questions/${question.id}`)
  };

  // const saveAndNext = async (formData: FormData) => {
  //     'use server'
  //     formData.append("type", type)
  //     await createQuestion(formData)

  // }

  return (
    <form className="flex flex-col gap-10 flex-1" action={save}>
      <h1 className="text-3xl">Add Question</h1>

      <div className="flex flex-row flex-wrap gap-3">
        {questionTypes.map((questionType) => (
          <Link
            replace
            key={questionType}
            href={`/dashboard/questions/add?type=${questionType}`}
            className={`btn ${questionType == type ? "btn-primary" : "btn-text"}`}
          >
            {questionType}
          </Link>
        ))}
      </div>
      <FormControl id="text" label="Text">
        <input type="text" className="input" name="text" id="text" required />
      </FormControl>

      <FormControl label="Image" id="image">
        <input
          type="file"
          name="image"
          className="text-onBackground"
          accept="image/*"
        />
      </FormControl>

      <FormControl label="Difficulty" id="difficulty">
        <input
          className="input"
          min={1}
          max={10}
          defaultValue={1}
          type="number"
          name="difficulty"
          required
        />
      </FormControl>

      <FormControl id="skill" label="Skill">
        <select name="skillId" id="skill" required className="select">
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      </FormControl>

      {(type == "dots" || type == "font tracing") && (
        <FormControl id="placeholder" label="Placeholder">
          <input
            type="file"
            name="placeholder"
            className="text-onBackground"
            accept="image/png"
            id="placeholder"
            required
          />
        </FormControl>
      )}

      {type == "mcq" && <McqInput />}
      {type == "checkbox" && <Checkbox />}
      {type == "writing" && (
        <FormControl id="answer" label="Answer">
          <input
            type="text"
            className="input"
            name="expectedWord"
            accept="image/png"
            id="answer"
            required
          />
        </FormControl>
      )}
      <div className="flex flex-row gap-2 justify-between">
        <button className="btn btn-primary self-end" type="reset" >Reset</button>
        <button className="btn btn-primary self-end" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default AddQuestionPage;
