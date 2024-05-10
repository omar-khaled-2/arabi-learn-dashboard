import { getQuestions } from "@/actions/questions";
import { getSkills } from "@/actions/skills";
import { questionTypes } from "@/app/constants/questionTypes";
import Pagination from "@/components/Pagination";
import { Metadata, NextPage } from "next";

import Link from "next/link";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Questions",
};

interface QuestionsPageProps {
  searchParams: {
    page?: string;
    skillId?: string;
    type?: string;
  };
}

export const revalidate = 0;

const QuestionsPage: NextPage<QuestionsPageProps> = async ({
  searchParams,
}) => {
  const { page , skillId , type } = searchParams;
  const pageNum = page ? parseInt(page) : 1
  const { questions, totalPages } = await getQuestions({ page: pageNum,skillId,type });
  const skills = await getSkills({});

  const handler = async(formData: FormData) => {
    "use server"
  
    let query = ""
    const skillId = formData.get("skillId")
    const page = formData.get("page")
    const type = formData.get("type")
    if(skillId){
      query += `skillId=${skillId}&`
    }
    if(page){
      query += `page=${page}&`
    }

    if(type){
      query += `type=${type}&`
    }

    redirect("/dashboard/questions/?"+query)
  }

  return (
    <div className="flex flex-col gap-6 flex-1 py-6">


      <form action={handler} className="flex flex-col  gap-10 ">

      <div className="flex flex-row gap-10 flex-wrap justify-between">
        <input name="text" className="input flex-1" placeholder="Search" />
      <select name="skillId" defaultValue={skillId}  className="select max-w-[150px] flex-1">

        <option value="">Select Skill</option>
        {skills.map((skill) => (
          <option key={skill.id} value={skill.id}>
            {skill.name}
          </option>
        ))}

      </select>
      <select name="type" defaultValue={type} className="select">

        <option value="">Select Type</option>
        {questionTypes.map((questionType) => (
          <option key={questionType} value={questionType}>
            {questionType}
          </option>
        ))}

      </select>


      <Link href="/dashboard/questions/add" className="btn btn-primary">
          Add Question
        </Link>
      </div>


      <table className="table-auto border-separate border-spacing-4">
        <thead className="text-xs">
          <tr >
            <th className="text-center uppercase tracking-wider ">ID</th>
            <th className="text-start uppercase tracking-wider ">Text</th>
            <th className="text-center hidden md:table-cell uppercase tracking-wider">
              Skill id
            </th>
            <th className="text-center uppercase tracking-wider hidden sm:table-cell">Difficulity</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {questions.map((question) => (
            <tr key={question.id} >
              <td className="text-center underline  text-start">
                <Link href={`/dashboard/questions/${question.id}`}>
                  {question.id}
                </Link>
              </td>
              <td className="text-start">
                {question.text}
              </td>
              <td className="text-center hidden md:table-cell">
                <Link href={`/dashboard/skills/${question.skillId}`}>
                {question.skillId}
                </Link>
              </td>
              <td className="text-cente hidden sm:table-cell">{question.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
      

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
  
      />

    </form>

    </div>
  );
};

export default QuestionsPage;
