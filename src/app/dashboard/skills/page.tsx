import { getSkills } from "@/actions/skills";
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

const SkillsPage: NextPage<SkillsPageProps> = async ({ params: { name } }) => {

  const skills = await getSkills({name});
  

  const search = async (formData: FormData) => {
    "use server"
    const name = formData.get("name") as string
    
   
    redirect("/dashboard/skills/?name="+encodeURIComponent(name))
  }
  // const skills:any[] = [];
  return (
    <div className="flex flex-col flex-1 gap-6 py-10">
      <form className="flex justify-between items-center gap-10" action={search}>
        
        <input placeholder="Search" className="input" name="name" type="search" />

        <Link href="/dashboard/skills/add" className="btn btn-primary">
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
                Name
              </th>
              <th className="text-center hidden md:table-cell  text-onBackground text-xs">
                Max Difficulity
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {skills.map((skill: Skill) => (
              <tr key={skill.id}>
                <td className="text-center text-onBackground  underline">
                  <Link href={`/dashboard/skills/${skill.id}`}>{skill.id}</Link>
                </td>
                <td className="text-clip text-balance">
                  {skill.name}
                </td>
                <td className="hidden md:table-cell text-onBackground">
                  {skill.maxDifficulty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
};

export default SkillsPage;
