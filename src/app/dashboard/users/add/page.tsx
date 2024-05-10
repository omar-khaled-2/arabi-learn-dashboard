import { createSkill } from "@/actions/skills";
import { addUser } from "@/actions/users";
import FormControl from "@/components/FormControl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add User",
};

function AddUserPage() {
  return (
    <form className="flex flex-col gap-10 flex-1" action={addUser}>
      <h2 className="text-3xl">Add User</h2>

      <FormControl id="username" label="username">
        <input
          required
          className="input"
          id="username"
          name="username"
        />
      </FormControl>

      <FormControl id="password" label="password">
        <input
          required
          className="input"
          id="password"
          name="password"
        />
      </FormControl>

      <button className="btn btn-primary self-end" type="submit">
        Create
      </button>
    </form>
  );
}

export default AddUserPage;
