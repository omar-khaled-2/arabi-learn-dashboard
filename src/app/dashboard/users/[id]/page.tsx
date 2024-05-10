import { deleteSkill, getSkill, updateSkill } from "@/actions/skills";
import { deleteUser, getUser } from "@/actions/users";
import FormControl from "@/components/FormControl";
import { NextPage } from "next";
import { notFound, redirect } from "next/navigation";

interface UserEditPageProps {
  params: {
    id: string;
  };
}

const UserEditPage: NextPage<UserEditPageProps> = async ({
  params: { id },
}) => {
  const user = await getUser(id);

  if(!user) return notFound();

  const deleteUserHandler = async () => {
    "use server";
    await deleteUser(id);
    redirect("/dashboard/users");
  };



  return (
    <form className="flex flex-col flex-1 gap-10" >
      <h2 className="text-3xl">Edit User</h2>

      <FormControl id="id" label="Id">
        <p className="text-onBackground">{user.id}</p>
      </FormControl>

      <FormControl id="username" label="Username">
        <p className="text-onBackground">{user.username}</p>
      </FormControl>

      



      <div className="mt-6 flex items-center justify-between">
        <button
          type="submit"
          className="btn btn-error"
          formAction={deleteUserHandler}
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

export default UserEditPage;
