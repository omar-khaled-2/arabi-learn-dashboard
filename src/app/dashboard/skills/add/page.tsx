import { createSkill } from "@/actions/skills";
import FormControl from "@/components/FormControl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Skill",
};

function AddSkillPage() {
  return (
    <form className="flex flex-col gap-10 flex-1" action={createSkill}>
      <h2 className="text-3xl">Add Skill</h2>

      <FormControl id="name" label="Name">
        <input
          placeholder="ex. writing 1"
          required
          className="input"
          id="name"
          name="name"
        />
      </FormControl>

      <button className="btn btn-primary self-end" type="submit">
        Create
      </button>
    </form>
  );
}

export default AddSkillPage;
