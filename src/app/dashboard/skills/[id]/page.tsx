import { deleteSkill, getSkill, updateSkill } from "@/actions/skills";
import FormControl from "@/components/FormControl";
import { NextPage } from "next";
import { notFound, redirect } from "next/navigation";

interface SkillEditPageProps {
  params: {
    id: string;
  };
}

const SkillEditPage: NextPage<SkillEditPageProps> = async ({
  params: { id },
}) => {
  const skill = await getSkill(id);

  if(!skill) return notFound();

  const deleteSkillHandler = async () => {
    "use server";
    await deleteSkill(id);
    redirect("/dashboard/skills");
  };

  const updateSkillHandler = async (formData: FormData) => {
    "use server";
    await updateSkill(id, formData);
  };

  return (
    <form className="flex flex-col flex-1 gap-10" action={updateSkillHandler}>
      <h2 className="text-3xl">Edit Skill</h2>

      <FormControl id="id" label="Id">
        <p className="text-onBackground">{skill.id}</p>
      </FormControl>

      <FormControl id="name" label="Name">
        <input
          type="text"
          name="name"
          id="name"
          className="input"
          defaultValue={skill.name}
        />
      </FormControl>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="submit"
          className="btn btn-error"
          formAction={deleteSkillHandler}
        >
          Delete
        </button>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default SkillEditPage;
