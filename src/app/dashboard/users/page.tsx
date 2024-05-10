import { getSkills } from "@/actions/skills";
import { getUsers } from "@/actions/users";
import { Skill } from "@/models/skill";
import { Metadata, NextPage } from "next";

import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Skills",
};

export const revalidate = 0;

interface SkillsPageProps {
  params: {
    name?: string;
  };
}

const UsersPage: NextPage<SkillsPageProps> = async ({ params: { name } }) => {

  const users = await getUsers();
  

  // const skills:any[] = [];
  return (
    <div className="flex flex-col flex-1 gap-6 py-10">
      <form className="flex justify-end items-center gap-10" >
        


        <Link href="/dashboard/users/add" className="btn btn-primary">
          Add
        </Link>
      </form>
      
        <table className="w-full table-auto border-separate border-spacing-4">
          <thead>
            <tr className="border-b">
              <th className="text-center ">
                ID
              </th>
              <th className="text-center">
                Username
              </th>

            </tr>
          </thead>
          <tbody className="text-xs">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="text-center text-onBackground  underline">
                  <Link href={`/dashboard/users/${user.id}`}>{user.id}</Link>
                </td>
                <td className="text-clip text-balance">
                  {user.username}
                </td>
        
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
};

export default UsersPage;
